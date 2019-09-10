import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { OrderProduct } from './order-product.model';
import { OrderProductService } from './order-product.service';

@Component({
    selector: 'jhi-order-product-detail',
    templateUrl: './order-product-detail.component.html'
})
export class OrderProductDetailComponent implements OnInit, OnDestroy {

    orderProduct: OrderProduct;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private orderProductService: OrderProductService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInOrderProducts();
    }

    load(id) {
        this.orderProductService.find(id).subscribe((orderProduct) => {
            this.orderProduct = orderProduct.body;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOrderProducts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'orderProductListModification',
            (response) => this.load(this.orderProduct.id)
        );
    }
}
