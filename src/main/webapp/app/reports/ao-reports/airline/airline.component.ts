import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiEventManager, JhiParseLinks, JhiAlertService} from 'ng-jhipster';

import {TranslateService} from '@ngx-translate/core';
import {Airline, AirlineRequest} from './airline.model';
import {AirlineService} from './airline.service';
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
    selector: 'jhi-airline',
    templateUrl: './airline.component.html'
})
export class AirlineComponent implements OnInit, OnDestroy {

    currentAccount: any;
    airline: Airline[] = [];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    breadcrumbItems: any[];
    req: AirlineRequest = new AirlineRequest({});
    aggregates: any[] = [{field: 'amount', aggregate: 'sum'}];
    state: State = {take: 10};
    gridData: any = process(this.airline, this.state);

    refuelCenters: RefuelCenter[];
    refuelCenterId: number;
    persons: Person[];
    personId: number;
    customers: Customer[];
    customerId: number;

    constructor(
        private airlineService: AirlineService,
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
        this.airlineService.query(this.req).subscribe(
            (res: HttpResponse<Airline[]>) => this.onSuccess(res.body),
            (res: HttpErrorResponse) => this.onError(res.error)
        );
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe((title) => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('samtagatewayApp.airline.home.title').subscribe((title) => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.setBreadCrumb();
        this.req.state.take=10;
        this.req.state.group=[];
        this.req.state.sort=[];
        this.req.state.skip=0;
        this.loadAll();

    }

    ngOnDestroy() {
    }

    private onSuccess(data) {
        this.airline = data;
        this.state = this.req.state;
        if (this.state && this.state.group) {
            this.state.group.map((group) => group.aggregates = this.aggregates);
        }
        this.gridData = process(this.airline, this.state);
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    public dataStateChange(state: DataStateChangeEvent): void {
        this.req.state = state;
        this.loadAll();
    }
}
