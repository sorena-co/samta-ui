import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CarType } from './car-type.model';
import { CarTypePopupService } from './car-type-popup.service';
import { CarTypeService } from './car-type.service';

@Component({
    selector: 'jhi-car-type-dialog',
    templateUrl: './car-type-dialog.component.html'
})
export class CarTypeDialogComponent implements OnInit {

    carType: CarType;
    isSaving: boolean;
    isView: boolean;


    constructor(
        public activeModal: NgbActiveModal,
    private jhiAlertService: JhiAlertService,
        private carTypeService: CarTypeService,
    private eventManager: JhiEventManager
) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.carType.id !== undefined) {
            this.subscribeToSaveResponse(
                this.carTypeService.update(this.carType));
        } else {
            this.subscribeToSaveResponse(
                this.carTypeService.create(this.carType));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CarType>>) {
        result.subscribe((res: HttpResponse<CarType>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CarType) {
        this.eventManager.broadcast({ name: 'carTypeListModification', content: 'OK'});
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
    selector: 'jhi-car-type-popup',
    template: ''
})
export class CarTypePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private carTypePopupService: CarTypePopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            View.isView = !!params['view'];

            if ( params['id'] ) {
                this.carTypePopupService
                    .open(CarTypeDialogComponent as Component, params['id']);
            } else {
                this.carTypePopupService
                    .open(CarTypeDialogComponent as Component);
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
