import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { BankTransaction } from './bank-transaction.model';
import { BankTransactionService } from './bank-transaction.service';

@Component({
    selector: 'jhi-bank-transaction-detail',
    templateUrl: './bank-transaction-detail.component.html'
})
export class BankTransactionDetailComponent implements OnInit, OnDestroy {

    bankTransaction: BankTransaction;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private bankTransactionService: BankTransactionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBankTransactions();
    }

    load(id) {
        this.bankTransactionService.find(id)
            .subscribe((bankTransactionResponse: HttpResponse<BankTransaction>) => {
                this.bankTransaction = bankTransactionResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBankTransactions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'bankTransactionListModification',
            (response) => this.load(this.bankTransaction.id)
        );
    }
}
