import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BankTransactionRef } from './bank-transaction-ref.model';
import { BankTransactionRefPopupService } from './bank-transaction-ref-popup.service';
import { BankTransactionRefService } from './bank-transaction-ref.service';
import { BankTransaction, BankTransactionService } from '../bank-transaction';

@Component({
    selector: 'jhi-bank-transaction-ref-dialog',
    templateUrl: './bank-transaction-ref-dialog.component.html'
})
export class BankTransactionRefDialogComponent implements OnInit {

    bankTransactionRef: BankTransactionRef;
    isSaving: boolean;

    banktransactions: BankTransaction[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private bankTransactionRefService: BankTransactionRefService,
        private bankTransactionService: BankTransactionService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.bankTransactionService.query()
            .subscribe((res: HttpResponse<BankTransaction[]>) => { this.banktransactions = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.bankTransactionRef.id !== undefined) {
            this.subscribeToSaveResponse(
                this.bankTransactionRefService.update(this.bankTransactionRef));
        } else {
            this.subscribeToSaveResponse(
                this.bankTransactionRefService.create(this.bankTransactionRef));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<BankTransactionRef>>) {
        result.subscribe((res: HttpResponse<BankTransactionRef>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: BankTransactionRef) {
        this.eventManager.broadcast({ name: 'bankTransactionRefListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackBankTransactionById(index: number, item: BankTransaction) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-bank-transaction-ref-popup',
    template: ''
})
export class BankTransactionRefPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bankTransactionRefPopupService: BankTransactionRefPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.bankTransactionRefPopupService
                    .open(BankTransactionRefDialogComponent as Component, params['id']);
            } else {
                this.bankTransactionRefPopupService
                    .open(BankTransactionRefDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
