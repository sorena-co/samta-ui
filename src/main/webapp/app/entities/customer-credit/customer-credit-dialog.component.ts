import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {CustomerCreditPopupService} from './customer-credit-popup.service';
import {CustomerCreditService} from './customer-credit.service';
import {CustomerService} from '../customer';
import {SellContractProduct, SellContractProductService} from '../sell-contract-product';
import {Currency} from '../currency/currency.model';
import {CurrencyService} from '../currency/currency.service';
import {CurrencyRateGroup} from '../currency-rate-group/currency-rate-group.model';
import {CurrencyRateGroupService} from '../currency-rate-group/currency-rate-group.service';
import {CustomerCredit} from './customer-credit.model';
import {BuyGroup, BuyType, BuyTypeUsage, TypeEffect} from '../buy-type/buy-type.model';
import {BuyTypeService} from '../buy-type/buy-type.service';
import {ConfigType} from "../niopdc-config";

@Component({
    selector: 'jhi-customer-credit-dialog',
    templateUrl: './customer-credit-dialog.component.html'
})
export class CustomerCreditDialogComponent implements OnInit {
    sellContract: SellContractProduct;
    customerCredit: CustomerCredit;
    isSaving: boolean;
    isView: boolean;
    minCredit: number;
    sellcontractproducts: SellContractProduct[];
    currencyRateGroups: CurrencyRateGroup[];
    currencies: Currency[];
    disableCredit: boolean;
    disableAmount: boolean;
    hiddenCurrency: boolean;
    hiddenCurrencyRateGroup: boolean;
    buyGroup = BuyGroup;
    buyTypeUsage = BuyTypeUsage;
    typeEffect = TypeEffect;
    buyTypes: BuyType[];
    private minAmount: number;
    sellContractProductId: number;
    customerId: number;
    personId: number;

    constructor(public activeModal: NgbActiveModal,
                private alertService: JhiAlertService,
                private customerCreditService: CustomerCreditService,
                private buyTypeService: BuyTypeService,
                private customerService: CustomerService,
                private router: Router,
                private sellContractProductService: SellContractProductService,
                private currencyService: CurrencyService,
                private currencyRateGroupService: CurrencyRateGroupService,
                private eventManager: JhiEventManager) {
    }

    get expressionErrorCredit(): boolean {
        if (this.customerCredit.credit < this.minCredit) {
            this.customerCredit.currentCredit = 0;
            return true;
        } else {
            this.customerCredit.currentCredit = this.customerCredit.credit - this.minCredit;
            return false;
        }
    }

    get expressionErrorAmount(): boolean {
        if (this.customerCredit.amount < this.minAmount) {
            this.customerCredit.currentAmount = 0;
            return true;
        } else {
            this.customerCredit.currentAmount = this.customerCredit.amount - this.minAmount;
            return false;
        }
    }

