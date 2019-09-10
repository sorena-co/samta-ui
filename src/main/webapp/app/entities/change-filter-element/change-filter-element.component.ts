import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {ChangeFilterElement} from './change-filter-element.model';
import {ChangeFilterElementService} from './change-filter-element.service';
import {Principal} from '../../shared';
import {RequestFilterElement, RequestFilterElementService} from '../request-filter-element/.';
import {Manufacture, ManufactureService} from '../manufacture/.';
import {OilTank, OilTankService} from '../oil-tank/.';
import {RefuelCenter, RefuelCenterService} from '../refuel-center/.';
import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'jhi-change-filter-element',
    templateUrl: './change-filter-element.component.html'
})
export class ChangeFilterElementComponent implements OnInit, OnDestroy {

    currentAccount: any;
    changeFilterElements: ChangeFilterElement[];
    changeFilterElement: ChangeFilterElement = new ChangeFilterElement();
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
    requestFilterElementId: number;
    requestFilterElement: RequestFilterElement;
    breadcrumbItems: any[];

    manufactures: Manufacture[];
    oiltanks: OilTank[];
    refuelCenters: RefuelCenter[];

    constructor(
        private changeFilterElementService: ChangeFilterElementService,
        private manufactureService: ManufactureService,
        private oilTankService: OilTankService,
        private refuelCenterService: RefuelCenterService,
        private requestFilterElementService: RequestFilterElementService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private translateService: TranslateService,
        private eventManager: JhiEventManager
    ) {
        this.routeData = this.activatedRoute.data.subscribe((data) => {
            this.itemsPerPage = data.pagingParams.size;
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = !data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
        this.currentSearch = activatedRoute.snapshot.queryParams['search'] ? activatedRoute.snapshot.queryParams['search'] : '';
        this.requestFilterElementId = activatedRoute.snapshot.params['requestFilterElementId'];
        this.changeFilterElement.conditionOfCartridges = null;
        this.changeFilterElement.conditionOfSeals = null;
        this.changeFilterElement.conditionOfCoating = null;
        this.changeFilterElement.pdGauge = null;
        this.changeFilterElement.airEliminator = null;
        this.changeFilterElement.reliefValue = null;
        this.changeFilterElement.sampleDrainValue = null;
        this.changeFilterElement.namePlate = null;
        this.changeFilterElement.isSend = null;

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
                    this.changeFilterElement[value[0]] = Number(value[1]);
                } else if (value[0] === 'conditionOfCartridges') {
                    this.changeFilterElement[value[0]] = Boolean(value[1]);
                } else if (value[0] === 'conditionOfSeals') {
                    this.changeFilterElement[value[0]] = Boolean(value[1]);
                } else if (value[0] === 'conditionOfCoating') {
                    this.changeFilterElement[value[0]] = Boolean(value[1]);
                } else if (value[0] === 'pdGauge') {
                    this.changeFilterElement[value[0]] = Boolean(value[1]);
                } else if (value[0] === 'airEliminator') {
                    this.changeFilterElement[value[0]] = Boolean(value[1]);
                } else if (value[0] === 'reliefValue') {
                    this.changeFilterElement[value[0]] = Boolean(value[1]);
                } else if (value[0] === 'sampleDrainValue') {
                    this.changeFilterElement[value[0]] = Boolean(value[1]);
                } else if (value[0] === 'namePlate') {
                    this.changeFilterElement[value[0]] = Boolean(value[1]);
                } else if (value[0] === 'isSend') {
                    this.changeFilterElement[value[0]] = Boolean(value[1]);
                } else {
                    this.changeFilterElement[value[0]] = value[1];
                }
            }
        }
    }

    loadAll() {
        this.changeFilterElementService.query(this.requestFilterElementId, {
            query: this.currentSearch.length > 0 ? this.currentSearch : null,
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<ChangeFilterElement[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';

        this.router.navigate(['request-filter-element/' + this.requestFilterElementId + '/change-filter-element'], {
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.changeFilterElement = new ChangeFilterElement();
        this.changeFilterElement.isSend = null;
        this.changeFilterElement.airEliminator = null;
        this.changeFilterElement.conditionOfCartridges = null;
        this.changeFilterElement.conditionOfCoating = null;
        this.changeFilterElement.conditionOfSeals = null;
        this.changeFilterElement.namePlate = null;
        this.changeFilterElement.pdGauge = null;
        this.changeFilterElement.reliefValue = null;
        this.changeFilterElement.sampleDrainValue = null;
        this.loadAll();
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.changeFilterElement.model) {
            this.currentSearch += 'model$' + this.changeFilterElement.model + '&';
        }
        if (this.changeFilterElement.capacity) {
            this.currentSearch += 'capacity☼' + this.changeFilterElement.capacity + '&';
        }
        if (this.changeFilterElement.operatingFlow) {
            this.currentSearch += 'operatingFlow☼' + this.changeFilterElement.operatingFlow + '&';
        }
        if (this.changeFilterElement.pdMax) {
            this.currentSearch += 'pdMax☼' + this.changeFilterElement.pdMax + '&';
        }
        if (this.changeFilterElement.microFilter) {
            this.currentSearch += 'microFilter$' + this.changeFilterElement.microFilter + '&';
        }
        if (this.changeFilterElement.microFilterCount) {
            this.currentSearch += 'microFilterCount☼' + this.changeFilterElement.microFilterCount + '&';
        }
        if (this.changeFilterElement.coalescer) {
            this.currentSearch += 'coalescer$' + this.changeFilterElement.coalescer + '&';
        }
        if (this.changeFilterElement.coalescerCount) {
            this.currentSearch += 'coalescerCount☼' + this.changeFilterElement.coalescerCount + '&';
        }
        if (this.changeFilterElement.separator) {
            this.currentSearch += 'separator$' + this.changeFilterElement.separator + '&';
        }
        if (this.changeFilterElement.separatorCount) {
            this.currentSearch += 'separatorCount☼' + this.changeFilterElement.separatorCount + '&';
        }
        if (this.changeFilterElement.monitor) {
            this.currentSearch += 'monitor$' + this.changeFilterElement.monitor + '&';
        }
        if (this.changeFilterElement.monitorCount) {
            this.currentSearch += 'monitorCount☼' + this.changeFilterElement.monitorCount + '&';
        }
        if (this.changeFilterElement.lastChangeDate) {
            this.currentSearch += 'lastChangeDate→' + this.changeFilterElement.lastChangeDate.toISOString() + '&';
        }
        if (this.changeFilterElement.reasonOfChange) {
            this.currentSearch += 'reasonOfChange$' + this.changeFilterElement.reasonOfChange + '&';
        }
        if (this.changeFilterElement.conditionOfCartridges) {
            this.currentSearch += 'conditionOfCartridges;' + this.changeFilterElement.conditionOfCartridges + '&';
        }
        if (this.changeFilterElement.conditionOfSeals) {
            this.currentSearch += 'conditionOfSeals;' + this.changeFilterElement.conditionOfSeals + '&';
        }
        if (this.changeFilterElement.conditionOfCoating) {
            this.currentSearch += 'conditionOfCoating;' + this.changeFilterElement.conditionOfCoating + '&';
        }
        if (this.changeFilterElement.pdGauge) {
            this.currentSearch += 'pdGauge;' + this.changeFilterElement.pdGauge + '&';
        }
        if (this.changeFilterElement.airEliminator) {
            this.currentSearch += 'airEliminator;' + this.changeFilterElement.airEliminator + '&';
        }
        if (this.changeFilterElement.reliefValue) {
            this.currentSearch += 'reliefValue;' + this.changeFilterElement.reliefValue + '&';
        }
        if (this.changeFilterElement.sampleDrainValue) {
            this.currentSearch += 'sampleDrainValue;' + this.changeFilterElement.sampleDrainValue + '&';
        }
        if (this.changeFilterElement.namePlate) {
            this.currentSearch += 'namePlate;' + this.changeFilterElement.namePlate + '&';
        }
        if (this.changeFilterElement.microFilterType) {
            this.currentSearch += 'microFilterType$' + this.changeFilterElement.microFilterType + '&';
        }
        if (this.changeFilterElement.microFilterTypeCount) {
            this.currentSearch += 'microFilterTypeCount☼' + this.changeFilterElement.microFilterTypeCount + '&';
        }
        if (this.changeFilterElement.coalescerType) {
            this.currentSearch += 'coalescerType$' + this.changeFilterElement.coalescerType + '&';
        }
        if (this.changeFilterElement.coalescerTypeCount) {
            this.currentSearch += 'coalescerTypeCount☼' + this.changeFilterElement.coalescerTypeCount + '&';
        }
        if (this.changeFilterElement.separatorType) {
            this.currentSearch += 'separatorType$' + this.changeFilterElement.separatorType + '&';
        }
        if (this.changeFilterElement.separatorTypeCount) {
            this.currentSearch += 'separatorTypeCount☼' + this.changeFilterElement.separatorTypeCount + '&';
        }
        if (this.changeFilterElement.monitorType) {
            this.currentSearch += 'monitorType$' + this.changeFilterElement.monitorType + '&';
        }
        if (this.changeFilterElement.monitorTypeCount) {
            this.currentSearch += 'monitorTypeCount☼' + this.changeFilterElement.monitorTypeCount + '&';
        }
        if (this.changeFilterElement.microFilterTorque) {
            this.currentSearch += 'microFilterTorque$' + this.changeFilterElement.microFilterTorque + '&';
        }
        if (this.changeFilterElement.microFilterTorqueCount) {
            this.currentSearch += 'microFilterTorqueCount☼' + this.changeFilterElement.microFilterTorqueCount + '&';
        }
        if (this.changeFilterElement.coalescerTorque) {
            this.currentSearch += 'coalescerTorque$' + this.changeFilterElement.coalescerTorque + '&';
        }
        if (this.changeFilterElement.coalescerTorqueCount) {
            this.currentSearch += 'coalescerTorqueCount☼' + this.changeFilterElement.coalescerTorqueCount + '&';
        }
        if (this.changeFilterElement.separatorTorque) {
            this.currentSearch += 'separatorTorque$' + this.changeFilterElement.separatorTorque + '&';
        }
        if (this.changeFilterElement.separatorTorqueCount) {
            this.currentSearch += 'separatorTorqueCount☼' + this.changeFilterElement.separatorTorqueCount + '&';
        }
        if (this.changeFilterElement.monitorTorque) {
            this.currentSearch += 'monitorTorque$' + this.changeFilterElement.monitorTorque + '&';
        }
        if (this.changeFilterElement.monitorTorqueCount) {
            this.currentSearch += 'monitorTorqueCount☼' + this.changeFilterElement.monitorTorqueCount + '&';
        }
        if (this.changeFilterElement.pdReading) {
            this.currentSearch += 'pdReading☼' + this.changeFilterElement.pdReading + '&';
        }
        if (this.changeFilterElement.flowTest) {
            this.currentSearch += 'flowTest☼' + this.changeFilterElement.flowTest + '&';
        }
        if (this.changeFilterElement.installedBy) {
            this.currentSearch += 'installedBy$' + this.changeFilterElement.installedBy + '&';
        }
        if (this.changeFilterElement.supervisedBy) {
            this.currentSearch += 'supervisedBy$' + this.changeFilterElement.supervisedBy + '&';
        }
        if (this.changeFilterElement.isSend) {
            this.currentSearch += 'isSend;' + this.changeFilterElement.isSend + '&';
        }
        if (this.changeFilterElement.manufactureId) {
            this.currentSearch += 'manufacture.id☼' + this.changeFilterElement.manufactureId + '&';
        }
        if (this.changeFilterElement.oilTankId) {
            this.currentSearch += 'oilTank.id☼' + this.changeFilterElement.oilTankId + '&';
        }
        if (this.changeFilterElement.refuelCenterId) {
            this.currentSearch += 'refuelCenter.id☼' + this.changeFilterElement.refuelCenterId + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        this.router.navigate(['request-filter-element/' + this.requestFilterElementId + '/change-filter-element'], {
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
        this.translateService.get('samtagatewayApp.changeFilterElement.home.requestFilterElementTitle').subscribe((title) => {
            this.breadcrumbItems.push({
                label: title + ` (${this.requestFilterElement.id})`,
                routerLink: ['/request-filter-element']
            });
        });
        this.translateService.get('samtagatewayApp.changeFilterElement.home.title').subscribe((title) => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });

        this.manufactureService.query().subscribe(
            (res: HttpResponse<Manufacture[]>) => {
                this.manufactures = res.body;
            }
        );
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

        this.registerChangeInChangeFilterElements();

        this.requestFilterElementService.find(this.requestFilterElementId).subscribe(
            (requestFilterElement: HttpResponse<RequestFilterElement>) => {
                this.requestFilterElement = requestFilterElement.body;
                this.setBreadCrumb();
            }
        );
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ChangeFilterElement) {
        return item.id;
    }

    trackManufactureById(index: number, item: Manufacture) {
        return item.id;
    }

    trackOilTankById(index: number, item: OilTank) {
        return item.id;
    }

    trackRefuelCenterById(index: number, item: RefuelCenter) {
        return item.id;
    }

    registerChangeInChangeFilterElements() {
        this.eventSubscriber = this.eventManager.subscribe('changeFilterElementListModification', (response) => this.loadAll());
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

            this.router.navigate(['request-filter-element', this.requestFilterElementId, 'change-filter-element'], {
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
        this.changeFilterElements = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
