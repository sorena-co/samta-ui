import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {DayDepot} from './day-depot.model';
import {DayDepotService} from './day-depot.service';
import {Principal} from '../../shared';
import {MainDayDepot, MainDayDepotService} from '../main-day-depot/.';

import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {OilTank} from '../oil-tank/oil-tank.model';
import {MainDayOperation} from '../main-day-operation/main-day-operation.model';
import {OilTankService} from '../oil-tank/oil-tank.service';
import {MainDayOperationService} from '../main-day-operation/main-day-operation.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {OilTankType} from "../oil-tank";
import {DateJalaliPipe} from "../../shared/datetimepicker/date-jalali.pipe";

@Component({
    selector: 'jhi-day-depot',
    templateUrl: './day-depot.component.html'
})
export class DayDepotComponent implements OnInit, OnDestroy {

    currentAccount: any;
    dayDepots: DayDepot[];
    dayDepot: DayDepot = new DayDepot();
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
    mainDayDepotId: number;
    mainDayOperationId: number;
    mainDayDepot: MainDayDepot;
    mainDayOperation: MainDayOperation;

    breadcrumbItems: any[];
    oiltanks: OilTank[];
    isClose: boolean;
    editable: Boolean;

    constructor(private dayDepotService: DayDepotService,
                private oilTankService: OilTankService,
                private mainDayOperationService: MainDayOperationService,
                private mainDayDepotService: MainDayDepotService,
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
        this.mainDayDepotId = activatedRoute.snapshot.params['mainDayDepotId'];
        this.mainDayOperationId = activatedRoute.snapshot.params['mainDayOperationId'];

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

            this.dayDepot[value[0]] = value[1];
        }
    }

    loadAll() {
        if (this.mainDayOperationId != null) {
            this.dayDepotService.queryMainDayOperationId(this.mainDayOperationId, {
                query: this.currentSearch,
                page: this.page,
                size: this.itemsPerPage,
                sort: this.sort()
            }).subscribe(
                (res: HttpResponse<DayDepot[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        } else if (this.mainDayDepotId != null) {
            this.dayDepotService.queryMainDayDepotId(this.mainDayDepotId, {
                query: this.currentSearch,
                page: this.page,
                size: this.itemsPerPage,
                sort: this.sort()
            }).subscribe(
                (res: HttpResponse<DayDepot[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }

    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        if (this.mainDayOperationId != null) {
            this.router.navigate(['main-day-operation/' + this.mainDayOperationId + '/day-depot', {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }]);
        } else if (this.mainDayDepotId != null) {
            this.router.navigate(['main-day-depot/' + this.mainDayDepotId + '/day-depot', {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }]);
        }
        this.dayDepot = new DayDepot();
        this.loadAll();
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.dayDepot.sixtyAddition) {
            this.currentSearch += 'sixtyAddition☼' + this.dayDepot.sixtyAddition + '&';
        }
        if (this.dayDepot.sixtyDeductible) {
            this.currentSearch += 'sixtyDeductible☼' + this.dayDepot.sixtyDeductible + '&';
        }
        if (this.dayDepot.sixtySystemAmount) {
            this.currentSearch += 'sixtySystemAmount☼' + this.dayDepot.sixtySystemAmount + '&';
        }
        if (this.dayDepot.natureAddition) {
            this.currentSearch += 'natureAddition☼' + this.dayDepot.natureAddition + '&';
        }
        if (this.dayDepot.natureDeductible) {
            this.currentSearch += 'natureDeductible☼' + this.dayDepot.natureDeductible + '&';
        }
        if (this.dayDepot.natureSystemAmount) {
            this.currentSearch += 'natureSystemAmount☼' + this.dayDepot.natureSystemAmount + '&';
        }
        if (this.dayDepot.description) {
            this.currentSearch += 'description$' + this.dayDepot.description + '&';
        }
        if (this.dayDepot.oilTankTitle) {
            this.currentSearch += 'oilTank.title$' + this.dayDepot.oilTankTitle + '&';
        }
        if (this.dayDepot.oilTankOilTankType) {
            this.currentSearch += 'oilTank.oilTankType#OilTankType.' + this.dayDepot.oilTankOilTankType + '&';
        }
        if (this.dayDepot.mainDayDepotId) {
            this.currentSearch += 'mainDayDepot.id☼' + this.dayDepot.mainDayDepotId + '&';
        }
        if (this.dayDepot.mainDayOperationId) {
            this.currentSearch += 'mainDayOperation.id☼' + this.dayDepot.mainDayOperationId + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }
        if (this.mainDayOperationId != null) {
            this.router.navigate(['main-day-operation/' + this.mainDayOperationId + '/day-depot', {
                search: this.currentSearch,
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }]);
        } else if (this.mainDayDepotId != null) {
            this.router.navigate(['main-day-depot/' + this.mainDayDepotId + '/day-depot', {
                search: this.currentSearch,
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }]);
        }

        this.loadAll();
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        const dateJalaliPipe = new DateJalaliPipe();
        this.translateService.get('global.menu.home').subscribe((title) => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        if (this.mainDayOperationId != null) {
            this.translateService.get('niopdcgatewayApp.mainDayOperation.home.title').subscribe((title) => {
                this.breadcrumbItems.push({
                    label: `${title} (${dateJalaliPipe.transform(this.mainDayOperation.day)})`,
                    routerLink: ['/main-day-operation']
                });
            });
        } else if (this.mainDayDepotId != null) {
            this.translateService.get('niopdcgatewayApp.dayDepot.home.mainDayDepotTitle').subscribe((title) => {
                this.breadcrumbItems.push({
                    label: `${title} (${dateJalaliPipe.transform(this.mainDayDepot.day)})`,
                    routerLink: ['/main-day-depot']
                });
            });
        }

        this.translateService.get('niopdcgatewayApp.dayDepot.home.title').subscribe((title) => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });

        this.registerChangeInDayDepots();
        if (this.mainDayOperationId != null) {
            this.mainDayOperationService.find(this.mainDayOperationId).subscribe(
                (mainDayOperation) => {
                    this.isClose = mainDayOperation.body.close;
                    this.mainDayOperation = mainDayOperation.body;
                    this.oilTankService.queryByRefuelCenterAndOilTank(this.mainDayOperation.refuelCenterId, OilTankType[OilTankType.UNIT]).subscribe(
                        (res) => {
                            this.oiltanks = res.body;
                        }
                    );
                    this.setBreadCrumb();
                }
            );
        } else if (this.mainDayDepotId != null) {
            this.mainDayDepotService.find(this.mainDayDepotId).subscribe(
                (mainDayDepot) => {
                    this.isClose = mainDayDepot.body.close;
                    this.mainDayDepot = mainDayDepot.body;
                    this.oilTankService.queryByRefuelCenter(this.mainDayDepot.refuelCenterId).subscribe(
                        (res) => {
                            this.oiltanks = res.body;
                        }
                    );
                    this.setBreadCrumb();
                }
            );
        }

        if (this.mainDayDepotId != null)
            this.mainDayDepotService.editable(this.mainDayDepotId).subscribe(
                (res) => {
                    this.editable = res;
                }
            );
        if (this.mainDayOperationId != null)
            this.mainDayOperationService.editable(this.mainDayOperationId).subscribe(
                (res) => {
                    this.editable = res;
                }
            );

    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DayDepot) {
        return item.id;
    }

    trackOilTankById(index: number, item: OilTank) {
        return item.id;
    }

    trackMainDayDepotById(index: number, item: MainDayDepot) {
        return item.id;
    }

    trackMainDayOperationById(index: number, item: MainDayOperation) {
        return item.id;
    }

    registerChangeInDayDepots() {
        this.eventSubscriber = this.eventManager.subscribe('dayDepotListModification', (response) => this.loadAll());
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

            if (this.mainDayOperationId != null) {
                this.router.navigate(['main-day-operation', this.mainDayOperationId, 'day-depot'], {
                    queryParams: {
                        page: this.page,
                        size: this.itemsPerPage,
                        search: this.currentSearch,
                        sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
                    }
                });
            } else if (this.mainDayDepotId != null) {
                this.router.navigate(['main-day-depot', this.mainDayDepotId, 'day-depot'], {
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
        this.dayDepots = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
