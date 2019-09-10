import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {SellContractProduct, TypeOfFuelReceipt} from './sell-contract-product.model';
import {SellContractProductPopupService} from './sell-contract-product-popup.service';
import {SellContractProductService} from './sell-contract-product.service';
import {Consumption, ConsumptionService} from '../consumption';
import {Product, ProductService} from '../product';
import {SellContractCustomer, SellContractCustomerService} from '../sell-contract-customer';
import {Depot, DepotService} from '../depot';
import {Currency, CurrencyService} from '../currency';
import {CostGroupService} from '../cost-group';
import {TranslateService} from '@ngx-translate/core';
import {CurrencyRateGroup, CurrencyRateGroupService} from '../currency-rate-group';
import {RateGroup, RateGroupService} from '../rate-group';
import {CustomerService} from '../customer';
import {BuyType, BuyTypeService} from '../buy-type';
import {CustomerGroup} from '../customer-type';
import {ContractType, SellContract, SellContractService} from '../sell-contract';
import {SelectItem} from 'primeng/api';
import {Forced} from '../cost-group/cost-group.model';
import {ConfigType} from "../niopdc-config";

@Component({
    selector: 'jhi-sell-contract-product-dialog',
    templateUrl: './sell-contract-product-dialog.component.html'
})
export class SellContractProductDialogComponent implements OnInit {

    sellContractProduct: SellContractProduct;
    isSaving: boolean;
    isView: boolean;

    consumptions: Consumption[];

    products: Product[];

    sellcontractcustomers: SellContractCustomer[];
    sellcontractcustomersA: any[];

    currencyRateGroups: CurrencyRateGroup[];
    rateGroups: RateGroup[];

    depots: any;
    selectedDepots: number[];
    costGroups: SelectItem[];
    selectedCostGroups: number[];
    firstSelectedCostGroups: number[];
    currencies: any;
    selectedCurrencies: number[];
    buyTypes: any = [];
    selectedBuyTypes: number[];
    productId;
    sellContractCustomer;

    typeOfFuelReceipts = [];

    CustomerGroup = CustomerGroup;

