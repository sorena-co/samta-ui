import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BankTransaction } from './bank-transaction.model';
import { BankTransactionPopupService } from './bank-transaction-popup.service';
import { BankTransactionService } from './bank-transaction.service';

@Component({
    selector: 'jhi-bank-transaction-delete-dialog',
    templateUrl: './bank-transaction-delete-dialog.component.html'
})
export class BankTransactionDeleteDialogComponent {

    bankTransaction: BankTransaction;

    constructor(
        private bankTransactionService: BankTransactionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.bankTransactionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'bankTransactionListModification',
                content: 'Deleted an bankTransaction'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-bank-transaction-delete-popup',
    template: ''
})
export class BankTransactionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bankTransactionPopupService: BankTransactionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.bankTransactionPopupService
                .open(BankTransactionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
