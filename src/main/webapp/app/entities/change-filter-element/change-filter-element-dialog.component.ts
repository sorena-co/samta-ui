import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ChangeFilterElement } from './change-filter-element.model';
import { ChangeFilterElementPopupService } from './change-filter-element-popup.service';
import { ChangeFilterElementService } from './change-filter-element.service';
import { RequestFilterElement, RequestFilterElementService } from '../request-filter-element';
import { Manufacture, ManufactureService } from '../manufacture';
import { OilTank, OilTankService } from '../oil-tank';
import { RefuelCenter, RefuelCenterService } from '../refuel-center';

@Component({
    selector: 'jhi-change-filter-element-dialog',
    templateUrl: './change-filter-element-dialog.component.html'
})
export class ChangeFilterElementDialogComponent implements OnInit {

    changeFilterElement: ChangeFilterElement;
    isSaving: boolean;
    isView: boolean;

    requestfilterelements: RequestFilterElement[];

    manufactures: Manufacture[];

    oiltanks: OilTank[];

    refuelCenters: RefuelCenter[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private changeFilterElementService: ChangeFilterElementService,
        private requestFilterElementService: RequestFilterElementService,
        private manufactureService: ManufactureService,
        private oilTankService: OilTankService,
        private refuelCenterService: RefuelCenterService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.requestFilterElementService
            .query({filter: 'changefilterelement-is-null'})
            .subscribe((res: HttpResponse<RequestFilterElement[]>) => {
                if (!this.changeFilterElement.requestFilterElementId) {
                    this.requestfilterelements = res.body;
                } else {
                    this.requestFilterElementService
                        .find(this.changeFilterElement.requestFilterElementId)
                        .subscribe((subRes: HttpResponse<RequestFilterElement>) => {
                            this.requestfilterelements = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.manufactureService.query()
            .subscribe((res: HttpResponse<Manufacture[]>) => { this.manufactures = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.oilTankService.query()
            .subscribe((res: HttpResponse<OilTank[]>) => { this.oiltanks = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.refuelCenterService.query()
            .subscribe((res: HttpResponse<RefuelCenter[]>) => { this.refuelCenters = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.changeFilterElement.id !== undefined) {
            this.subscribeToSaveResponse(
                this.changeFilterElementService.update(this.changeFilterElement));
        } else {
            this.subscribeToSaveResponse(
                this.changeFilterElementService.create(this.changeFilterElement));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ChangeFilterElement>>) {
        result.subscribe((res: HttpResponse<ChangeFilterElement>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ChangeFilterElement) {
        this.eventManager.broadcast({ name: 'changeFilterElementListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackRequestFilterElementById(index: number, item: RequestFilterElement) {
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
}

@Component({
    selector: 'jhi-change-filter-element-popup',
    template: ''
})
export class ChangeFilterElementPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private changeFilterElementPopupService: ChangeFilterElementPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            View.isView = !!params['view'];

            if ( params['id'] ) {
                this.changeFilterElementPopupService
                    .open(ChangeFilterElementDialogComponent as Component, params['id']);
            } else if (params['requestFilterElementId'])  {
                this.changeFilterElementPopupService
                    .open(ChangeFilterElementDialogComponent as Component, null, params['requestFilterElementId']);
            } else { console.log('not be'); }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
class View {
    static isView: boolean;
}
