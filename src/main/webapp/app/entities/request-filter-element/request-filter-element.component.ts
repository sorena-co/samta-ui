import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {RequestFilterElement} from './request-filter-element.model';
import {RequestFilterElementService} from './request-filter-element.service';
import {Principal} from '../../shared';

import {OilTank, OilTankService} from '../oil-tank/.';
import {RefuelCenter, RefuelCenterService} from '../refuel-center/.';
import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {Product} from '../product/product.model';
import {ProductService} from '../product/product.service';

@Component({
    selector: 'jhi-request-filter-element',
    templateUrl: './request-filter-element.component.html'
})
export class RequestFilterElementComponent implements OnInit, OnDestroy {

    currentAccount: any;
    requestFilterElements: RequestFilterElement[];
    requestFilterElement: RequestFilterElement = new RequestFilterElement();
    error: any;
    success: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    breadcrumbItems: any[];

    oiltanks: OilTank[];
    products: Product[];
    refuelCenters: RefuelCenter[];

    constructor(private requestFilterElementService: RequestFilterElementService,
                private oilTankService: OilTankService,
                private productService: ProductService,
                private refuelCenterService: RefuelCenterService,
                private parseLinks: JhiParseLinks,
                private jhiAlertService: JhiAlertService,
                private principal: Principal,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private translateService: TranslateService,
                private eventManager: JhiEventManager) {
        this.routeData = this.activatedRoute.data.subscribe((data) => {
            this.itemsPerPage = data.pagingParams.size;
            this.page = data['pagingParams'].page;
            this.previousPage = data['pagingParams'].page;
            this.reverse = data['pagingParams'].ascending;
            this.predicate = data['pagingParams'].predicate;
        });
        this.currentSearch = activatedRoute.snapshot.queryParams['search'] ? activatedRoute.snapshot.queryParams['search'] : '';
        this.requestFilterElement.isSend = null;

        const x = this.currentSearch.split('&');
        for (const key of x) {
            let value = key.split('$');
            if (key.lastIndexOf('#') >= 0) { // enum
                value = key.split('#');
            } else if (key.lastIndexOf(';') >= 0) { // Boolean
                value = key.split(';');
            } else if (key.lastIndexOf('☼') >= 0) { // equal number
                value = key.split('☼');
            } else if (key.lastIndexOf('>') >= 0) { // number
                value = key.split('>');
            } else if (key.lastIndexOf('<') >= 0) { // number
                value = key.split('<');
            } else if (key.lastIndexOf('→') >= 0) { // start date
                value = key.split('→');
            } else if (key.lastIndexOf('←') >= 0) { // end date
                value = key.split('←');
            }

            if (value.length > 1) {
                if (value[0].indexOf('.') > 0) {
                    const z = value[0].split('.');
                    value[0] = z[0] + z[1].substring(0, 1).toUpperCase() + z[1].substring(1);
                    this.requestFilterElement[value[0]] = Number(value[1]);
                } else if (value[0] === 'isSend') {
                    this.requestFilterElement[value[0]] = Boolean(value[1]);
                } else {
                    this.requestFilterElement[value[0]] = value[1];
                }
            }
        }
    }

