import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OrderProduct } from './order-product.model';
import { OrderProductPopupService } from './order-product-popup.service';
import { OrderProductService } from './order-product.service';

@Component({
    selector: 'jhi-order-product-delete-dialog',
    templateUrl: './order-product-delete-dialog.component.html'
})
export class OrderProductDeleteDialogComponent {

    orderProduct: OrderProduct;

    constructor(
        private orderProductService: OrderProductService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.orderProductService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'orderProductListModification',
                content: 'Deleted an orderProduct'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-order-product-delete-popup',
    template: ''
})
export class OrderProductDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private orderProductPopupService: OrderProductPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.orderProductPopupService
                .open(OrderProductDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
