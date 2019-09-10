import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {ProductRate} from './product-rate.model';
import {ProductRatePopupService} from './product-rate-popup.service';
import {ProductRateService} from './product-rate.service';
import {Currency, CurrencyService} from '../currency';
import {CurrencyRateGroup, CurrencyRateGroupService} from '../currency-rate-group';
import {RateGroup, RateGroupService} from '../rate-group';
import {CustomerTypeService} from '../customer-type/customer-type.service';
import {CustomerType} from '../customer-type/customer-type.model';
import {RegionService} from '../region/region.service';
import {Region} from '../region/region.model';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {toInteger} from "@ng-bootstrap/ng-bootstrap/util/util";

@Component({
    selector: 'jhi-product-rate-dialog',
    templateUrl: './product-rate-dialog.component.html'
})
export class ProductRateDialogComponent implements OnInit {

    productRate: ProductRate;
    isSaving: boolean;
    isView: boolean;
    customerTypes: any[];
    allCustomerTypes: any[];
    regions: Region[] = [];
    regexCode = /^[\d]{3}$/;

    currencies: Currency[];

    currencyrategroups: CurrencyRateGroup[];

    rategroups: RateGroup[];
    disableFields: boolean;
    maxDate: any;
    galon: boolean;
    galonAmount: number;

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private productRateService: ProductRateService,
                private currencyService: CurrencyService,
                private currencyRateGroupService: CurrencyRateGroupService,
                private rateGroupService: RateGroupService,
                private regionService: RegionService,
                private router: Router,
                private customerTypeService: CustomerTypeService,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.productRate.containerId = UsefulId.containerId;
        this.productRate.productId = UsefulId.productId;

        if (this.productRate.id) {
            if (this.productRate.productId) {
                this.galonAmount = this.productRate.price * 0.264178;
                this.productRateService.isUseProductRateInOrderProduct(this.productRate.id)
                    .subscribe((value) => {
                        this.maxDate = value.body;
                        if (this.maxDate) {
                            this.maxDate = new Date(this.maxDate);
                            this.disableFields = true;
                        }
                    });
            } else if (this.productRate.containerId) {
                this.productRateService.isUseContainerRateInOrderProduct(this.productRate.id)
                    .subscribe((value) => {
                        this.maxDate = value.body;
                        if (this.maxDate) {
                            this.maxDate = new Date(this.maxDate);
                            this.disableFields = true;
                        }
                    });
            }
        }
        this.currencyService.query()
            .subscribe((res) => {
                this.currencies = res.body;
                if (!this.productRate.id) {
                    this.currencies.forEach((currency) => {
                        if (currency.isNationalCurrency) {
                            this.productRate.currencyId = currency.id;
                        }
                    });
                }
            }, (res) => this.onError(res.body));
        this.currencyRateGroupService.query()
            .subscribe((res) => {
                this.currencyrategroups = res.body;
            }, (res) => this.onError(res.message));
        this.rateGroupService.query()
            .subscribe((res) => {
                this.rategroups = res.body;
            }, (res) => this.onError(res.message));
        this.customerTypeService.query().subscribe((customerTypes) => {
            this.allCustomerTypes = customerTypes.body;
            this.customerTypes = [];
            this.allCustomerTypes.forEach((value: CustomerType) => {
                const newVar = {
                    label: value.title,
                    value: value.id
                };
                this.customerTypes.push(newVar);
            });
            console.log(this.customerTypes);
        });
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save(showNext ?: boolean) {
        this.isSaving = true;
        if (this.productRate.id !== undefined) {
            if (this.productRate.productId) {
                this.subscribeToSaveResponse(
                    this.productRateService.updateByProduct(this.productRate));
            } else if (this.productRate.containerId) {
                this.subscribeToSaveResponse(
                    this.productRateService.updateByContainer(this.productRate));
            }
        } else {
            if (this.productRate.productId) {
                this.subscribeToSaveResponse(
                    this.productRateService.createByProduct(this.productRate), showNext);
            } else if (this.productRate.containerId) {
                this.subscribeToSaveResponse(
                    this.productRateService.createByContainer(this.productRate));
            }
        }
    }

    changePrice(event, changePrice) {
        if (changePrice) {
            const amount = Number(event) * 0.264178;
            this.galonAmount = Math.ceil(amount);
            console.log(amount);
            console.log(this.galonAmount);
        } else {
            this.galonAmount = Number(event);
            this.productRate.price = Math.ceil(Number(event) / 0.264178);
        }
    }

    trackCurrencyById(index: number, item: Currency) {
        return item.id;
    }

    trackCurrencyRateGroupById(index: number, item: CurrencyRateGroup) {
        return item.id;
    }

    trackRateGroupById(index: number, item: RateGroup) {
        return item.id;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ProductRate>>, showNext ?: boolean) {
        result.subscribe((res: HttpResponse<ProductRate>) =>
            this.onSaveSuccess(res.body, showNext), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ProductRate, showNext ?: boolean) {
        this.eventManager.broadcast({name: 'productRateListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
        if (showNext) {
            setTimeout(() => {
                this.router.navigateByUrl(`/product/${result.productId}/product-rate(popup:product-rate-new/product/${result.productId})`);
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
    selector: 'jhi-product-rate-popup',
    template: ''
})
export class ProductRatePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private productRatePopupService: ProductRatePopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.productRatePopupService
                    .open(ProductRateDialogComponent as Component, params['id']);
            } else if (params['productId']) {
                UsefulId.productId = params['productId'];
                this.productRatePopupService
                    .open(ProductRateDialogComponent as Component, null, params['productId'], null);
            } else if (params['containerId']) {
                UsefulId.containerId = params['containerId'];
                this.productRatePopupService
                    .open(ProductRateDialogComponent as Component, null, null, params['containerId']);
            } else {
                console.log('not be');
            }
            if (params['productId']) {
                UsefulId.productId = params['productId'];
            }
            if (params['containerId']) {
                UsefulId.containerId = params['containerId'];
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
    static productId: number;
    static containerId: number;
}
