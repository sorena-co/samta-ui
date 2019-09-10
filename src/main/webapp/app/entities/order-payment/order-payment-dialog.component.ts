import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OrderPayment } from './order-payment.model';
import { OrderPaymentPopupService } from './order-payment-popup.service';
import { OrderPaymentService } from './order-payment.service';
import { Order, OrderService } from '../order';

@Component({
    selector: 'jhi-order-payment-dialog',
    templateUrl: './order-payment-dialog.component.html'
})
export class OrderPaymentDialogComponent implements OnInit {

    orderPayment: OrderPayment;
    isSaving: boolean;

    orders: Order[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private orderPaymentService: OrderPaymentService,
        private orderService: OrderService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.orderService.query()
            .subscribe((res: HttpResponse<Order[]>) => { this.orders = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.orderPayment.id !== undefined) {
            this.subscribeToSaveResponse(
                this.orderPaymentService.update(this.orderPayment));
        } else {
            this.subscribeToSaveResponse(
                this.orderPaymentService.create(this.orderPayment));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<OrderPayment>>) {
        result.subscribe((res: HttpResponse<OrderPayment>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: OrderPayment) {
        this.eventManager.broadcast({ name: 'orderPaymentListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackOrderById(index: number, item: Order) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-order-payment-popup',
    template: ''
})
export class OrderPaymentPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private orderPaymentPopupService: OrderPaymentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.orderPaymentPopupService
                    .open(OrderPaymentDialogComponent as Component, params['id']);
            } else {
                this.orderPaymentPopupService
                    .open(OrderPaymentDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