    customerGroup: any;
    sellContract: SellContract | null;
    ContractType = ContractType;
    allDepotCheck: boolean;

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private sellContractProductService: SellContractProductService,
                private consumptionService: ConsumptionService,
                private customerService: CustomerService,
                private productService: ProductService,
                private sellContractCustomerService: SellContractCustomerService,
                private sellContractService: SellContractService,
                private currencyRateGroupService: CurrencyRateGroupService,
                private rateGroupService: RateGroupService,
                private depotService: DepotService,
                private costGroupService: CostGroupService,
                private buyTypeService: BuyTypeService,
                private translateService: TranslateService,
                private currencyService: CurrencyService,
                private CurrencyRateGroupService: CurrencyRateGroupService,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {
        if (!this.sellContractProduct.id) {
            this.currencyService.queryByConfig(ConfigType[ConfigType.NORMAL_SELL])
                .subscribe(value => {
                    this.sellContractProduct.currencyIds = value.body.map(value1 => value1.id);
                    this.selectedCurrencies = this.sellContractProduct.currencyIds;
                });
            this.currencyRateGroupService.findByConfig(ConfigType[ConfigType.NORMAL_SELL])
                .subscribe(value => {
                    this.sellContractProduct.currencyRateGroupId = value.body.id;
                });
        }
        this.isView = View.isView;
        this.isSaving = false;
        this.sellContractService.find(this.sellContractProduct.sellContractId).subscribe((value) => {
            this.sellContract = value.body;
            if (!this.sellContractProduct.id) {
                this.sellContractProduct.startDate = this.sellContract.startDate;
                this.sellContractProduct.finishDate = this.sellContract.finishDate;
                console.log('startDate', this.sellContract.startDate);
                console.log('finishDate', this.sellContract.finishDate);
            }
            if (this.sellContract.contractType === ContractType[ContractType.EXPORT] || this.sellContract.contractType === ContractType[ContractType.EXCHANGE]) {
                this.depotService.queryBySellContract(this.sellContract.id)
                    .subscribe((res: HttpResponse<Depot[]>) => {
                        this.depots = res.body.map((p) => {
                            return {label: p.title, value: p.id};
                        });
                        if (this.sellContractProduct.id) {
                            this.selectedDepots = this.sellContractProduct.depots.map((i) => i.id);
                        }
                    }, (res: HttpErrorResponse) => this.onError(res.message));
                this.sellContractCustomerChanged(null);
            } else {
                this.sellContractCustomerService.queryBySellContract(this.sellContractProduct.sellContractId)
                    .subscribe((res: HttpResponse<SellContractCustomer[]>) => {
                        this.sellcontractcustomers = res.body;

                        this.sellcontractcustomersA = res.body.map(value => {
                            return {
                                value: value.id,
                                label: value.customerRegCode,
                            };
                        });

                        if (this.sellContractProduct.id) {
                            this.loadDefaultCostGroup(this.sellContractProduct.sellContractCustomerId, this.sellContractProduct.productId);
                            this.sellContractCustomerChanged(this.sellContractProduct.sellContractCustomerId);
                        } else if (this.sellcontractcustomersA && this.sellcontractcustomersA.length) {
                            this.sellContractProduct.sellContractCustomerId = this.sellcontractcustomersA[0].value;
                            this.sellContractCustomerChanged(this.sellcontractcustomersA[0].value);

                        }
                    }, (res: HttpErrorResponse) => this.onError(res.message));
                if (this.sellContract.contractType === ContractType[ContractType.BRAND]) {
                    this.sellContractCustomerChanged(null);
                }
            }
        });
        this.productService.query()
            .subscribe((res: HttpResponse<Product[]>) => {
                this.products = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));

        this.currencyRateGroupService.query()
            .subscribe((res: HttpResponse<CurrencyRateGroup[]>) => {
                this.currencyRateGroups = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));

        this.currencyService.query()
            .subscribe((res: HttpResponse<Currency[]>) => {
                this.currencies = res.body.map((p) => {
                    return {label: p.title, value: p.id};
                });
                if (this.sellContractProduct.id) {
                    this.selectedCurrencies = this.sellContractProduct.currencyIds;
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));



        for (const typeOfFuelReceiptKey in TypeOfFuelReceipt) {
            if (isNaN(parseInt(typeOfFuelReceiptKey, 10))) {
                this.translateService.get('samtagatewayApp.TypeOfFuelReceipt.' + typeOfFuelReceiptKey)
                    .subscribe((value) => {
                        this.typeOfFuelReceipts.push({
                            value: typeOfFuelReceiptKey,
                            label: value
                        });
                    });
            }
        }
    }

    changeCostGroup(event) {
        this.firstSelectedCostGroups.forEach((value) => {
            if (!this.selectedCostGroups.includes(value)) {
                this.selectedCostGroups.push(value);
            }
        });
    }

    sellContractCustomerChanged(event) {
        console.log(event);
        const find = this.sellcontractcustomers ? this.sellcontractcustomers.find((value) => event === value.id) : null;
        this.customerGroup = (find) ? find.customerGroup : null;
        this.depotService.queryByLocationAndContractType((find) ? find.locationId : -1, this.sellContract.contractType)
            .subscribe((res: HttpResponse<Depot[]>) => {
                this.depots = res.body.map((p) => {
                    return {label: p.title, value: p.id};
                });
                if (this.sellContractProduct.id) {
                    this.selectedDepots = this.sellContractProduct.depots.map((i) => i.id);
                    console.log(this.selectedDepots);
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        if (this.sellContract) {
            this.rateGroupService.queryByContractTypeAndCustomer(this.sellContract.contractType,
                find ? find.customerId : null,
                find ? [find.locationId] : this.sellContract.locations.map((value) => value.id))
                .subscribe((res: HttpResponse<RateGroup[]>) => {
                    this.rateGroups = res.body;
                }, (res: HttpErrorResponse) => this.onError(res.message));
        }
        if (!this.sellContractProduct.id) {
            this.loadDefaultCostGroup(event, this.productId);
        }
        this.loadConsumption(this.sellContractProduct.productId, event);

        this.buyTypeService.queryForSellContractProduct(find.customerId)
            .subscribe((res: HttpResponse<BuyType[]>) => {
                this.buyTypes = res.body.map((p) => {
                    return {label: p.title, value: p.id};
                });
                if (this.sellContractProduct.id) {
                    this.selectedBuyTypes = this.sellContractProduct.buyTypes.map((i) => i.id);
                }

            }, (res: HttpErrorResponse) => this.onError(res.message));

    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        if (!this.allDepotCheck && this.sellContract.contractType === this.ContractType[ContractType.AIRPLANE]) {
            this.selectedDepots = this.depots.map((i) => i.value);
        }
        if (this.selectedDepots) {
            this.sellContractProduct.depots = this.selectedDepots.map((i) => {
                return new Depot(i);
            });
        }
        if (this.selectedCostGroups) {
            this.sellContractProduct.costGroupIds = this.selectedCostGroups;
        }
        if (this.selectedCurrencies) {
            this.sellContractProduct.currencyIds = this.selectedCurrencies;
        }
        if (this.selectedBuyTypes) {
            this.sellContractProduct.buyTypes = this.selectedBuyTypes.map((i) => {
                return new BuyType(i);
            });
        }
        this.isSaving = true;
        if (this.sellContractProduct.id !== undefined) {
            this.subscribeToSaveResponse(
                this.sellContractProductService.update(this.sellContractProduct));
        } else {
            this.subscribeToSaveResponse(
                this.sellContractProductService.create(this.sellContractProduct));
        }
    }

    subscribeToSaveResponse(result: Observable<HttpResponse<SellContractProduct>>) {
        result.subscribe((res: HttpResponse<SellContractProduct>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    trackConsumptionById(index: number, item: Consumption) {
        return item.id;
    }

    trackProductById(index: number, item: Product) {
        return item.id;
    }

    trackSellContractCustomerById(index: number, item: SellContractCustomer) {
        return item.id;
    }

    trackcurrencyRateGroupById(index: number, item: CurrencyRateGroup) {
        return item.id;
    }

    trackrateGroupById(index: number, item: RateGroup) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }

    productChanged(event) {
        console.log(event);
        if (!this.sellContractProduct.id) {
            this.loadDefaultCostGroup(this.sellContractCustomer, event);
        }
        this.loadConsumption(event, this.sellContractProduct.sellContractCustomerId);
    }

    onChangeTypeOfFuelReceipt(data) {
        // this.sellContractProduct.typeOfFuelReceipts = data.value;
        console.log(this.sellContractProduct);
    }

    loadConsumption(productId, sellContractCustomerId) {
        if (productId && sellContractCustomerId) {
            const sellContractCustomer = this.sellcontractcustomers.find(value => value.id === sellContractCustomerId);
            this.consumptionService.queryByProductAndCustomer(productId, sellContractCustomer.customerId)
                .subscribe((res: HttpResponse<Consumption[]>) => {
                    this.consumptions = res.body;
                }, (res: HttpErrorResponse) => this.onError(res.message));
        }
    }

    private onSaveSuccess(result: SellContractProduct) {
        this.eventManager.broadcast({name: 'sellContractProductListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    private loadDefaultCostGroup(sellContractCustomer, productId) {
        this.productId = productId;
        this.sellContractCustomer = sellContractCustomer;
        if (this.productId && this.sellContractCustomer && this.sellContract && this.sellContract.contractType) {
            const find = this.sellcontractcustomers.find((value) => sellContractCustomer === value.id);
            this.costGroupService.queryLoadDefaultByProductAndLocationAndCustomerAndContractType(
                this.productId, find.locationId, find.customerTypeId, this.sellContract.contractType)
                .subscribe((res) => {
                        this.costGroups = res.body.map((p) => {
                            return {label: p.title, value: p.id};
                        });
                        this.selectedCostGroups = res.body
                            .filter((value) => value.forced === Forced[Forced.FORCE])
                            .map((value) => value.id);
                        this.firstSelectedCostGroups = this.selectedCostGroups;

                        if (this.sellContractProduct.id) {
                            this.selectedCostGroups = this.sellContractProduct.costGroupIds.map((i) => i);
                        }
                    }
                );
        }
    }
}

@Component({
    selector: 'jhi-sell-contract-product-popup',
    template: ''
})
export class SellContractProductPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private sellContractProductPopupService: SellContractProductPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.sellContractProductPopupService
                    .open(SellContractProductDialogComponent as Component, params['id']);
            } else if (params['sellContractId']) {
                this.sellContractProductPopupService
                    .open(SellContractProductDialogComponent as Component, null, params['sellContractId']);
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
