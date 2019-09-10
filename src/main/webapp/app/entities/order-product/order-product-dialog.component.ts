import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OrderProduct } from './order-product.model';
import { OrderProductPopupService } from './order-product-popup.service';
import { OrderProductService } from './order-product.service';
import { Order, OrderService } from '../order';

@Component({
    selector: 'jhi-order-product-dialog',
    templateUrl: './order-product-dialog.component.html'
})
export class OrderProductDialogComponent implements OnInit {

    orderProduct: OrderProduct;
    isSaving: boolean;

    orders: Order[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private orderProductService: OrderProductService,
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
        if (this.orderProduct.id !== undefined) {
            this.subscribeToSaveResponse(
                this.orderProductService.update(this.orderProduct));
        } else {
            this.subscribeToSaveResponse(
                this.orderProductService.create(this.orderProduct));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<OrderProduct>>) {
        result.subscribe((res: HttpResponse<OrderProduct>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: OrderProduct) {
        this.eventManager.broadcast({ name: 'orderProductListModification', content: 'OK'});
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
    selector: 'jhi-order-product-popup',
    template: ''
})
export class OrderProductPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private orderProductPopupService: OrderProductPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.orderProductPopupService
                    .open(OrderProductDialogComponent as Component, params['id']);
            } else {
                this.orderProductPopupService
                    .open(OrderProductDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
