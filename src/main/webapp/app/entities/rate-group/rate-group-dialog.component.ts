import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {RateGroup} from './rate-group.model';
import {RateGroupPopupService} from './rate-group-popup.service';
import {RateGroupService} from './rate-group.service';
import {RegionService} from '../region';
import {Region} from '../region/region.model';
import {CustomerType} from '../customer-type/customer-type.model';
import {CustomerTypeService} from '../customer-type/customer-type.service';
import {ContractType} from '../sell-contract';
import {TranslateService} from '@ngx-translate/core';
import {CustomerGroup} from '../customer-type';
import {LocationService} from '../location';

@Component({
    selector: 'jhi-rate-group-dialog',
    templateUrl: './rate-group-dialog.component.html'
})
export class RateGroupDialogComponent implements OnInit {

    rateGroup: RateGroup;
    isSaving: boolean;
    isView: boolean;

    customerTypes: any[];
    contractTypes: any[];
    allCustomerTypes: any[];
    allContractTypes: any[];
    regions: Region[] = [];
    ContractType = ContractType;
    disableFields: boolean;
    CustomerGroup = CustomerGroup;

    locations: any[];
    customLocation: any[];
    selectedLocation: any[];

    constructor(
        public activeModal: NgbActiveModal,
        private locationService: LocationService,
        private jhiAlertService: JhiAlertService,
        private rateGroupService: RateGroupService,
        private regionService: RegionService,
        private customerTypeService: CustomerTypeService,
        private translateService: TranslateService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;

        this.allContractTypes = [];
        this.customerTypes = [];
        if (this.rateGroup.id) {
            this.rateGroupService.useBySellContractProduct(this.rateGroup.id, null)
                .subscribe((value) => {
                    this.disableFields = value.body;
                    console.log(this.disableFields);
                });
        }
        for (const contractTypeKey in ContractType) {
            if (isNaN(parseInt(contractTypeKey, 10))) {
                this.allContractTypes.push(contractTypeKey);
            }
        }
        if (this.rateGroup.customerGroup != null) {
            this.rateGroup.selectiveCustomerTypes = true;
            this.customerTypeService.queryByCustomerGroup(this.rateGroup.customerGroup).subscribe((customerTypes) => {
                this.allCustomerTypes = customerTypes.body;
                this.customerTypes = [];
                this.allCustomerTypes.forEach((value: CustomerType) => {
                    const newVar = {
                        label: value.title,
                        value: value.id
                    };
                    this.customerTypes.push(newVar);
                });
            });
        }
        else {
            this.rateGroup.selectiveCustomerTypes = false;
        }
        this.contractTypes = [];
        this.allContractTypes.forEach((value: ContractType) => {

            this.translateService.get('samtagatewayApp.ContractType.' + value).subscribe((title) => {
                const newVar = {
                    label: title,
                    'value': value
                };
                this.contractTypes.push(newVar);
            });
        });

        console.log(this.contractTypes);

        this.locationService.queryByLevel(3)
            .subscribe(value => {
                this.locations = value.body;
                const location = {
                    value: '',
                    label: ''
                };
                this.customLocation = [];
                // this.customLocation.push(location);
                for (let i = 0; i < this.locations.length; i++) {
                    this.customLocation.push({
                        value: this.locations[i].id,
                        label: this.locations[i].name
                    });
                }
                if (this.rateGroup.id) {
                    this.selectedLocation = this.rateGroup.locationIds;
                }
            });

        /*this.customerTypeService.query().subscribe((customerTypes) => {
            this.allCustomerTypes = customerTypes.body;
            this.customerTypes = [];
            this.allCustomerTypes.forEach((value: CustomerType) => {
                const newVar = {
                    label: value.title,
                    value: value.id
                };
                this.customerTypes.push(newVar);
            });
        });*/
    }

    locationChanged() {
        if (!this.rateGroup.locationIds || this.rateGroup.locationIds.length === 0) {
            this.regions = [];
        } else {
            this.regionService.queryByLocations(this.rateGroup.locationIds)
                .subscribe((res) => {
                    this.regions = res.body;
                }, (res) => this.onError(res.message));
        }
    }

    onChangeCustomerGroup(value) {
        if (value != '' && value != null) {
            this.rateGroup.selectiveCustomerTypes = true;
            this.rateGroup.customerTypeIds = null;
            this.customerTypeService.queryByCustomerGroup(value).subscribe((customerTypes) => {
                this.allCustomerTypes = customerTypes.body;
                this.customerTypes = [];
                this.allCustomerTypes.forEach((value: CustomerType) => {
                    const newVar = {
                        label: value.title,
                        value: value.id
                    };
                    this.customerTypes.push(newVar);
                });
            });
        }
        else {
            this.rateGroup.selectiveCustomerTypes = false;
            this.rateGroup.customerTypeIds = null;
            this.customerTypes = [];
        }
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.rateGroup.selectiveCustomerTypes != true)
            this.rateGroup.customerTypeIds = null;
        if (this.rateGroup.selectiveContractTypes != true)
            this.rateGroup.contractTypes = null;
        if (this.rateGroup.id !== undefined) {
            this.subscribeToSaveResponse(
                this.rateGroupService.update(this.rateGroup));
        } else {
            this.subscribeToSaveResponse(
                this.rateGroupService.create(this.rateGroup));
        }
    }

    onChangeLocation(data) {
        this.rateGroup.locationIds = data;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<RateGroup>>) {
        result.subscribe((res: HttpResponse<RateGroup>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: RateGroup) {
        this.eventManager.broadcast({name: 'rateGroupListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-rate-group-popup',
    template: ''
})
export class RateGroupPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rateGroupPopupService: RateGroupPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.rateGroupPopupService
                    .open(RateGroupDialogComponent as Component, params['id']);
            } else {
                this.rateGroupPopupService
                    .open(RateGroupDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

class View {
    static isView: boolean;
}
