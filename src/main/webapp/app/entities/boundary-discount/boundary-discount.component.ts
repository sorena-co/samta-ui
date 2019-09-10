import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {BoundaryDiscount} from './boundary-discount.model';
import {BoundaryDiscountService} from './boundary-discount.service';
import {ITEMS_PER_PAGE, Principal} from '../../shared';

import {Product, ProductService} from '../product/.';
import {Location, LocationService} from '../location/.';
import {Country, CountryService} from '../country/.';
import {VehicleModel, VehicleModelService} from '../vehicle-model/.';
import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";

@Component({
    selector: 'jhi-boundary-discount',
    templateUrl: './boundary-discount.component.html'
})
export class BoundaryDiscountComponent implements OnInit, OnDestroy {


    currentAccount: any;
    boundaryDiscounts: BoundaryDiscount[];
    boundaryDiscount: BoundaryDiscount = new BoundaryDiscount();
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

    products: Product[];
    locations: Location[];
    countries: Country[];
    vehiclemodels: VehicleModel[];


    constructor(
        private boundaryDiscountService: BoundaryDiscountService,
        private productService: ProductService,
        private locationService: LocationService,
        private countryService: CountryService,
        private vehicleModelService: VehicleModelService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private translateService: TranslateService,
        private eventManager: JhiEventManager
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe((data) => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = !data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
        this.currentSearch = activatedRoute.snapshot.queryParams['search'] ? activatedRoute.snapshot.queryParams['search'] : '';

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
                    this.boundaryDiscount[value[0]] = Number(value[1]);
                }
                else {
                    this.boundaryDiscount[value[0]] = value[1];
                }
            }
        }
    }

    loadAll() {
        this.boundaryDiscountService.query(null,null,null,null,{
            query: this.currentSearch.length > 0 ? this.currentSearch : null,
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()}).subscribe(
                (res: HttpResponse<BoundaryDiscount[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.router.navigate(['/boundary-discount'], {
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.boundaryDiscount = new BoundaryDiscount();
        this.loadAll();
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.boundaryDiscount.liter) {
            this.currentSearch += 'liter☼' + this.boundaryDiscount.liter + '&';
        }
        if (this.boundaryDiscount.kilometer) {
            this.currentSearch += 'kilometer☼' + this.boundaryDiscount.kilometer + '&';
        }
        if (this.boundaryDiscount.productTitle) {
            this.currentSearch += 'product.title$' + this.boundaryDiscount.productTitle+ '&';
        }
        if (this.boundaryDiscount.locationName) {
            this.currentSearch += 'location.name$' + this.boundaryDiscount.locationName + '&';
        }
        if (this.boundaryDiscount.countryName) {
            this.currentSearch += 'country.name$' + this.boundaryDiscount.countryName + '&';
        }
        if (this.boundaryDiscount.vehicleModelTitle) {
            this.currentSearch += 'vehicleModel.title$' + this.boundaryDiscount.vehicleModelTitle+ '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        this.router.navigate(['/boundary-discount'], {
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
        this.translateService.get('samtagatewayApp.boundaryDiscount.home.title').subscribe((title) => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });

        this.productService.query().subscribe(
            (res) => {
                this.products = res.body;
            }
        );
        this.locationService.query().subscribe(
            (res) => {
                this.locations = res.body;
            }
        );
        this.countryService.query().subscribe(
            (res) => {
                this.countries = res.body;
            }
        );
        this.vehicleModelService.query().subscribe(
            (res) => {
                this.vehiclemodels = res.body;
            }
        );

        this.registerChangeInBoundaryDiscounts();

        this.setBreadCrumb();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: BoundaryDiscount) {
        return item.id;
    }

    trackProductById(index: number, item: Product) {
        return item.id;
    }

    trackLocationById(index: number, item: Location) {
        return item.id;
    }

    trackCountryById(index: number, item: Country) {
        return item.id;
    }

    trackVehicleModelById(index: number, item: VehicleModel) {
        return item.id;
    }

    registerChangeInBoundaryDiscounts() {
        this.eventSubscriber = this.eventManager.subscribe('boundaryDiscountListModification', (response) => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'desc' : 'asc')];
        
        return result;
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.boundaryDiscounts = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }


    loadLazy(event: LazyLoadEvent) {
        let predicate = this.predicate;
        let reverse = this.reverse;
        let page = this.page;
        let itemsPerPage = this.itemsPerPage;
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
            this.reverse != reverse) {

            this.router.navigate(['/boundary-discount'], {
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


}
