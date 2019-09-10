import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OrderCost } from './order-cost.model';
import { OrderCostPopupService } from './order-cost-popup.service';
import { OrderCostService } from './order-cost.service';
import { Order, OrderService } from '../order';
import { OrderProduct, OrderProductService } from '../order-product';

@Component({
    selector: 'jhi-order-cost-dialog',
    templateUrl: './order-cost-dialog.component.html'
})
export class OrderCostDialogComponent implements OnInit {

    orderCost: OrderCost;
    isSaving: boolean;

    orders: Order[];

    orderproducts: OrderProduct[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private orderCostService: OrderCostService,
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
        if (this.orderCost.id !== undefined) {
            this.subscribeToSaveResponse(
                this.orderCostService.update(this.orderCost));
        } else {
            this.subscribeToSaveResponse(
                this.orderCostService.create(this.orderCost));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<OrderCost>>) {
        result.subscribe((res: HttpResponse<OrderCost>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: OrderCost) {
        this.eventManager.broadcast({ name: 'orderCostListModification', content: 'OK'});
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
    selector: 'jhi-order-cost-popup',
    template: ''
})
export class OrderCostPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private orderCostPopupService: OrderCostPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.orderCostPopupService
                    .open(OrderCostDialogComponent as Component, params['id']);
            } else {
                this.orderCostPopupService
                    .open(OrderCostDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