    ngOnInit() {
        this.isView = View.isView;
        this.sellContractProductId = UsefulId.sellContractProductId;
        this.customerId = UsefulId.customerId;
        this.personId = UsefulId.personId;
        if (!this.customerCredit.id && this.sellContractProductId) {
            this.currencyRateGroupService.findByConfig(ConfigType[ConfigType.NORMAL_SELL])
                .subscribe(value => {
                    this.customerCredit.currencyRateGroupId = value.body.id;
                });
        }
        this.onParentBuyTypeChange(this.customerCredit.parentBuyTypeId);
        if (this.customerCredit.id) {
            this.minCredit = this.customerCredit.credit - this.customerCredit.currentCredit;
            this.minAmount = this.customerCredit.amount - this.customerCredit.currentAmount;
        } else {
            this.minCredit = 0;
            this.minAmount = 0;
        }

        this.buyTypeService.queryForCustomerCredit(this.customerCredit.customerId)
            .subscribe((res: HttpResponse<BuyType[]>) => {
                this.buyTypes = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));

        this.isSaving = false;
        this.currencyService.query()
            .subscribe((res: HttpResponse<Currency[]>) => {
                this.currencies = res.body;
                if (!this.customerCredit.id) {
                    this.currencies.forEach((currency) => {
                        if (currency.isNationalCurrency) {
                            this.customerCredit.currencyId = currency.id;
                        }
                    });
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));

        this.currencyRateGroupService.query()
            .subscribe((res: HttpResponse<CurrencyRateGroup[]>) => {
                this.currencyRateGroups = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));

        if (this.customerCredit.customerId) {
            this.sellContractProductService.queryByCustomerId(this.customerCredit.customerId)
                .subscribe((res: HttpResponse<SellContractProduct[]>) => {
                    this.sellcontractproducts = res.body;
                }, (res: HttpErrorResponse) => this.onError(res.message));
        }
        /* else if (this.customerCredit.personId) {
             this.sellContractProductService.queryByPersonid(this.customerCredit.personId).subscribe((res) => {
                 this.sellcontractproducts = res.body;
             });
         }*/

    }

    changeCurrency() {
        /*
        this.currencyRates = [];
        if (this._currencyrates) {
            this._currencyrates
                .forEach((c) => {
                    if (c.currencyId === this.customerCredit.currencyId &&
                        c.currencyRateType === this.customerCredit.currencyRateType) {
                        const exist = this.currencyRates.filter((currency) => currency.id === c.id).length > 0;
                        if (!exist && c.id) {
                            this.currencyRates.push(c);
                        }
                    }
                });
        }*/
    }

    clear() {
        this.activeModal.dismiss('cancel');
        UsefulId.sellContractProductId = null;
        UsefulId.customerId = null;
        UsefulId.personId = null;
    }

    save(showNext ?: boolean) {
        this.isSaving = true;
        if (this.customerCredit.id !== undefined) {
            this.subscribeToSaveResponse(
                this.customerCreditService.update(this.customerCredit));
        } else {
            this.subscribeToSaveResponse(
                this.customerCreditService.create(this.customerCredit), showNext);
        }
    }

    trackSellContractProductById(index: number, item: SellContractProduct) {
        return item.id;
    }

    trackcurrencyRateGroupById(index: number, item: CurrencyRateGroup) {
        return item.id;
    }

    trackCurrencyById(index: number, item: Currency) {
        return item.id;
    }

    trackBuyTypeById(index: number, item: Currency) {
        return item.id;
    }

    onParentBuyTypeChange(parentBuyTypeId) {
        if (parentBuyTypeId != null) {
            this.buyTypeService.find(parentBuyTypeId).subscribe((data) => {
                /*let buyGroupQUOTA :any=BuyGroup[BuyGroup.QUOTA]
                buyGroupQUOTA= buyGroupQUOTA as BuyGroup;
                let buyGroupPREBUY :any=BuyGroup[BuyGroup.PREBUY]
                buyGroupPREBUY= buyGroupPREBUY as BuyGroup;*/

                this.customerCredit.parentTypeEffect = data.body.typeEffect;
                this.customerCredit.parentBuyGroup = data.body.buyGroup;
                if (data.body.buyGroup === BuyGroup[BuyGroup.QUOTA]) {
                    this.customerCredit.credit = null;
                    this.customerCredit.currentCredit = null;
                }
                /*else if (data.body.buyGroup === BuyGroup.PREBUY) {
                                   this.customerCredit.amount = null;
                                   this.customerCredit.currentAmount = null;
                               }*/

                if (data.body.buyTypeUsage === BuyTypeUsage[BuyTypeUsage.COST]) {
                    this.disableAmount = true;
                    this.customerCredit.amount = 0;
                } else {
                    this.disableAmount = false;
                    this.disableCredit = false;
                }
            });
        } else {
            this.customerCredit.parentBuyGroup = null;
            this.customerCredit.parentTypeEffect = null;
        }

    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CustomerCredit>>, showNext ?: boolean) {
        result.subscribe((res: HttpResponse<CustomerCredit>) =>
            this.onSaveSuccess(res.body, showNext), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CustomerCredit, showNext ?: boolean) {
        this.eventManager.broadcast({name: 'customerCreditListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
        UsefulId.sellContractProductId = null;
        UsefulId.customerId = null;
        UsefulId.personId = null;
        if (showNext) {
            if (result.customerId) {
                setTimeout(() => {
                    this.router.navigateByUrl(`/customer/${result.customerId}/customer-credit(popup:customer-credit-new/customer/${result.customerId})`);
                }, 1000);
            } else if (result.personId) {
                setTimeout(() => {
                    this.router.navigateByUrl(`/person/${result.personId}/customer-credit(popup:customer-credit-new/person/${result.personId})`);
                }, 1000);
            }
        }
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-customer-credit-popup',
    template: ''
})
export class CustomerCreditPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private customerCreditPopupService: CustomerCreditPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            View.isView = !!params['view'];
            if (params['id']) {
                this.customerCreditPopupService
                    .open(CustomerCreditDialogComponent as Component, params['id']);
            } else if (params['customerId']) {
                UsefulId.customerId = params['customerId'];
                this.customerCreditPopupService
                    .open(CustomerCreditDialogComponent as Component, null, params['customerId']);
            } else if (params['personId']) {
                UsefulId.personId = params['personId'];
                this.customerCreditPopupService
                    .open(CustomerCreditDialogComponent as Component, null, null, params['personId']);
            } else if (params['sellContractProductId']) {
                UsefulId.sellContractProductId = params['sellContractProductId'];
                this.customerCreditPopupService
                    .open(CustomerCreditDialogComponent as Component, null, null, null, params['sellContractProductId']);
            } else {
                console.log('not be...');
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
    static customerId: number;
    static personId: number;
    static sellContractProductId: number;
}
