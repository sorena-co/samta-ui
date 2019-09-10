import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BankTransaction } from './bank-transaction.model';
import { BankTransactionPopupService } from './bank-transaction-popup.service';
import { BankTransactionService } from './bank-transaction.service';

@Component({
    selector: 'jhi-bank-transaction-dialog',
    templateUrl: './bank-transaction-dialog.component.html'
})
export class BankTransactionDialogComponent implements OnInit {

    bankTransaction: BankTransaction;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private bankTransactionService: BankTransactionService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.bankTransaction.id !== undefined) {
            this.subscribeToSaveResponse(
                this.bankTransactionService.update(this.bankTransaction));
        } else {
            this.subscribeToSaveResponse(
                this.bankTransactionService.create(this.bankTransaction));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<BankTransaction>>) {
        result.subscribe((res: HttpResponse<BankTransaction>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: BankTransaction) {
        this.eventManager.broadcast({ name: 'bankTransactionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-bank-transaction-popup',
    template: ''
})
export class BankTransactionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bankTransactionPopupService: BankTransactionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.bankTransactionPopupService
                    .open(BankTransactionDialogComponent as Component, params['id']);
            } else {
                this.bankTransactionPopupService
                    .open(BankTransactionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
