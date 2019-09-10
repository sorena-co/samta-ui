import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { LoanPayment } from './loan-payment.model';
import { LoanPaymentService } from './loan-payment.service';

@Component({
    selector: 'jhi-loan-payment-detail',
    templateUrl: './loan-payment-detail.component.html'
})
export class LoanPaymentDetailComponent implements OnInit, OnDestroy {

    loanPayment: LoanPayment;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private loanPaymentService: LoanPaymentService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInLoanPayments();
    }

    load(id) {
        this.loanPaymentService.find(id)
            .subscribe((loanPaymentResponse: HttpResponse<LoanPayment>) => {
                this.loanPayment = loanPaymentResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLoanPayments() {
        this.eventSubscriber = this.eventManager.subscribe(
            'loanPaymentListModification',
            (response) => this.load(this.loanPayment.id)
        );
    }
}
