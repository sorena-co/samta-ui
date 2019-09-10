import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiEventManager, JhiParseLinks, JhiAlertService} from 'ng-jhipster';

import {TranslateService} from '@ngx-translate/core';
import {MetreSheet, MetreSheetRequest} from './metre-sheet.model';
import {MetreSheetService} from './metre-sheet.service';
import {DataStateChangeEvent} from '@progress/kendo-angular-grid';
import {aggregateBy, process, State} from '@progress/kendo-data-query';
import {Product, ProductService} from '../../../entities/product';
import {Depot, DepotService} from '../../../entities/depot';
import {BuyGroup} from '../../../entities/buy-type';
import {CurrencyService} from '../../../entities/currency';
import {Metre, MetreService} from '../../../entities/metre';
import {OilTankService} from '../../../entities/oil-tank/oil-tank.service';
import {RefuelCenterService} from '../../../entities/refuel-center/refuel-center.service';
import {OilTank} from '../../../entities/oil-tank/oil-tank.model';
import {RefuelCenter} from '../../../entities/refuel-center/refuel-center.model';

@Component({
    selector: 'jhi-metre-sheet',
    templateUrl: './metre-sheet.component.html'
})
export class MetreSheetComponent implements OnInit, OnDestroy {

    currentAccount: any;
    metreSheet: MetreSheet[] = [];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    breadcrumbItems: any[];
    req: MetreSheetRequest = new MetreSheetRequest({});
    aggregates: any[] = [
        {field: 'amount', aggregate: 'sum'},
        {field: 'nextMetre', aggregate: 'max'},
        {field: 'agoMetre', aggregate: 'min'}
        ];
    state: State = {take: 10};
    gridData: any = process(this.metreSheet, this.state);
    total: any = aggregateBy(this.metreSheet, this.aggregates);

    refuelCenters: RefuelCenter[];
    refuelCenterId: number;
    oiltanks: OilTank[];
    type=1;
    metres: any = [];

    constructor(
        private metreSheetService: MetreSheetService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private translateService: TranslateService,
        private metreService: MetreService,
        private refuelCenterService: RefuelCenterService,
        private oilTankService: OilTankService,
        private eventManager: JhiEventManager
    ) {
    }

    loadAll() {
        this.metreSheetService.query(this.req).subscribe(
            (res: HttpResponse<MetreSheet[]>) => this.onSuccess(res.body),
            (res: HttpErrorResponse) => this.onError(res.error)
        );
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe((title) => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.metreSheet.home.title').subscribe((title) => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.setBreadCrumb();
        this.refuelCenterService.queryByNational(true)
            .subscribe((res) => {
                this.refuelCenters = res.body;
            }, (res) => this.onError(res.message));

        this.req.startDate = new Date();
        this.req.startDate.setHours(0);
        this.req.startDate.setMinutes(0);
        this.req.startDate.setSeconds(0);
        this.req.finishDate = new Date();
        this.req.finishDate.setHours(23);
        this.req.finishDate.setMinutes(59);
        this.req.finishDate.setSeconds(59);

    }

    onChangeRefuelCenter(data) {
        this.req.oilTankId = null;
        this.req.metre = null;
        this.metres = [];
        this.oiltanks = [];

        if (data) {
            this.oilTankService.queryByRefuelCenterByUnitPlatform(data)
                .subscribe((res) => {
                    this.oiltanks = res.body;
                }, (res) => this.onError(res.message));
        }
    }

    onChangeOilTank(data) {
        this.req.metre = null;
        this.metres = [];

        if (data) {
            this.metreService.query(data, null).subscribe(
                (res) => {
                    this.metres = res.body;
                }
            );
        }
    }

    ngOnDestroy() {
    }

    private onSuccess(data) {
        this.metreSheet = data;
        this.state = this.req.state;
        if (this.state && this.state.group) {
            this.state.group.map((group) => group.aggregates = this.aggregates);
        }
        this.gridData = process(this.metreSheet, this.state);
        this.total = aggregateBy(this.metreSheet, this.aggregates);
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    public dataStateChange(state: DataStateChangeEvent): void {
        this.req.state = state;
        this.loadAll();
    }
}
