import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OrderPayment } from './order-payment.model';
import { OrderPaymentPopupService } from './order-payment-popup.service';
import { OrderPaymentService } from './order-payment.service';

@Component({
    selector: 'jhi-order-payment-delete-dialog',
    templateUrl: './order-payment-delete-dialog.component.html'
})
export class OrderPaymentDeleteDialogComponent {

    orderPayment: OrderPayment;

    constructor(
        private orderPaymentService: OrderPaymentService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.orderPaymentService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'orderPaymentListModification',
                content: 'Deleted an orderPayment'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-order-payment-delete-popup',
    template: ''
})
export class OrderPaymentDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private orderPaymentPopupService: OrderPaymentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.orderPaymentPopupService
                .open(OrderPaymentDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
