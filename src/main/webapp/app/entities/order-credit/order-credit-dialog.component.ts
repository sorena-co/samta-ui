import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OrderCredit } from './order-credit.model';
import { OrderCreditPopupService } from './order-credit-popup.service';
import { OrderCreditService } from './order-credit.service';
import { Order, OrderService } from '../order';
import { OrderProduct, OrderProductService } from '../order-product';

@Component({
    selector: 'jhi-order-credit-dialog',
    templateUrl: './order-credit-dialog.component.html'
})
export class OrderCreditDialogComponent implements OnInit {

    orderCredit: OrderCredit;
    isSaving: boolean;

    orders: Order[];

    orderproducts: OrderProduct[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private orderCreditService: OrderCreditService,
        private orderService: OrderService,
        private orderProductService: OrderProductService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.orderService.query()
            .subscribe((res: HttpResponse<Order[]>) => { this.orders = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.orderProductService.query()
            .subscribe((res: HttpResponse<OrderProduct[]>) => { this.orderproducts = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.orderCredit.id !== undefined) {
            this.subscribeToSaveResponse(
                this.orderCreditService.update(this.orderCredit));
        } else {
            this.subscribeToSaveResponse(
                this.orderCreditService.create(this.orderCredit));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<OrderCredit>>) {
        result.subscribe((res: HttpResponse<OrderCredit>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: OrderCredit) {
        this.eventManager.broadcast({ name: 'orderCreditListModification', content: 'OK'});
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

    trackOrderProductById(index: number, item: OrderProduct) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-order-credit-popup',
    template: ''
})
export class OrderCreditPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private orderCreditPopupService: OrderCreditPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.orderCreditPopupService
                    .open(OrderCreditDialogComponent as Component, params['id']);
            } else {
                this.orderCreditPopupService
                    .open(OrderCreditDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
