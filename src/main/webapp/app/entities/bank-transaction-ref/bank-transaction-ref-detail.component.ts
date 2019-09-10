import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { BankTransactionRef } from './bank-transaction-ref.model';
import { BankTransactionRefService } from './bank-transaction-ref.service';

@Component({
    selector: 'jhi-bank-transaction-ref-detail',
    templateUrl: './bank-transaction-ref-detail.component.html'
})
export class BankTransactionRefDetailComponent implements OnInit, OnDestroy {

    bankTransactionRef: BankTransactionRef;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private bankTransactionRefService: BankTransactionRefService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBankTransactionRefs();
    }

    load(id) {
        this.bankTransactionRefService.find(id)
            .subscribe((bankTransactionRefResponse: HttpResponse<BankTransactionRef>) => {
                this.bankTransactionRef = bankTransactionRefResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBankTransactionRefs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'bankTransactionRefListModification',
            (response) => this.load(this.bankTransactionRef.id)
        );
    }
}
