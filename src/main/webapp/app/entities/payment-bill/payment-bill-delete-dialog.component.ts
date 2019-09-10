import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PaymentBill } from './payment-bill.model';
import { PaymentBillPopupService } from './payment-bill-popup.service';
import { PaymentBillService } from './payment-bill.service';

@Component({
    selector: 'jhi-payment-bill-delete-dialog',
    templateUrl: './payment-bill-delete-dialog.component.html'
})
export class PaymentBillDeleteDialogComponent {

    paymentBill: PaymentBill;

    constructor(
        private paymentBillService: PaymentBillService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.paymentBillService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'paymentBillListModification',
                content: 'Deleted an paymentBill'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-payment-bill-delete-popup',
    template: ''
})
export class PaymentBillDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private paymentBillPopupService: PaymentBillPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.paymentBillPopupService
                .open(PaymentBillDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
