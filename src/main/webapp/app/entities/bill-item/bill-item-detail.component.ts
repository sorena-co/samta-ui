import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { BillItem } from './bill-item.model';
import { BillItemService } from './bill-item.service';

@Component({
    selector: 'jhi-bill-item-detail',
    templateUrl: './bill-item-detail.component.html'
})
export class BillItemDetailComponent implements OnInit, OnDestroy {

    billItem: BillItem;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private billItemService: BillItemService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBillItems();
    }

    load(id) {
        this.billItemService.find(id)
            .subscribe((billItemResponse: HttpResponse<BillItem>) => {
                this.billItem = billItemResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBillItems() {
        this.eventSubscriber = this.eventManager.subscribe(
            'billItemListModification',
            (response) => this.load(this.billItem.id)
        );
    }
}
