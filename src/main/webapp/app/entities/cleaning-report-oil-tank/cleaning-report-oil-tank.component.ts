import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {CleaningReportOilTank} from './cleaning-report-oil-tank.model';
import {CleaningReportOilTankService} from './cleaning-report-oil-tank.service';
import {Principal} from '../../shared';

import {OilTank, OilTankService} from '../oil-tank/.';
import {RefuelCenter, RefuelCenterService} from '../refuel-center/.';
import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {Product} from '../product/product.model';
import {ProductService} from '../product/product.service';

@Component({
    selector: 'jhi-cleaning-report-oil-tank',
    templateUrl: './cleaning-report-oil-tank.component.html'
})
export class CleaningReportOilTankComponent implements OnInit, OnDestroy {

    currentAccount: any;
    cleaningReportOilTanks: CleaningReportOilTank[];
    cleaningReportOilTank: CleaningReportOilTank = new CleaningReportOilTank();
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
    refuelCenters: RefuelCenter[];
    products: Product[];

    constructor(private cleaningReportOilTankService: CleaningReportOilTankService,
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
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = !data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
        this.currentSearch = activatedRoute.snapshot.queryParams['search'] ? activatedRoute.snapshot.queryParams['search'] : '';
        this.cleaningReportOilTank.periodicTankInspection = null;
        this.cleaningReportOilTank.modification = null;
        this.cleaningReportOilTank.highLevelSensor = null;
        this.cleaningReportOilTank.pAndVValue = null;
        this.cleaningReportOilTank.manhole = null;
        this.cleaningReportOilTank.dipStick = null;
        this.cleaningReportOilTank.flameTrap = null;
        this.cleaningReportOilTank.contentGauge = null;
        this.cleaningReportOilTank.footValue = null;
        this.cleaningReportOilTank.drainSump = null;
        this.cleaningReportOilTank.sampleDrainValue = null;
        this.cleaningReportOilTank.confirm = null;
        this.cleaningReportOilTank.isSend = null;

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
                    this.cleaningReportOilTank[value[0]] = Number(value[1]);
                } else if (value[0] === 'periodicTankInspection') {
                    this.cleaningReportOilTank[value[0]] = Boolean(value[1]);
                } else if (value[0] === 'modification') {
                    this.cleaningReportOilTank[value[0]] = Boolean(value[1]);
                } else if (value[0] === 'highLevelSensor') {
                    this.cleaningReportOilTank[value[0]] = Boolean(value[1]);
                } else if (value[0] === 'pAndVValue') {
                    this.cleaningReportOilTank[value[0]] = Boolean(value[1]);
                } else if (value[0] === 'manhole') {
                    this.cleaningReportOilTank[value[0]] = Boolean(value[1]);
                } else if (value[0] === 'dipStick') {
                    this.cleaningReportOilTank[value[0]] = Boolean(value[1]);
                } else if (value[0] === 'flameTrap') {
                    this.cleaningReportOilTank[value[0]] = Boolean(value[1]);
                } else if (value[0] === 'contentGauge') {
                    this.cleaningReportOilTank[value[0]] = Boolean(value[1]);
                } else if (value[0] === 'footValue') {
                    this.cleaningReportOilTank[value[0]] = Boolean(value[1]);
                } else if (value[0] === 'drainSump') {
                    this.cleaningReportOilTank[value[0]] = Boolean(value[1]);
                } else if (value[0] === 'sampleDrainValue') {
                    this.cleaningReportOilTank[value[0]] = Boolean(value[1]);
                } else if (value[0] === 'confirm') {
                    this.cleaningReportOilTank[value[0]] = Boolean(value[1]);
                } else if (value[0] === 'isSend') {
                    this.cleaningReportOilTank[value[0]] = Boolean(value[1]);
                } else {
                    this.cleaningReportOilTank[value[0]] = value[1];
                }
            }
        }
    }

    loadAll() {
        this.cleaningReportOilTankService.query({
            query: this.currentSearch.length > 0 ? this.currentSearch : null,
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<CleaningReportOilTank[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.router.navigate(['/cleaning-report-oil-tank'], {
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.cleaningReportOilTank = new CleaningReportOilTank();
        this.cleaningReportOilTank.isSend = null;
        this.cleaningReportOilTank.sampleDrainValue = null;
        this.cleaningReportOilTank.confirm = null;
        this.cleaningReportOilTank.contentGauge = null;
        this.cleaningReportOilTank.dipStick = null;
        this.cleaningReportOilTank.drainSump = null;
        this.cleaningReportOilTank.flameTrap = null;
        this.cleaningReportOilTank.footValue = null;
        this.cleaningReportOilTank.highLevelSensor = null;
        this.cleaningReportOilTank.manhole = null;
        this.cleaningReportOilTank.modification = null;
        this.cleaningReportOilTank.pAndVValue = null;
        this.cleaningReportOilTank.periodicTankInspection = null;
        this.loadAll();
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.cleaningReportOilTank.capacity) {
            this.currentSearch += 'capacity☼' + this.cleaningReportOilTank.capacity + '&';
        }
        if (this.cleaningReportOilTank.typeOfAlloy) {
            this.currentSearch += 'typeOfAlloy#TypeOfAlloy.' + this.cleaningReportOilTank.typeOfAlloy + '&';
        }
        if (this.cleaningReportOilTank.productId) {
            this.currentSearch += 'productId☼' + this.cleaningReportOilTank.productId + '&';
        }
        if (this.cleaningReportOilTank.periodicTankInspection) {
            this.currentSearch += 'periodicTankInspection;' + this.cleaningReportOilTank.periodicTankInspection + '&';
        }
        if (this.cleaningReportOilTank.cleaningType) {
            this.currentSearch += 'cleaningType#CleaningType.' + this.cleaningReportOilTank.cleaningType + '&';
        }
        if (this.cleaningReportOilTank.modification) {
            this.currentSearch += 'modification;' + this.cleaningReportOilTank.modification + '&';
        }
        if (this.cleaningReportOilTank.cleaningReportNumber) {
            this.currentSearch += 'cleaningReportNumber$' + this.cleaningReportOilTank.cleaningReportNumber + '&';
        }
        if (this.cleaningReportOilTank.registerDate) {
            this.currentSearch += 'registerDate→' + this.cleaningReportOilTank.registerDate.toISOString() + '&';
        }
        if (this.cleaningReportOilTank.exporterName) {
            this.currentSearch += 'exporterName$' + this.cleaningReportOilTank.exporterName + '&';
        }
        if (this.cleaningReportOilTank.highLevelSensor) {
            this.currentSearch += 'highLevelSensor;' + this.cleaningReportOilTank.highLevelSensor + '&';
        }
        if (this.cleaningReportOilTank.pAndVValue) {
            this.currentSearch += 'pAndVValue;' + this.cleaningReportOilTank.pAndVValue + '&';
        }
        if (this.cleaningReportOilTank.manhole) {
            this.currentSearch += 'manhole;' + this.cleaningReportOilTank.manhole + '&';
        }
        if (this.cleaningReportOilTank.dipStick) {
            this.currentSearch += 'dipStick;' + this.cleaningReportOilTank.dipStick + '&';
        }
        if (this.cleaningReportOilTank.flameTrap) {
            this.currentSearch += 'flameTrap;' + this.cleaningReportOilTank.flameTrap + '&';
        }
        if (this.cleaningReportOilTank.contentGauge) {
            this.currentSearch += 'contentGauge;' + this.cleaningReportOilTank.contentGauge + '&';
        }
        if (this.cleaningReportOilTank.footValue) {
            this.currentSearch += 'footValue;' + this.cleaningReportOilTank.footValue + '&';
        }
        if (this.cleaningReportOilTank.drainSump) {
            this.currentSearch += 'drainSump;' + this.cleaningReportOilTank.drainSump + '&';
        }
        if (this.cleaningReportOilTank.sampleDrainValue) {
            this.currentSearch += 'sampleDrainValue;' + this.cleaningReportOilTank.sampleDrainValue + '&';
        }
        if (this.cleaningReportOilTank.description) {
            this.currentSearch += 'description$' + this.cleaningReportOilTank.description + '&';
        }
        if (this.cleaningReportOilTank.confirm) {
            this.currentSearch += 'confirm;' + this.cleaningReportOilTank.confirm + '&';
        }
        if (this.cleaningReportOilTank.isSend) {
            this.currentSearch += 'isSend;' + this.cleaningReportOilTank.isSend + '&';
        }
        if (this.cleaningReportOilTank.oilTankId) {
            this.currentSearch += 'oilTank.id☼' + this.cleaningReportOilTank.oilTankId + '&';
        }
        if (this.cleaningReportOilTank.refuelCenterId) {
            this.currentSearch += 'refuelCenter.id☼' + this.cleaningReportOilTank.refuelCenterId + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        this.router.navigate(['/cleaning-report-oil-tank'], {
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
        this.translateService.get('samtagatewayApp.cleaningReportOilTank.home.title').subscribe((title) => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.productService.query()
            .subscribe((res: HttpResponse<Product[]>) => {
                this.products = res.body;
            });
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });

        this.oilTankService.query().subscribe(
            (res: HttpResponse<OilTank[]>) => {
                this.oiltanks = res.body;
            }
        );
        this.refuelCenterService.queryByReadAccess().subscribe(
            (res: HttpResponse<RefuelCenter[]>) => {
                this.refuelCenters = res.body;
            }
        );

        this.registerChangeInCleaningReportOilTanks();

        this.setBreadCrumb();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CleaningReportOilTank) {
        return item.id;
    }

    trackOilTankById(index: number, item: OilTank) {
        return item.id;
    }

    trackRefuelCenterById(index: number, item: RefuelCenter) {
        return item.id;
    }

    registerChangeInCleaningReportOilTanks() {
        this.eventSubscriber = this.eventManager.subscribe('cleaningReportOilTankListModification', (response) => this.loadAll());
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

            this.router.navigate(['/cleaning-report-oil-tank'], {
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
        this.cleaningReportOilTanks = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
