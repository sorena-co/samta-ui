import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiEventManager, JhiParseLinks, JhiAlertService} from 'ng-jhipster';

import {TranslateService} from '@ngx-translate/core';
import {DetailsBuyRequest} from './details-buy.model';
import {DetailsBuyService} from './details-buy.service';
import {DataStateChangeEvent} from '@progress/kendo-angular-grid';
import {aggregateBy, process, State} from '@progress/kendo-data-query';
import {Product, ProductService} from '../../../entities/product';
import {Depot, DepotService} from '../../../entities/depot';
import {BuyGroup} from '../../../entities/buy-type';
import {CustomerType, CustomerTypeService} from '../../../entities/customer-type';

@Component({
    selector: 'jhi-details-buy',
    templateUrl: './details-buy.component.html'
})
export class DetailsBuyComponent implements OnInit, OnDestroy {

    currentAccount: any;
    detailsBuy: any[] = [];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    breadcrumbItems: any[];
    req: DetailsBuyRequest = new DetailsBuyRequest({});
    aggregates: any[] = [{field: 'totalPrice', aggregate: 'sum'}];
    state: State = {take: 10};
    gridData: any = process(this.detailsBuy, this.state);

    customerTypes: any;
    allCustomerTypes = true;
    allLocations = true;
    cols: string[] = [];

    constructor(
        private detailsBuyService: DetailsBuyService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private translateService: TranslateService,
        private customerTypeService: CustomerTypeService,
        private eventManager: JhiEventManager
    ) {
    }

    loadAll() {
        this.detailsBuyService.query(this.req).subscribe(
            (res: HttpResponse<any[]>) => this.onSuccess(res.body),
            (res: HttpErrorResponse) => this.onError(res.error)
        );
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe((title) => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('samtagatewayApp.detailsBuy.home.title').subscribe((title) => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.setBreadCrumb();
        this.customerTypeService.query()
            .subscribe((res: HttpResponse<CustomerType[]>) => {
                this.customerTypes = res.body.map((p: CustomerType) => {
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
        this.detailsBuy = data;
        if (data && data.length && data.length > 0) {
            this.cols = Object.keys(data[0]).filter((value, index) => index > 3);
        } else {
            this.cols = [];
        }
        this.state = this.req.state;
        if (this.state && this.state.group) {
            this.state.group.map((group) => group.aggregates = this.aggregates);
        }
        this.gridData = process(this.detailsBuy, this.state);
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    public dataStateChange(state: DataStateChangeEvent): void {
        this.req.state = state;
        this.loadAll();
    }
}