    loadAll() {
        this.requestFilterElementService.query({
            query: this.currentSearch.length > 0 ? this.currentSearch : null,
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<RequestFilterElement[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.router.navigate(['/request-filter-element'], {
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.requestFilterElement = new RequestFilterElement();
        this.requestFilterElement.isSend = null;
        this.loadAll();
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.requestFilterElement.filterNumber) {
            this.currentSearch += 'filterNumber$' + this.requestFilterElement.filterNumber + '&';
        }
        if (this.requestFilterElement.lastChangeDate) {
            this.currentSearch += 'lastChangeDate→' + this.requestFilterElement.lastChangeDate.toISOString() + '&';
        }
        if (this.requestFilterElement.microFilter) {
            this.currentSearch += 'microFilter$' + this.requestFilterElement.microFilter + '&';
        }
        if (this.requestFilterElement.coalescer) {
            this.currentSearch += 'coalescer$' + this.requestFilterElement.coalescer + '&';
        }
        if (this.requestFilterElement.separator) {
            this.currentSearch += 'separator$' + this.requestFilterElement.separator + '&';
        }
        if (this.requestFilterElement.monitor) {
            this.currentSearch += 'monitor$' + this.requestFilterElement.monitor + '&';
        }
        if (this.requestFilterElement.clay) {
            this.currentSearch += 'clay$' + this.requestFilterElement.clay + '&';
        }
        if (this.requestFilterElement.productId) {
            this.currentSearch += 'productId☼' + this.requestFilterElement.productId + '&';
        }
        if (this.requestFilterElement.filterLocation) {
            this.currentSearch += 'filterLocation#FilterLocation.' + this.requestFilterElement.filterLocation + '&';
        }
        if (this.requestFilterElement.psi) {
            this.currentSearch += 'psi☼' + this.requestFilterElement.psi + '&';
        }
        if (this.requestFilterElement.microFilterModel) {
            this.currentSearch += 'microFilterModel$' + this.requestFilterElement.microFilterModel + '&';
        }
        if (this.requestFilterElement.microFilterModelCount) {
            this.currentSearch += 'microFilterModelCount☼' + this.requestFilterElement.microFilterModelCount + '&';
        }
        if (this.requestFilterElement.coalesceModel) {
            this.currentSearch += 'coalesceModel$' + this.requestFilterElement.coalesceModel + '&';
        }
        if (this.requestFilterElement.coalesceModelCount) {
            this.currentSearch += 'coalesceModelCount☼' + this.requestFilterElement.coalesceModelCount + '&';
        }
        if (this.requestFilterElement.monitorModel) {
            this.currentSearch += 'monitorModel$' + this.requestFilterElement.monitorModel + '&';
        }
        if (this.requestFilterElement.monitorModelCount) {
            this.currentSearch += 'monitorModelCount☼' + this.requestFilterElement.monitorModelCount + '&';
        }
        if (this.requestFilterElement.separatorModel) {
            this.currentSearch += 'separatorModel$' + this.requestFilterElement.separatorModel + '&';
        }
        if (this.requestFilterElement.separatorModelCount) {
            this.currentSearch += 'separatorModelCount☼' + this.requestFilterElement.separatorModelCount + '&';
        }
        if (this.requestFilterElement.clayModel) {
            this.currentSearch += 'clayModel$' + this.requestFilterElement.clayModel + '&';
        }
        if (this.requestFilterElement.clayModelCount) {
            this.currentSearch += 'clayModelCount☼' + this.requestFilterElement.clayModelCount + '&';
        }
        if (this.requestFilterElement.elementRequestReason) {
            this.currentSearch += 'elementRequestReason#ElementRequestReason.' + this.requestFilterElement.elementRequestReason + '&';
        }
        if (this.requestFilterElement.amountFuelPassed) {
            this.currentSearch += 'amountFuelPassed☼' + this.requestFilterElement.amountFuelPassed + '&';
        }
        if (this.requestFilterElement.description) {
            this.currentSearch += 'description$' + this.requestFilterElement.description + '&';
        }
        if (this.requestFilterElement.isSend) {
            this.currentSearch += 'isSend;' + this.requestFilterElement.isSend + '&';
        }
        if (this.requestFilterElement.oilTankId) {
            this.currentSearch += 'oilTank.id☼' + this.requestFilterElement.oilTankId + '&';
        }
        if (this.requestFilterElement.refuelCenterId) {
            this.currentSearch += 'refuelCenter.id☼' + this.requestFilterElement.refuelCenterId + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        this.router.navigate(['/request-filter-element'], {
            queryParams: {
                search: this.currentSearch,
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.loadAll();
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe((title) => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.requestFilterElement.home.title').subscribe((title) => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.productService.query()
            .subscribe((res) => {
                this.products = res.body;
            });
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });

        this.oilTankService.query().subscribe(
            (res) => {
                this.oiltanks = res.body;
            }
        );
        this.refuelCenterService.queryByReadAccess().subscribe(
            (res) => {
                this.refuelCenters = res.body;
            }
        );

        this.registerChangeInRequestFilterElements();

        this.setBreadCrumb();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: RequestFilterElement) {
        return item.id;
    }

    trackOilTankById(index: number, item: OilTank) {
        return item.id;
    }

    trackRefuelCenterById(index: number, item: RefuelCenter) {
        return item.id;
    }

    trackProductById(index: number, item: RefuelCenter) {
        return item.id;
    }

    registerChangeInRequestFilterElements() {
        this.eventSubscriber = this.eventManager.subscribe('requestFilterElementListModification', (response) => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'desc' : 'asc')];
        
        return result;
    }

    loadLazy(event: LazyLoadEvent) {
        const predicate = this.predicate;
        const reverse = this.reverse;
        const page = this.page;
        const itemsPerPage = this.itemsPerPage;
        this.page = (event.first / event.rows) + 1;
        this.itemsPerPage = event.rows;
        if (event.sortField) {
            this.predicate = event.sortField;
            this.reverse = event.sortOrder !== 1;
        }

        if (this.page > 1 ||
            this.page !== page ||
            this.itemsPerPage !== itemsPerPage ||
            this.predicate !== predicate ||
            this.reverse !== reverse) {

            this.router.navigate(['/request-filter-element'], {
                queryParams: {
                    page: this.page,
                    size: this.itemsPerPage,
                    search: this.currentSearch,
                    sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
                }
            });
        }

        this.loadAll();
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.requestFilterElements = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
