import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {UserDataAccess} from './user-data-access.model';
import {UserDataAccessPopupService} from './user-data-access-popup.service';
import {UserDataAccessService} from './user-data-access.service';
import {Location, LocationService} from '../location';
import {Region, RegionService} from '../region';
import {Person, PersonService} from '../person';
import {Customer, CustomerService} from '../customer';
import {CustomerType, CustomerTypeService} from '../customer-type';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ContractType} from '../sell-contract/sell-contract.model';
import {SellContractService} from '../sell-contract/sell-contract.service';

@Component({
    selector: 'jhi-user-data-access-dialog',
    templateUrl: './user-data-access-dialog.component.html'
})
export class UserDataAccessDialogComponent implements OnInit {

    userDataAccess: UserDataAccess;
    isSaving: boolean;
    isView: boolean;

    locations: Location[];

    regions: Region[] = [];

    people: Person[];

    customers: Customer[];

    customertypes: CustomerType[];
    contractTypes: ContractType[] | null;

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private userDataAccessService: UserDataAccessService,
                private locationService: LocationService,
                private sellContractService: SellContractService,
                private regionService: RegionService,
                private personService: PersonService,
                private customerService: CustomerService,
                private customerTypeService: CustomerTypeService,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.personService.query()
            .subscribe((res) => {
                this.people = res.body;
            }, (res) => this.onError(res.message));
        this.customerService.query()
            .subscribe((res) => {
                this.customers = res.body;
            }, (res) => this.onError(res.message));
        this.customerTypeService.query()
            .subscribe((res) => {
                this.customertypes = res.body;
            }, (res) => this.onError(res.message));
        this.sellContractService.queryTypes()
            .subscribe((res: HttpResponse<ContractType[]>) => {
                this.contractTypes = res.body;
            });
    }

    locationChanged() {
        this.regionService.queryByLocation(this.userDataAccess.locationId)
            .subscribe((res) => {
                this.regions = res.body;
            }, (res) => this.onError(res.message));

    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.userDataAccess.id !== undefined) {
            this.subscribeToSaveResponse(
                this.userDataAccessService.update(this.userDataAccess));
        } else {
            this.subscribeToSaveResponse(
                this.userDataAccessService.create(this.userDataAccess));
        }
    }

    trackLocationById(index: number, item: Location) {
        return item.id;
    }

    trackRegionById(index: number, item: Region) {
        return item.id;
    }

    trackPersonById(index: number, item: Person) {
        return item.id;
    }

    trackCustomerById(index: number, item: Customer) {
        return item.id;
    }

    trackCustomerTypeById(index: number, item: CustomerType) {
        return item.id;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<UserDataAccess>>) {
        result.subscribe((res: HttpResponse<UserDataAccess>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: UserDataAccess) {
        this.eventManager.broadcast({name: 'userDataAccessListModification', content: 'OK'});
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
    selector: 'jhi-user-data-access-popup',
    template: ''
})
export class UserDataAccessPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private userDataAccessPopupService: UserDataAccessPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.userDataAccessPopupService
                    .open(UserDataAccessDialogComponent as Component, params['id']);
            } else if (params['username']) {
                this.userDataAccessPopupService
                    .open(UserDataAccessDialogComponent as Component, null, params['username']);
            } else {
                console.log('not be');
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
