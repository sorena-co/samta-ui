import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BillItem } from './bill-item.model';
import { BillItemPopupService } from './bill-item-popup.service';
import { BillItemService } from './bill-item.service';
import { Bill, BillService } from '../bill';

@Component({
    selector: 'jhi-bill-item-dialog',
    templateUrl: './bill-item-dialog.component.html'
})
export class BillItemDialogComponent implements OnInit {

    billItem: BillItem;
    isSaving: boolean;

    bills: Bill[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private billItemService: BillItemService,
        private billService: BillService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.billService.query()
            .subscribe((res: HttpResponse<Bill[]>) => { this.bills = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.billItem.id !== undefined) {
            this.subscribeToSaveResponse(
                this.billItemService.update(this.billItem));
        } else {
            this.subscribeToSaveResponse(
                this.billItemService.create(this.billItem));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<BillItem>>) {
        result.subscribe((res: HttpResponse<BillItem>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: BillItem) {
        this.eventManager.broadcast({ name: 'billItemListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackBillById(index: number, item: Bill) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-bill-item-popup',
    template: ''
})
export class BillItemPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private billItemPopupService: BillItemPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.billItemPopupService
                    .open(BillItemDialogComponent as Component, params['id']);
            } else {
                this.billItemPopupService
                    .open(BillItemDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
