import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiEventManager, JhiParseLinks, JhiAlertService} from 'ng-jhipster';

import {TranslateService} from '@ngx-translate/core';
import {DailySalesSummary, DailySalesSummaryRequest} from './daily-sales-summary.model';
import {DailySalesSummaryService} from './daily-sales-summary.service';
import {DataStateChangeEvent} from '@progress/kendo-angular-grid';
import {aggregateBy, process, State} from '@progress/kendo-data-query';
import {Product, ProductService} from '../../../entities/product';
import {Depot, DepotService} from '../../../entities/depot';
import {BuyGroup} from '../../../entities/buy-type';

@Component({
    selector: 'jhi-daily-sales-summary',
    templateUrl: './daily-sales-summary.component.html'
})
export class DailySalesSummaryComponent implements OnInit, OnDestroy {

    currentAccount: any;
    dailySalesSummary: DailySalesSummary[] = [];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    breadcrumbItems: any[];
    req: DailySalesSummaryRequest = new DailySalesSummaryRequest({});
    aggregates: any[] = [{field: 'totalPrice', aggregate: 'sum'}];
    state: State = {take: 10};
    gridData: any = process(this.dailySalesSummary, this.state);

    buyGroups: any = [];
    depots: any;
    products: any;
    BuyGroup = BuyGroup;
    allLocations = true;
    allProducts = true;
    allBuyGroups = true;

    constructor(
        private dailySalesSummaryService: DailySalesSummaryService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private translateService: TranslateService,
        private productService: ProductService,
        private depotService: DepotService,
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
        if (this.allBuyGroups) {
            this.req.buyGroups = null;
        }
        if (this.allLocations) {
            this.req.locations = null;
        }
        if (this.allProducts) {
            this.req.products = null;
        }
        this.dailySalesSummaryService.query(this.req).subscribe(
            (res: HttpResponse<DailySalesSummary[]>) => this.onSuccess(res.body),
            (res: HttpErrorResponse) => this.onError(res.error)
        );
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe((title) => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('samtagatewayApp.dailySalesSummary.home.title').subscribe((title) => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.req.date = new Date();
        this.req.date.setHours(0);
        this.req.date.setMinutes(0);
        this.req.date.setSeconds(0);
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
    }

    ngOnDestroy() {
    }

    private onSuccess(data) {
        this.dailySalesSummary = data;
        this.state = this.req.state;
        if (this.state && this.state.group) {
            this.state.group.map((group) => group.aggregates = this.aggregates);
        }
        this.gridData = process(this.dailySalesSummary, this.state);
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    public dataStateChange(state: DataStateChangeEvent): void {
        this.req.state = state;
        this.loadAll();
    }
}
