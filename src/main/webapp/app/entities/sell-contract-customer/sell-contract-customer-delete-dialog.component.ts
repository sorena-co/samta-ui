import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SellContractCustomer } from './sell-contract-customer.model';
import { SellContractCustomerPopupService } from './sell-contract-customer-popup.service';
import { SellContractCustomerService } from './sell-contract-customer.service';

@Component({
    selector: 'jhi-sell-contract-customer-delete-dialog',
    templateUrl: './sell-contract-customer-delete-dialog.component.html'
})
export class SellContractCustomerDeleteDialogComponent {

    sellContractCustomer: SellContractCustomer;

    constructor(
        private sellContractCustomerService: SellContractCustomerService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.sellContractCustomerService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'sellContractCustomerListModification',
                content: 'Deleted an sellContractCustomer'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sell-contract-customer-delete-popup',
    template: ''
})
export class SellContractCustomerDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sellContractCustomerPopupService: SellContractCustomerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.sellContractCustomerPopupService
                .open(SellContractCustomerDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
