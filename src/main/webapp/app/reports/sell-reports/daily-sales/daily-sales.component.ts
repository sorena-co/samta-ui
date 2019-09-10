import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiEventManager, JhiParseLinks, JhiAlertService} from 'ng-jhipster';

import {TranslateService} from '@ngx-translate/core';
import {DailySales, DailySalesRequest} from './daily-sales.model';
import {DailySalesService} from './daily-sales.service';
import {DataStateChangeEvent} from '@progress/kendo-angular-grid';
import {aggregateBy, process, State} from '@progress/kendo-data-query';
import {Product, ProductService} from '../../../entities/product';
import {Depot, DepotService} from '../../../entities/depot';
import {BuyGroup} from '../../../entities/buy-type';
import {CurrencyService} from '../../../entities/currency';

@Component({
    selector: 'jhi-daily-sales',
    templateUrl: './daily-sales.component.html'
})
export class DailySalesComponent implements OnInit, OnDestroy {

    currentAccount: any;
    dailySales: DailySales[] = [];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    breadcrumbItems: any[];
    req: DailySalesRequest = new DailySalesRequest({});
    aggregates: any[] = [{field: 'totalPrice', aggregate: 'sum'}];
    state: State = {take: 10};
    gridData: any = process(this.dailySales, this.state);

    buyGroups: any = [];
    depots: any;
    currencies: any;
    products: any;
    BuyGroup = BuyGroup;
    allDepots = true;
    allBuyGroups = true;
    allLocations = true;
    allProducts = true;
    allCurrencies = true;
    allCustomers = true;

    constructor(
        private dailySalesService: DailySalesService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private translateService: TranslateService,
        private productService: ProductService,
        private depotService: DepotService,
        private currencyService: CurrencyService,
        private eventManager: JhiEventManager
    ) {
        for (const buyGroup in BuyGroup) {
            if (parseInt(buyGroup, 10) >= 0) {
                this.buyGroups.push({
                    label: this.translateService.instant('samtagatewayApp.BuyGroup.' + BuyGroup[buyGroup]),
                    value: BuyGroup[buyGroup]
                });
            }
        }
    }

    loadAll() {
        if (this.allCustomers) {
            this.req.customers = null;
        }
        if (this.allBuyGroups) {
            this.req.buyGroups = null;
        }
        if (this.allDepots) {
            this.req.depots = null;
        }
        if (this.allCurrencies) {
            this.req.currencies = null;
        }
        if (this.allProducts) {
            this.req.products = null;
        }
        if (this.allLocations) {
            this.req.locations = null;
        }
        this.dailySalesService.query(this.req).subscribe(
            (res: HttpResponse<DailySales[]>) => this.onSuccess(res.body),
            (res: HttpErrorResponse) => this.onError(res.error)
        );
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe((title) => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('samtagatewayApp.dailySales.home.title').subscribe((title) => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.setBreadCrumb();
        this.productService.query()
            .subscribe((res: HttpResponse<Product[]>) => {
                this.products = res.body.map((p: Product) => {
                    return {label: p.title, value: p.id};
                });
            }, (res: HttpErrorResponse) => this.onError(res.error));

        this.depotService.query()
            .subscribe((res: HttpResponse<Depot[]>) => {
                this.depots = res.body.map((p) => {
                    return {label: p.title, value: p.id};
                });
            }, (res: HttpErrorResponse) => this.onError(res.error));
        this.currencyService.query()
            .subscribe((res: HttpResponse<Depot[]>) => {
                this.currencies = res.body.map((p) => {
                    return {label: p.title, value: p.id};
                });
            }, (res: HttpErrorResponse) => this.onError(res.error));

        this.req.startDate = new Date();
        this.req.startDate.setHours(0);
        this.req.startDate.setMinutes(0);
        this.req.startDate.setSeconds(0);
        this.req.finishDate = new Date();
        this.req.finishDate.setHours(23);
        this.req.finishDate.setMinutes(59);
        this.req.finishDate.setSeconds(59);

    }

    ngOnDestroy() {
    }

    private onSuccess(data) {
        this.dailySales = data;
        this.state = this.req.state;
        if (this.state && this.state.group) {
            this.state.group.map((group) => group.aggregates = this.aggregates);
        }
        this.gridData = process(this.dailySales, this.state);
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    public dataStateChange(state: DataStateChangeEvent): void {
        this.req.state = state;
        this.loadAll();
    }
}
