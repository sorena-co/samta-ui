import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import { CarTypeLimit } from './car-type-limit.model';
import { CarTypeLimitPopupService } from './car-type-limit-popup.service';
import { CarTypeLimitService } from './car-type-limit.service';
import { CustomerType, CustomerTypeService } from '../customer-type';
import { Location, LocationService } from '../location';

@Component({
    selector: 'jhi-car-type-limit-dialog',
    templateUrl: './car-type-limit-dialog.component.html'
})
export class CarTypeLimitDialogComponent implements OnInit {

    carTypeLimit: CarTypeLimit;
    isSaving: boolean;
    isView: boolean;


    customertypes: CustomerType[];

    locations: Location[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private carTypeLimitService: CarTypeLimitService,
        private customerTypeService: CustomerTypeService,
        private locationService: LocationService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.customerTypeService.query()
            .subscribe((res: HttpResponse<CustomerType[]>) => { this.customertypes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.locationService.query()
            .subscribe((res: HttpResponse<Location[]>) => { this.locations = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.carTypeLimit.id !== undefined) {
            this.subscribeToSaveResponse(
                this.carTypeLimitService.update(this.carTypeLimit));
        } else {
            this.subscribeToSaveResponse(
                this.carTypeLimitService.create(this.carTypeLimit));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CarTypeLimit>>) {
        result.subscribe((res: HttpResponse<CarTypeLimit>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CarTypeLimit) {
        this.eventManager.broadcast({ name: 'carTypeLimitListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCustomerTypeById(index: number, item: CustomerType) {
        return item.id;
    }

    trackLocationById(index: number, item: Location) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-car-type-limit-popup',
    template: ''
})
export class CarTypeLimitPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private carTypeLimitPopupService: CarTypeLimitPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.carTypeLimitPopupService
                    .open(CarTypeLimitDialogComponent as Component, params['id']);
            } else if (params['customerTypeId']) {
                this.carTypeLimitPopupService
                    .open(CarTypeLimitDialogComponent as Component, null, params['customerTypeId']);
            } else {
                console.log('not be');
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
