import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiEventManager, JhiParseLinks, JhiAlertService} from 'ng-jhipster';

import {TranslateService} from '@ngx-translate/core';
import {AircraftRefuelingRecord, AircraftRefuelingRecordRequest} from './aircraft-refueling-record.model';
import {AircraftRefuelingRecordService} from './aircraft-refueling-record.service';
import {DataStateChangeEvent} from '@progress/kendo-angular-grid';
import {process, State} from '@progress/kendo-data-query';
import {MetreService} from '../../../entities/metre';
import {OilTankService} from '../../../entities/oil-tank/oil-tank.service';
import {RefuelCenterService} from '../../../entities/refuel-center/refuel-center.service';
import {OilTank} from '../../../entities/oil-tank/oil-tank.model';
import {RefuelCenter} from '../../../entities/refuel-center/refuel-center.model';
import {Person, PersonService} from "../../../entities/person";
import {Customer, CustomerService} from "../../../entities/customer";

@Component({
    selector: 'jhi-aircraft-refueling-record',
    templateUrl: './aircraft-refueling-record.component.html'
})
export class AircraftRefuelingRecordComponent implements OnInit, OnDestroy {

    currentAccount: any;
    aircraftRefuelingRecord: AircraftRefuelingRecord[] = [];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    breadcrumbItems: any[];
    req: AircraftRefuelingRecordRequest = new AircraftRefuelingRecordRequest({});
    aggregates: any[] = [{field: 'amount', aggregate: 'sum'}];
    state: State = {take: 10};
    gridData: any = process(this.aircraftRefuelingRecord, this.state);

    refuelCenters: RefuelCenter[];
    refuelCenterId: number;
    persons: Person[];
    personId: number;
    customers: Customer[];
    customerId: number;

    constructor(
        private aircraftRefuelingRecordService: AircraftRefuelingRecordService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private translateService: TranslateService,
        private refuelCenterService: RefuelCenterService,
        private personService: PersonService,
        private customerService: CustomerService,
    ) {
    }

    loadAll() {
        this.aircraftRefuelingRecordService.query(this.req).subscribe(
            (res: HttpResponse<AircraftRefuelingRecord[]>) => this.onSuccess(res.body),
            (res: HttpErrorResponse) => this.onError(res.error)
        );
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe((title) => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.aircraftRefuelingRecord.home.title').subscribe((title) => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.setBreadCrumb();
        this.refuelCenterService.queryByNational(true)
            .subscribe((res) => {
                this.refuelCenters = res.body;
            }, (res) => this.onError(res.message));

        this.personService.query()
            .subscribe((res) => {
                this.persons = res.body;
            }, (res) => this.onError(res.message));
        this.customerService.query()
            .subscribe((res) => {
                this.customers = res.body;
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

    ngOnDestroy() {
    }

    private onSuccess(data) {
        this.aircraftRefuelingRecord = data;
        this.state = this.req.state;
        if (this.state && this.state.group) {
            this.state.group.map((group) => group.aggregates = this.aggregates);
        }
        this.gridData = process(this.aircraftRefuelingRecord, this.state);
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    public dataStateChange(state: DataStateChangeEvent): void {
        this.req.state = state;
        this.loadAll();
    }
}
