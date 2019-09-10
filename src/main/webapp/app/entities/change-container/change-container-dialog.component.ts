import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {ChangeContainer, ChangeContainerType} from './change-container.model';
import {ChangeContainerPopupService} from './change-container-popup.service';
import {ChangeContainerService} from './change-container.service';
import {OilTankContainer, OilTankContainerService} from '../oil-tank-container';
import {DayDepotContainer, DayDepotContainerService} from '../day-depot-container';
import {DayDepot, DayDepotService} from '../day-depot';

@Component({
    selector: 'jhi-change-container-dialog',
    templateUrl: './change-container-dialog.component.html'
})
export class ChangeContainerDialogComponent implements OnInit {
    dayDepotId: number;
    dayDepotContainerId: number;
    mainDayDepotId: number;
    mainDayOperationId: number;
    sources: DayDepotContainer[];
    targets: DayDepotContainer[];
    changeContainer: ChangeContainer;
    capacity: number;
    isSaving: boolean;
    isView: boolean;
    dayDepots: DayDepot[];
    ChangeContainerType = ChangeContainerType;
    dayDepot: DayDepot;
    dayDepotContainer: DayDepotContainer;

    daydepotcontainers: DayDepotContainer[];

    daydepots: DayDepot[];

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private changeContainerService: ChangeContainerService,
                private oilTankContainerService: OilTankContainerService,
                private dayDepotContainerService: DayDepotContainerService,
                private dayDepotService: DayDepotService,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.fillData();
    }

    fillData() {
        this.dayDepotId = UsefulId.dayDepotId;
        this.dayDepotContainerId = UsefulId.dayDepotContainerId;
        if (this.dayDepotId) {
            this.dayDepotService.find(this.dayDepotId).subscribe((dayDepot) => {
                this.dayDepot = dayDepot.body;
                this.changeContainer.dayDepotId = this.dayDepot.id;
                if (this.dayDepot.mainDayDepotId) {
                    this.mainDayDepotId = this.dayDepot.mainDayDepotId;
                    this.dayDepotService.queryMainDayDepotId(this.mainDayDepotId).subscribe((dayDepots) => {
                        this.dayDepots = dayDepots.body;
                    });
                } else {
                    this.mainDayOperationId = this.dayDepot.mainDayOperationId;
                    this.dayDepotService.queryMainDayOperationId(this.mainDayOperationId).subscribe((dayDepots) => {
                        this.dayDepots = dayDepots.body;
                    });
                }
                this.dayDepotContainerService.queryEmpty(this.dayDepot.id).subscribe((sources) => {
                    this.sources = sources.body;
                });
            });
        } else {
            this.dayDepotContainerService.find(this.dayDepotContainerId).subscribe((dayDepotContainer) => {
                this.dayDepotContainer = dayDepotContainer.body;
                this.mainDayDepotId = this.dayDepotContainer.mainDayDepotId;
                this.dayDepotContainerService.query(this.mainDayDepotId).subscribe((sources) => {
                    this.sources = sources.body;
                });
                this.changeContainer.sourceId = this.dayDepotContainer.id;
                this.onSourceChange(this.dayDepotContainer.id,true);
                this.dayDepotService.queryMainDayDepotId(this.mainDayDepotId).subscribe((dayDepots) => {
                    this.dayDepots = dayDepots.body;
                });
            });
        }
        if (this.changeContainer.id) {
            this.onSourceChange(this.changeContainer.sourceId, true);
        }
    }

    onSourceChange(dayDepotContainerId, keepTarget) {
        if (!this.changeContainer.id || !keepTarget) {
            this.targets = [];
            this.changeContainer.amount = 0;
            this.changeContainer.count = 0;
            this.changeContainer.targetId = null;
        }
        if (this.dayDepotId) {
            this.dayDepotContainerService.queryNotEmpty(this.dayDepotId, dayDepotContainerId).subscribe((targets) => {
                this.targets = targets.body;
            });
        } else if (this.dayDepotContainerId) {
            this.dayDepotContainerService.queryForTarget(this.dayDepotContainerId).subscribe((targets) => {
                this.targets = targets.body;
            });
        }
        this.dayDepotContainerService.find(dayDepotContainerId).subscribe((dayDepotContainer) => {
            this.capacity = dayDepotContainer.body.capacity;
            this.oilTankContainerService.find(dayDepotContainer.body.oilTankContainerId).subscribe((oilTankContainer) => {
                if (oilTankContainer.body.productId && !oilTankContainer.body.productUnitId) {
                    this.changeContainer.changeContainerType = this.ChangeContainerType[this.ChangeContainerType.WITHOUT_CONTAINER];
                } else {
                    this.changeContainer.changeContainerType = this.ChangeContainerType[this.ChangeContainerType.WITH_CONTAINER];
                }
            });
        });
    }

    onChangeCount(data) {
        this.changeContainer.amount = data * this.capacity;
    }

    clear() {
        this.activeModal.dismiss('cancel');
        UsefulId.dayDepotContainerId = null;
        UsefulId.dayDepotId = null;
    }

    save() {
        this.isSaving = true;
        if (this.changeContainer.id !== undefined) {
            /* if (this.dayDepotContainerId) {
                 this.subscribeToSaveResponse(
                     this.changeContainerService.updateByDayDepotContainer(this.changeContainer));
             }
             /!*else if (this.dayDepotId) {
                            this.changeContainer.dayDepotContainerId = null;
                            this.subscribeToSaveResponse(
                                this.changeContainerService.updateByDayDepot(this.changeContainer));
                        }*!/
         } else {
             if (this.dayDepotContainerId) {*/
            this.subscribeToSaveResponse(
                this.changeContainerService.updateByDayDepot(this.changeContainer));
        } else {
            this.subscribeToSaveResponse(
                this.changeContainerService.createByDayDepot(this.changeContainer));
        }
    }

    trackOilTankContainerById(index: number, item: OilTankContainer) {
        return item.id;
    }

    trackDayDepotContainerById(index: number, item: DayDepotContainer) {
        return item.id;
    }

    trackDayDepotById(index: number, item: DayDepot) {
        return item.id;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ChangeContainer>>) {
        result.subscribe((res: HttpResponse<ChangeContainer>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ChangeContainer) {
        this.eventManager.broadcast({name: 'changeContainerListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-change-container-popup',
    template: ''
})
export class ChangeContainerPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private changeContainerPopupService: ChangeContainerPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            View.isView = !!params['view'];

            if (params['dayDepotContainerId']) {
                UsefulId.dayDepotContainerId = params['dayDepotContainerId'];
                this.changeContainerPopupService
                    .open(ChangeContainerDialogComponent as Component, null, params['dayDepotContainerId']);
            } else if (params['dayDepotId']) {
                UsefulId.dayDepotId = params['dayDepotId'];
                this.changeContainerPopupService
                    .open(ChangeContainerDialogComponent as Component, null, null, params['dayDepotId']);
            }
            if (params['parent'] === 'day-depot') {
                UsefulId.dayDepotId = params['parent-id'];
                this.changeContainerPopupService
                    .open(ChangeContainerDialogComponent as Component, params['id'], null, params['parent-id']);
            } else if (params['parent'] === 'day-depot-container') {
                UsefulId.dayDepotContainerId = params['parent-id'];
                this.changeContainerPopupService
                    .open(ChangeContainerDialogComponent as Component, params['id'], params['parent-id']);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

class View {
    static isView: boolean;
}

class UsefulId {
    static dayDepotContainerId: number;
    static dayDepotId: number;
}
