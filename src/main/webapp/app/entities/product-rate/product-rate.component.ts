import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {ProductRate} from './product-rate.model';
import {ProductRateService} from './product-rate.service';
import {Principal} from '../../shared';
import {Product, ProductService} from '../product/.';
import {Currency, CurrencyService} from '../currency/.';
import {CurrencyRateGroup, CurrencyRateGroupService} from '../currency-rate-group/.';
import {RateGroup, RateGroupService} from '../rate-group/.';
import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {Container} from '../container/container.model';
import {ContainerService} from '../container/container.service';

@Component({
    selector: 'jhi-product-rate',
    templateUrl: './product-rate.component.html'
})
export class ProductRateComponent implements OnInit, OnDestroy {

    currentAccount: any;
    productRates: ProductRate[];
    productRate: ProductRate = new ProductRate();
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
    productId: number;
    containerId: number;
    product: Product;
    container: Container;
    breadcrumbItems: any[];

    currencies: Currency[];
    currencyrategroups: CurrencyRateGroup[];
    rategroups: RateGroup[];

    constructor(private productRateService: ProductRateService,
                private currencyService: CurrencyService,
                private currencyRateGroupService: CurrencyRateGroupService,
                private rateGroupService: RateGroupService,
                private productService: ProductService,
                private containerService: ContainerService,
                private parseLinks: JhiParseLinks,
                private jhiAlertService: JhiAlertService,
                private principal: Principal,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private translateService: TranslateService,
                private eventManager: JhiEventManager) {
        this.routeData = this.activatedRoute.data.subscribe((data) => {
            this.itemsPerPage = data.pagingParams.size;
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = !data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
        this.currentSearch = activatedRoute.snapshot.queryParams['search'] ? activatedRoute.snapshot.queryParams['search'] : '';
        this.productId = activatedRoute.snapshot.params['productId'];
        this.containerId = activatedRoute.snapshot.params['containerId'];

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
                    this.productRate[value[0]] = Number(value[1]);
                } else {
                    this.productRate[value[0]] = value[1];
                }
            }
        }
    }

    loadAll() {
        if (this.productId) {
            this.productRateService.queryByProduct(this.productId, {
                query: this.currentSearch.length > 0 ? this.currentSearch : null,
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            }).subscribe(
                (res: HttpResponse<ProductRate[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        } else if (this.containerId) {
            this.productRateService.queryByContainer(this.containerId, {
                query: this.currentSearch.length > 0 ? this.currentSearch : null,
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            }).subscribe(
                (res: HttpResponse<ProductRate[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';

        if (this.productId) {
            this.router.navigate(['product/' + this.productId + '/product-rate', {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }]);
        } else if (this.containerId) {
            this.router.navigate(['container/' + this.containerId + '/container-rate', {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }]);
        }
        this.productRate = new ProductRate();
        this.loadAll();
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.productRate.productId) {
            this.currentSearch += 'productId☼' + this.productRate.productId + '&';
        }
        if (this.productRate.containerId) {
            this.currentSearch += 'containerId☼' + this.productRate.containerId + '&';
        }
        if (this.productRate.src) {
            this.currentSearch += 'src$' + this.productRate.src + '&';
        }
        if (this.productRate.price) {
            this.currentSearch += 'price☼' + this.productRate.price + '&';
        }
        if (this.productRate.startDate) {
            this.currentSearch += 'startDate→' + this.productRate.startDate.toISOString() + '&';
        }
        if (this.productRate.finishDate) {
            this.currentSearch += 'finishDate→' + this.productRate.finishDate.toISOString() + '&';
        }
        if (this.productRate.currencyId) {
            this.currentSearch += 'currency.id☼' + this.productRate.currencyId + '&';
        }
        if (this.productRate.rateGroupId) {
            this.currentSearch += 'rateGroup.id☼' + this.productRate.rateGroupId + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        if (this.productId) {
            this.router.navigate(['product/' + this.productId + '/product-rate', {
                search: this.currentSearch,
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }]);
        } else if (this.containerId) {
            this.router.navigate(['container/' + this.containerId + '/container-rate', {
                search: this.currentSearch,
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }]);
        }
        this.loadAll();
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe((title) => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        if (this.productId) {
            this.translateService.get('samtagatewayApp.productRate.home.productTitle').subscribe((title) => {
                this.breadcrumbItems.push({label: title + ` (${this.product.title})`, routerLink: ['/product']});
            });
            this.translateService.get('samtagatewayApp.containerRate.home.titleProduct').subscribe((title) => {
                this.breadcrumbItems.push({label: title});
            });
        } else if (this.containerId) {
            this.translateService.get('samtagatewayApp.productRate.home.containerTitle').subscribe((title) => {
                this.breadcrumbItems.push({label: title + ` (${this.container.title})`, routerLink: ['/container']});
            });
            this.translateService.get('samtagatewayApp.containerRate.home.titleContainer').subscribe((title) => {
                this.breadcrumbItems.push({label: title});
            });
        }

    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });

        this.currencyService.query().subscribe(
            (res) => {
                this.currencies = res.body;
            }
        );
        this.currencyRateGroupService.query().subscribe(
            (res) => {
                this.currencyrategroups = res.body;
            }
        );
        this.rateGroupService.query().subscribe(
            (res) => {
                this.rategroups = res.body;
            }
        );

        this.registerChangeInProductRates();

        if (this.productId) {
            this.productService.find(this.productId).subscribe(
                (product) => {
                    this.product = product.body;
                    this.setBreadCrumb();
                }
            );
        } else if (this.containerId) {
            this.containerService.find(this.containerId).subscribe(
                (container) => {
                    this.container = container.body;
                    this.setBreadCrumb();
                }
            );
        }
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ProductRate) {
        return item.id;
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

    registerChangeInProductRates() {
        this.eventSubscriber = this.eventManager.subscribe('productRateListModification', (response) => this.loadAll());
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

            if (this.productId) {
                this.router.navigate(['product', this.productId, 'product-rate'], {
                    queryParams: {
                        page: this.page,
                        size: this.itemsPerPage,
                        search: this.currentSearch,
                        sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
                    }
                });
            } else if (this.containerId) {
                this.router.navigate(['container', this.containerId, 'container-rate'], {
                    queryParams: {
                        page: this.page,
                        size: this.itemsPerPage,
                        search: this.currentSearch,
                        sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
                    }
                });
            }
        }

        this.loadAll();
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.productRates = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
