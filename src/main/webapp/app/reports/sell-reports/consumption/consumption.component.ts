import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiEventManager, JhiParseLinks, JhiAlertService} from 'ng-jhipster';

import {TranslateService} from '@ngx-translate/core';
import {Consumption, ConsumptionRequest} from './consumption.model';
import {ConsumptionService} from './consumption.service';
import {DataStateChangeEvent} from '@progress/kendo-angular-grid';
import {aggregateBy, process, State} from '@progress/kendo-data-query';
import {Product, ProductService} from '../../../entities/product';
import {Depot, DepotService} from '../../../entities/depot';
import {BuyGroup} from '../../../entities/buy-type';

@Component({
    selector: 'jhi-consumption',
    templateUrl: './consumption.component.html'
})
export class ConsumptionComponent implements OnInit, OnDestroy {

    currentAccount: any;
    consumption: Consumption[] = [];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    breadcrumbItems: any[];
    req: ConsumptionRequest = new ConsumptionRequest({});
    aggregates: any[] = [{field: 'totalPrice', aggregate: 'sum'}];
    state: State = {take: 10};
    gridData: any = process(this.consumption, this.state);

    buyGroups: any = [];
    depots: any;
    products: any;
    BuyGroup = BuyGroup;
    cols: string[] = [];

    allLocations = true;
    allProducts = true;

    constructor(
        private consumptionService: ConsumptionService,
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
                    label: this.translateService.instant('niopdcgatewayApp.BuyGroup.' + BuyGroup[buyGroup]),
                    value: BuyGroup[buyGroup]
                });
            }
        }
    }

    loadAll() {
        if (this.allProducts) {
            this.req.products = null;
        }
        if (this.allLocations) {
            this.req.locations = null;
        }
        this.consumptionService.query(this.req).subscribe(
            (res: HttpResponse<Consumption[]>) => this.onSuccess(res.body),
            (res: HttpErrorResponse) => this.onError(res.error)
        );
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe((title) => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.consumption.home.title').subscribe((title) => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.req.startDate = new Date();
        this.req.startDate.setHours(0);
        this.req.startDate.setMinutes(0);
        this.req.startDate.setSeconds(0);
        this.req.startDate.setSeconds(0);
        this.req.finishDate = new Date();
        this.req.finishDate.setHours(23);
        this.req.finishDate.setMinutes(59);
        this.req.finishDate.setSeconds(59);
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
        this.consumption = data;
        if (data && data.length && data.length > 0) {
            this.cols = Object.keys(data[0]).filter((value, index) => index > 3);
        } else {
            this.cols = [];
        }
        this.state = this.req.state;
        if (this.state && this.state.group) {
            this.state.group.map((group) => group.aggregates = this.aggregates);
        }
        this.gridData = process(this.consumption, this.state);
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    public dataStateChange(state: DataStateChangeEvent): void {
        this.req.state = state;
        this.loadAll();
    }
}
