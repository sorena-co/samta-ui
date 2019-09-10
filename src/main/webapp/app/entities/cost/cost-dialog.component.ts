import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {Cost, CostAction, Effect, RateType} from './cost.model';
import {CostPopupService} from './cost-popup.service';
import {CostService} from './cost.service';
import {CostGroup, CostGroupService, CostGroupType, CostMethod} from '../cost-group';
import {Product, ProductService} from '../product';
import {CustomerType, CustomerTypeService} from '../customer-type';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import {ContractType} from '../sell-contract';


@Component({
    selector: 'jhi-cost-dialog',
    templateUrl: './cost-dialog.component.html'
})
export class CostDialogComponent implements OnInit {

    cost: Cost;
    isSaving: boolean;
    isView: boolean;

    costs: Cost[];
    disableEffect: boolean;
    hiddenEffect: boolean;

    Effect = Effect;

    costGroup: CostGroup;
    costGroups: CostGroup[];
    CostGroupType = CostGroupType;
    products: any[];
    allproducts: any[];
    customerTypes: any[];
    allcustomerTypes: any[];
    rateType = RateType;
    CostAction = CostAction;
    CostMethod = CostMethod;
    contractTypes: any[];
    allContractTypes: any[];
    disableProduct: boolean;

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private costService: CostService,
                private costGroupService: CostGroupService,
                private translateService: TranslateService,
                private router: Router,
                private productService: ProductService,
                private customerTypeService: CustomerTypeService,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.cost.parentId = UsefulId.costId;
        if (this.cost.productIds && this.cost.productIds.length !== 0) {
            this.cost.canSetProductIds = true;
        } else {
            this.cost.canSetProductIds = false;
        }

        if (this.cost.contractTypes && this.cost.contractTypes.length !== 0) {
            this.cost.selectiveContractTypes = true;
        } else
            this.cost.selectiveContractTypes = false;

        if (this.cost.customerTypeIds && this.cost.customerTypeIds.length !== 0) {
            this.cost.canSetCustomerTypeIds = true;
        } else {
            this.cost.canSetCustomerTypeIds = false;
        }

