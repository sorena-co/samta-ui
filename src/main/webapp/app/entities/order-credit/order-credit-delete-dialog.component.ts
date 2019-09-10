import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OrderCredit } from './order-credit.model';
import { OrderCreditPopupService } from './order-credit-popup.service';
import { OrderCreditService } from './order-credit.service';

@Component({
    selector: 'jhi-order-credit-delete-dialog',
    templateUrl: './order-credit-delete-dialog.component.html'
})
export class OrderCreditDeleteDialogComponent {

    orderCredit: OrderCredit;

    constructor(
        private orderCreditService: OrderCreditService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.orderCreditService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'orderCreditListModification',
                content: 'Deleted an orderCredit'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-order-credit-delete-popup',
    template: ''
})
export class OrderCreditDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private orderCreditPopupService: OrderCreditPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.orderCreditPopupService
                .open(OrderCreditDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
