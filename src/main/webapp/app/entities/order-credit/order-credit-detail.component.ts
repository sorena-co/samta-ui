import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { OrderCredit } from './order-credit.model';
import { OrderCreditService } from './order-credit.service';

@Component({
    selector: 'jhi-order-credit-detail',
    templateUrl: './order-credit-detail.component.html'
})
export class OrderCreditDetailComponent implements OnInit, OnDestroy {

    orderCredit: OrderCredit;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private orderCreditService: OrderCreditService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInOrderCredits();
    }

    load(id) {
        this.orderCreditService.find(id).subscribe((orderCredit) => {
            this.orderCredit = orderCredit.body;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOrderCredits() {
        this.eventSubscriber = this.eventManager.subscribe(
            'orderCreditListModification',
            (response) => this.load(this.orderCredit.id)
        );
    }
}
