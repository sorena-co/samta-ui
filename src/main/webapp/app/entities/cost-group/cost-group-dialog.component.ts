import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';
import {TranslateService} from '@ngx-translate/core';
import {CostGroup, CostGroupAccessType, CostGroupType, CostMethod} from './cost-group.model';
import {CostGroupPopupService} from './cost-group-popup.service';
import {CostGroupService} from './cost-group.service';
import {Cost, CostService} from '../cost';
import {Product, ProductService} from '../product';
import {CustomerType, CustomerTypeService} from '../customer-type';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ContractType} from "../sell-contract";

@Component({
    selector: 'jhi-cost-group-dialog',
    templateUrl: './cost-group-dialog.component.html'
})
export class CostGroupDialogComponent implements OnInit {

    costGroup: CostGroup;
    isSaving: boolean;
    isView: boolean;
    costs: Cost[];
    CostGroupType = CostGroupType;
    products: any[];
    allproducts: any[];
    customerTypes: any[];
    allcustomerTypes: any[];
    // costMethodSelected: any;
    // costMethods: any = [];
    CostMethod = CostMethod;
    CostGroupAccessType = CostGroupAccessType;

    costGroupAccessType = CostGroupAccessType;
    allContractTypes: any[];
    contractTypes: any[];

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private costGroupService: CostGroupService,
                private costService: CostService,
                private productService: ProductService,
                private router: Router,
                private translateService: TranslateService,
                private customerTypeService: CustomerTypeService,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.costGroup.costGroupAccessType = this.CostGroupAccessType[this.CostGroupAccessType.PRODUCT];


        this.allContractTypes = [];
        for (const contractTypeKey in ContractType) {
            if (isNaN(parseInt(contractTypeKey, 10))) {
                this.allContractTypes.push(contractTypeKey);
            }
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



        /* this.costMethods.push({
             label: this.translateService.instant('samtagatewayApp.costMethod.' + this.CostMethod[this.CostMethod.NORMAL_SALES]),
             value: this.CostMethod[this.CostMethod.NORMAL_SALES]
         });
         this.costMethods.push({
             label: this.translateService.instant('samtagatewayApp.costMethod.' + this.CostMethod[this.CostMethod.DEFUEL]),
             value: this.CostMethod[this.CostMethod.DEFUEL]
         });
         if (this.costGroup.id != null) {
             this.costMethodSelected = [];
             // for (let i = 0; i < this.costMethods.length; i++) {
             this.costMethodSelected = this.costGroup.costMethods.valueOf();
             // }
         }*/
        if (this.costGroup.productIds && this.costGroup.productIds.length !== 0) {
            this.costGroup.canSetProductIds = true;
        }else
            this.costGroup.canSetProductIds = false;

        if (this.costGroup.contractTypes && this.costGroup.contractTypes.length !== 0) {
            this.costGroup.selectiveContractTypes= true;
        }else
            this.costGroup.selectiveContractTypes = false;
        if (this.costGroup.customerTypeIds && this.costGroup.customerTypeIds.length !== 0) {
            this.costGroup.canSetCustomerTypeIds = true;
        }else
            this.costGroup.canSetCustomerTypeIds = false;

        if (this.costGroup.id) {
            this.costService.query(this.costGroup.id, null).subscribe(
                (res) => {
                    this.costs = res.body;
                    if (this.costs.length > 0) {
                        // this.costGroupType = true;
                    }
                }
            );
        }

        this.productService.query().subscribe((products) => {
            this.allproducts = products.body;
            this.products = [];
            this.allproducts.forEach((value: Product) => {
                const newVar = {
                    label: value.title,
                    value: value.id
                };
                this.products.push(newVar);
            });
        });
        this.customerTypeService.query().subscribe((customerTypes) => {
            this.allcustomerTypes = customerTypes.body;
            this.customerTypes = [];
            this.allcustomerTypes.forEach((value: CustomerType) => {
                const newVar = {
                    label: value.title,
                    value: value.id
                };
                this.customerTypes.push(newVar);
            });
        });

    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save(showNextLevel ?: boolean) {
        this.isSaving = true;

        if (!this.costGroup.canSetCustomerTypeIds) {
            this.costGroup.customerTypeIds = null;
        }
        if (!this.costGroup.canSetProductIds) {
            this.costGroup.productIds = null;
        }
        if (!this.costGroup.selectiveContractTypes) {
            this.costGroup.contractTypes = null;
        }
        this.costGroup.costGroupAccessType = this.CostGroupAccessType[this.CostGroupAccessType.PRODUCT];
        if (this.costGroup.id !== undefined) {
            this.subscribeToSaveResponse(
                this.costGroupService.update(this.costGroup));
        } else {
            this.subscribeToSaveResponse(
                this.costGroupService.create(this.costGroup), showNextLevel);
        }
    }

    onChangeCostMethods() {
       /* this.costGroup.costMethods = [];
        for (let i = 0; i < this.costMethodSelected.length; i++) {
            for (let j = 0; j < this.costMethods.length; j++) {
                if (this.costMethodSelected[i] === this.costMethods[j].value) {
                    this.costGroup.costMethods[i] = this.costMethods[j].value;
                }
            }
        }*/
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CostGroup>>, showNextLevel ?: boolean) {
        result.subscribe((res: HttpResponse<CostGroup>) =>
            this.onSaveSuccess(res.body, showNextLevel), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CostGroup, showNextLevel?: boolean) {
        this.eventManager.broadcast({name: 'costGroupListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
        if (showNextLevel) {
            setTimeout(() => {
                this.router.navigateByUrl(`/cost-group/${result.id}/cost(popup:cost-new/cost-group/${result.id})`);
            }, 1000);
        }
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-cost-group-popup',
    template: ''
})
export class CostGroupPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private costGroupPopupService: CostGroupPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.costGroupPopupService
                    .open(CostGroupDialogComponent as Component, params['id']);
            } else {
                this.costGroupPopupService
                    .open(CostGroupDialogComponent as Component);
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
