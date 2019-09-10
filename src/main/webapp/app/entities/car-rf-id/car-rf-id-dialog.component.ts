import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {CarRfId} from './car-rf-id.model';
import {CarRfIdPopupService} from './car-rf-id-popup.service';
import {CarRfIdService} from './car-rf-id.service';
import {Customer, CustomerService} from '../customer';
import {TagRate, TagRateService} from '../tag-rate';

@Component({
    selector: 'jhi-car-rf-id-dialog',
    templateUrl: './car-rf-id-dialog.component.html'
})
export class CarRfIdDialogComponent implements OnInit {

    carRfId: CarRfId;
    isSaving: boolean;
    isView: boolean;
    tagRate: TagRate;
    tagRates: TagRate[];
    customerId: number;
    countRfId: number;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private carRfIdService: CarRfIdService,
        private customerService: CustomerService,
        private tagRateService: TagRateService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.customerId = UsefulId.customerId;
        this.isView = View.isView;
        this.isSaving = false;
        if (!this.carRfId.id || (this.carRfId.id && !this.carRfId.tagRateId)) {
            this.carRfIdService.countByCustomerId(this.carRfId.customerId)
                .subscribe((value) => {
                    this.countRfId = value.body;
                    if (this.countRfId === 0) {
                        this.carRfId.tagRateId = null;
                    } else {
                        this.tagRateService.queryByLocationAccess().subscribe(
                            (res) => {
                                this.tagRates = res.body;
                                if (this.tagRates.length === 1) {
                                    this.carRfId.tagRateId = this.tagRates[0].id;
                                }
                            },
                            (res) => this.onError(res.message)
                        );
                    }
                });
        }

    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.carRfId.id !== undefined) {
            this.subscribeToSaveResponse(
                this.carRfIdService.update(this.carRfId));
        } else {
            this.subscribeToSaveResponse(
                this.carRfIdService.create(this.carRfId));
        }
    }

    trackCustomerById(index: number, item: Customer) {
        return item.id;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CarRfId>>) {
        result.subscribe((res: HttpResponse<CarRfId>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CarRfId) {
        this.eventManager.broadcast({name: 'carRfIdListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTagRateById(index: number, item: TagRate) {
        return item.id;
    }

    onChangeTagRate(data) {
        // if (data) {
        this.tagRate = this.tagRates.find((value) => value.id === data);
        this.carRfId.price = this.tagRate.sellPrice;
        // }
    }
}

@Component({
    selector: 'jhi-car-rf-id-popup',
    template: ''
})
export class CarRfIdPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private carRfIdPopupService: CarRfIdPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.carRfIdPopupService
                    .open(CarRfIdDialogComponent as Component, params['id']);
            } else if (params['customerId']) {
                UsefulId.customerId = params['customerId'];
                this.carRfIdPopupService
                    .open(CarRfIdDialogComponent as Component, null, params['customerId']);
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

class UsefulId {
    static customerId: number;
}
