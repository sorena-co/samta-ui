import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { VehicleModel } from './vehicle-model.model';
import { VehicleModelPopupService } from './vehicle-model-popup.service';
import { VehicleModelService } from './vehicle-model.service';

@Component({
    selector: 'jhi-vehicle-model-dialog',
    templateUrl: './vehicle-model-dialog.component.html'
})
export class VehicleModelDialogComponent implements OnInit {

    vehicleModel: VehicleModel;
    isSaving: boolean;
    isView: boolean;


    constructor(
        public activeModal: NgbActiveModal,
    private jhiAlertService: JhiAlertService,
        private vehicleModelService: VehicleModelService,
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
        if (this.vehicleModel.id !== undefined) {
            this.subscribeToSaveResponse(
                this.vehicleModelService.update(this.vehicleModel));
        } else {
            this.subscribeToSaveResponse(
                this.vehicleModelService.create(this.vehicleModel));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<VehicleModel>>) {
        result.subscribe((res: HttpResponse<VehicleModel>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: VehicleModel) {
        this.eventManager.broadcast({ name: 'vehicleModelListModification', content: 'OK'});
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
    selector: 'jhi-vehicle-model-popup',
    template: ''
})
export class VehicleModelPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private vehicleModelPopupService: VehicleModelPopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            View.isView = !!params['view'];

            if ( params['id'] ) {
                this.vehicleModelPopupService
                    .open(VehicleModelDialogComponent as Component, params['id']);
            } else {
                this.vehicleModelPopupService
                    .open(VehicleModelDialogComponent as Component);
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