        if (this.cost.parentId) {
            this.disableEffect = true;
            this.cost.effect = this.Effect.PARENT_COST;
            this.costService.find(this.cost.parentId).subscribe((res: HttpResponse<Cost>) => {
                let parentCost = res.body;
                this.customerTypes = [];
                if (parentCost.customerTypeIds.length > 0) {
                    parentCost.customerTypes.forEach((value) => {
                        const newVar = {
                            label: value.title,
                            value: value.id
                        };
                        this.customerTypes.push(newVar);
                    });
                } else {
                    this.customerTypeService.queryByParentCostOrCostGroup(this.cost.parentId, null)
                        .subscribe(value => {
                            this.allcustomerTypes = value.body;
                            this.allcustomerTypes.forEach(value1 => {
                                const newVar = {
                                    label: value1.title,
                                    value: value1.id
                                };
                                this.customerTypes.push(newVar);
                            });
                        });
                }
                this.products = [];

                this.costGroupService.find(parentCost.costGroupId)
                    .subscribe(res => {
                        this.costGroup = res.body;
                        if (parentCost.productIds.length > 0) {
                            if (this.costGroup.costGroupType === this.CostGroupType[this.CostGroupType.LADDER]) {
                                this.disableProduct = true;
                                this.cost.productIds = null;
                            } else {
                                parentCost.products.forEach((value) => {
                                    const newVar = {
                                        label: value.title,
                                        value: value.id
                                    };
                                    this.products.push(newVar);
                                });
                            }
                        } else {
                            if (this.costGroup.costGroupType === this.CostGroupType[this.CostGroupType.LADDER]) {
                                this.disableProduct = true;
                                this.cost.productIds = null;
                            } else {
                                this.productService.queryByParentCostOrCostGroup(this.cost.parentId, null)
                                    .subscribe(value => {
                                        this.allproducts = value.body;
                                        this.allproducts.forEach(value1 => {
                                            const newVar = {
                                                label: value1.title,
                                                value: value1.id
                                            };
                                            this.products.push(newVar);
                                        });
                                    });
                            }
                        }

                        if (parentCost.contractTypes && parentCost.contractTypes.length > 0) {
                            this.contractTypes = [];
                            parentCost.contractTypes.forEach((value) => {
                                this.translateService.get('niopdcgatewayApp.ContractType.' + value).subscribe((title) => {
                                    const newVar = {
                                        label: title,
                                        'value': value
                                    };
                                    this.contractTypes.push(newVar);
                                });
                            });
                        } else {
                            this.allContractTypes = [];
                            this.contractTypes = [];
                            for (const contractTypeKey in ContractType) {
                                if (isNaN(parseInt(contractTypeKey, 10))) {
                                    this.allContractTypes.push(contractTypeKey);
                                }
                            }
                            this.allContractTypes.forEach((value: ContractType) => {

                                this.translateService.get('niopdcgatewayApp.ContractType.' + value).subscribe((title) => {
                                    const newVar = {
                                        label: title,
                                        'value': value
                                    };
                                    this.contractTypes.push(newVar);
                                });
                            });
                        }

                    });
            });
        } else {
            this.disableEffect = false;
            this.costGroupService.find(this.cost.costGroupId).subscribe((costGroup: HttpResponse<CostGroup>) => {
                this.costGroup = costGroup.body;
                if (this.costGroup.costGroupType !== this.CostGroupType[this.CostGroupType.CASH]) {
                    this.cost.effect = this.Effect[this.Effect.TOTAL];
                    this.cost.costAction = this.CostAction[this.CostAction.REDUCER];
                    this.hiddenEffect = true;
                }
                this.customerTypes = [];
                if (this.costGroup.customerTypeIds && this.costGroup.customerTypeIds.length > 0) {
                    this.costGroup.customerTypeIds.forEach((value) => {
                        this.customerTypeService.find(value).subscribe((customerType) => {
                            const newVar = {
                                label: customerType.body.title,
                                value: customerType.body.id
                            };
                            this.customerTypes.push(newVar);
                        });
                    });
                } else {
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

                if (this.costGroup.contractTypes && this.costGroup.contractTypes.length > 0) {
                    this.contractTypes = [];
                    this.costGroup.contractTypes.forEach((value) => {
                        this.translateService.get('niopdcgatewayApp.ContractType.' + value).subscribe((title) => {
                            const newVar = {
                                label: title,
                                'value': value
                            };
                            this.contractTypes.push(newVar);
                        });
                    });
                } else {
                    this.allContractTypes = [];
                    this.contractTypes = [];
                    for (const contractTypeKey in ContractType) {
                        if (isNaN(parseInt(contractTypeKey, 10))) {
                            this.allContractTypes.push(contractTypeKey);
                        }
                    }
                    this.allContractTypes.forEach((value: ContractType) => {

                        this.translateService.get('niopdcgatewayApp.ContractType.' + value).subscribe((title) => {
                            const newVar = {
                                label: title,
                                'value': value
                            };
                            this.contractTypes.push(newVar);
                        });
                    });
                }

                this.products = [];
                if (this.costGroup.productIds && this.costGroup.productIds.length > 0) {
                    if (this.costGroup.costGroupType === this.CostGroupType[this.CostGroupType.LADDER]) {
                        this.disableProduct = true;
                        this.cost.productIds = null;
                    } else {
                        this.costGroup.productIds.forEach((value) => {
                            this.productService.find(value).subscribe((product) => {
                                const newVar = {
                                    label: product.body.title,
                                    value: product.body.id
                                };
                                this.products.push(newVar);
                            });
                        });
                    }
                } else {
                    if (this.costGroup.costGroupType === this.CostGroupType[this.CostGroupType.LADDER]) {
                        this.disableProduct = true;
                        this.cost.productIds = null;
                    } else {
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
                    }
                }

            });

        }
        if (!this.cost.parentId) {
            this.costService.query(this.cost.costGroupId)
                .subscribe((res: HttpResponse<CostGroup[]>) => {
                    this.costs = res.body;
                }, (res: HttpErrorResponse) => this.onError(res.message));
        }

    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save(showNextLevel ?: boolean, showNext ?: boolean) {
        if (!this.cost.canSetProductIds) {
            this.cost.productIds = null;
        }
        if (!this.cost.canSetCustomerTypeIds) {
            this.cost.customerTypeIds = null;
        }
        if (!this.cost.selectiveContractTypes) {
            this.cost.contractTypes = null;
        }
        this.isSaving = true;
        if (this.cost.id !== undefined) {
            this.subscribeToSaveResponse(
                this.costService.update(this.cost));
        } else {
            this.subscribeToSaveResponse(
                this.costService.create(this.cost), showNextLevel, showNext);
        }
    }

    trackCostGroupById(index: number, item: CostGroup) {
        return item.id;
    }

    trackCostById(index: number, item: Cost) {
        return item.id;
    }

    onChangeRateType(data) {
        if (this.costGroup.costGroupType !== this.CostGroupType[this.CostGroupType.LADDER] && !this.cost.parentId) {
            if (data === this.rateType[this.rateType.PERCENT]) {
                this.hiddenEffect = false;
            } else {
                this.cost.effect = this.Effect[this.Effect.BASE];
                this.hiddenEffect = true;
            }
        }
        // if (this.costGroup.costGroupType[this.CostGroupType[this.CostGroupType.LADDER]] && !this.cost.parentId) {
        //     if (data === this.rateType[this.rateType.PERCENT]) {
        //         this.hiddenEffect = true;
        //         this.cost.effect = this.Effect[this.Effect.TOTAL];
        //     } else {
        //         this.hiddenEffect = false;
        //         this.cost.effect = null;
        //     }
        // }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Cost>>, showNextLevel ?: boolean, showNext ?: boolean) {
        result.subscribe((res: HttpResponse<Cost>) =>
            this.onSaveSuccess(res.body, showNextLevel, showNext), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Cost, showNextLevel ?: boolean, showNext ?: boolean) {
        this.eventManager.broadcast({name: 'costListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
        if (showNextLevel) {
            setTimeout(() => {
                this.router.navigateByUrl(`/cost-group/${result.costGroupId}/cost/${result.id}/cost-rate(popup:cost-rate-new/${result.id})`);
            }, 1000);
        } else if (showNext) {
            if (result.parentId) {
                setTimeout(() => {
                    this.router.navigateByUrl(`/cost-group/${result.costGroupId}/cost/${result.parentId}/cost(popup:cost-new/cost/${result.parentId})`);
                }, 1000);
            } else {
                setTimeout(() => {
                    this.router.navigateByUrl(`/cost-group/${result.costGroupId}/cost(popup:cost-new/cost-group/${result.costGroupId})`);
                }, 1000);
            }
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
    selector: 'jhi-cost-popup',
    template: ''
})
export class CostPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private costPopupService: CostPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            View.isView = !!params['view'];
            UsefulId.costGroupId = null;
            UsefulId.costId = null;
            if (params['id']) {
                this.costPopupService
                    .open(CostDialogComponent as Component, params['id']);
            } else if (params['costGroupId']) {
                UsefulId.costGroupId = params['costGroupId'];
                this.costPopupService
                    .open(CostDialogComponent as Component, null, params['costGroupId']);
            } else if (params['costId']) {
                UsefulId.costId = params['costId'];
                this.costPopupService
                    .open(CostDialogComponent as Component, null, null, params['costId']);
            } else {
                console.log('not be');
            }
            if (params['costId']) {
                UsefulId.costId = params['costId'];
            }

            if (params['costGroupId']) {
                UsefulId.costGroupId = params['costGroupId'];
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

class UsefulId {
    static costGroupId: number;
    static costId: number;
}
