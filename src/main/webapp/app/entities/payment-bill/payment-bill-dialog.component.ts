import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PaymentBill } from './payment-bill.model';
import { PaymentBillPopupService } from './payment-bill-popup.service';
import { PaymentBillService } from './payment-bill.service';
import { Payment, PaymentService } from '../payment';

@Component({
    selector: 'jhi-payment-bill-dialog',
    templateUrl: './payment-bill-dialog.component.html'
})
export class PaymentBillDialogComponent implements OnInit {

    paymentBill: PaymentBill;
    isSaving: boolean;

    payments: Payment[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private paymentBillService: PaymentBillService,
        private paymentService: PaymentService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        /*this.paymentService.query()
            .subscribe((res: HttpResponse<Payment[]>) => { this.payments = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));*/
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.paymentBill.id !== undefined) {
            this.subscribeToSaveResponse(
                this.paymentBillService.update(this.paymentBill));
        } else {
            this.subscribeToSaveResponse(
                this.paymentBillService.create(this.paymentBill));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PaymentBill>>) {
        result.subscribe((res: HttpResponse<PaymentBill>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PaymentBill) {
        this.eventManager.broadcast({ name: 'paymentBillListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPaymentById(index: number, item: Payment) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-payment-bill-popup',
    template: ''
})
export class PaymentBillPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private paymentBillPopupService: PaymentBillPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.paymentBillPopupService
                    .open(PaymentBillDialogComponent as Component, params['id']);
            } else {
                this.paymentBillPopupService
                    .open(PaymentBillDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
