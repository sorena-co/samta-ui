import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { VoucherItem } from './voucher-item.model';
import { VoucherItemPopupService } from './voucher-item-popup.service';
import { VoucherItemService } from './voucher-item.service';
import { VoucherMaster, VoucherMasterService } from '../voucher-master';

@Component({
    selector: 'jhi-voucher-item-dialog',
    templateUrl: './voucher-item-dialog.component.html'
})
export class VoucherItemDialogComponent implements OnInit {

    voucherItem: VoucherItem;
    isSaving: boolean;

    vouchermasters: VoucherMaster[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private voucherItemService: VoucherItemService,
        private voucherMasterService: VoucherMasterService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.voucherMasterService.query()
            .subscribe((res: HttpResponse<VoucherMaster[]>) => { this.vouchermasters = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.voucherItem.id !== undefined) {
            this.subscribeToSaveResponse(
                this.voucherItemService.update(this.voucherItem));
        } else {
            this.subscribeToSaveResponse(
                this.voucherItemService.create(this.voucherItem));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<VoucherItem>>) {
        result.subscribe((res: HttpResponse<VoucherItem>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: VoucherItem) {
        this.eventManager.broadcast({ name: 'voucherItemListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackVoucherMasterById(index: number, item: VoucherMaster) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-voucher-item-popup',
    template: ''
})
export class VoucherItemPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private voucherItemPopupService: VoucherItemPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.voucherItemPopupService
                    .open(VoucherItemDialogComponent as Component, params['id']);
            } else {
                this.voucherItemPopupService
                    .open(VoucherItemDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
