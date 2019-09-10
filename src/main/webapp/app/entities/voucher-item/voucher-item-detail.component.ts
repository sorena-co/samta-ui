import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { VoucherItem } from './voucher-item.model';
import { VoucherItemService } from './voucher-item.service';

@Component({
    selector: 'jhi-voucher-item-detail',
    templateUrl: './voucher-item-detail.component.html'
})
export class VoucherItemDetailComponent implements OnInit, OnDestroy {

    voucherItem: VoucherItem;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private voucherItemService: VoucherItemService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInVoucherItems();
    }

    load(id) {
        this.voucherItemService.find(id)
            .subscribe((voucherItemResponse: HttpResponse<VoucherItem>) => {
                this.voucherItem = voucherItemResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInVoucherItems() {
        this.eventSubscriber = this.eventManager.subscribe(
            'voucherItemListModification',
            (response) => this.load(this.voucherItem.id)
        );
    }
}
