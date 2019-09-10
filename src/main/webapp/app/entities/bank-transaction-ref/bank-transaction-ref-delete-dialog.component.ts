import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BankTransactionRef } from './bank-transaction-ref.model';
import { BankTransactionRefPopupService } from './bank-transaction-ref-popup.service';
import { BankTransactionRefService } from './bank-transaction-ref.service';

@Component({
    selector: 'jhi-bank-transaction-ref-delete-dialog',
    templateUrl: './bank-transaction-ref-delete-dialog.component.html'
})
export class BankTransactionRefDeleteDialogComponent {

    bankTransactionRef: BankTransactionRef;

    constructor(
        private bankTransactionRefService: BankTransactionRefService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.bankTransactionRefService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'bankTransactionRefListModification',
                content: 'Deleted an bankTransactionRef'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-bank-transaction-ref-delete-popup',
    template: ''
})
export class BankTransactionRefDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bankTransactionRefPopupService: BankTransactionRefPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.bankTransactionRefPopupService
                .open(BankTransactionRefDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
