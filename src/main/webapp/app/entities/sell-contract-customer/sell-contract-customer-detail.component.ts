import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SellContractCustomer } from './sell-contract-customer.model';
import { SellContractCustomerService } from './sell-contract-customer.service';

@Component({
    selector: 'jhi-sell-contract-customer-detail',
    templateUrl: './sell-contract-customer-detail.component.html'
})
export class SellContractCustomerDetailComponent implements OnInit, OnDestroy {

    sellContractCustomer: SellContractCustomer;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private sellContractCustomerService: SellContractCustomerService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSellContractCustomers();
    }

    load(id) {
        this.sellContractCustomerService.find(id)
            .subscribe((sellContractCustomerResponse: HttpResponse<SellContractCustomer>) => {
                this.sellContractCustomer = sellContractCustomerResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSellContractCustomers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'sellContractCustomerListModification',
            (response) => this.load(this.sellContractCustomer.id)
        );
    }
}
