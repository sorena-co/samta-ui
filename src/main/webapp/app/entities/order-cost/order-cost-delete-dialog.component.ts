import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OrderCost } from './order-cost.model';
import { OrderCostPopupService } from './order-cost-popup.service';
import { OrderCostService } from './order-cost.service';

@Component({
    selector: 'jhi-order-cost-delete-dialog',
    templateUrl: './order-cost-delete-dialog.component.html'
})
export class OrderCostDeleteDialogComponent {

    orderCost: OrderCost;

    constructor(
        private orderCostService: OrderCostService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.orderCostService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'orderCostListModification',
                content: 'Deleted an orderCost'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-order-cost-delete-popup',
    template: ''
})
export class OrderCostDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private orderCostPopupService: OrderCostPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.orderCostPopupService
                .open(OrderCostDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
