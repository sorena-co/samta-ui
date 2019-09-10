import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { VoucherTemplate } from './voucher-template.model';
import { VoucherTemplatePopupService } from './voucher-template-popup.service';
import { VoucherTemplateService } from './voucher-template.service';
import {VoucherType} from "../voucher-type/voucher-type.model";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {VoucherTypeGroup} from "../voucher-type-group";

@Component({
    selector: 'jhi-voucher-template-execute-query-dialog',
    templateUrl: './voucher-template-execute-query-dialog.component.html'
})
export class VoucherTemplateExecuteQueryDialogComponent {

    voucherTemplate: VoucherTemplate;
    locationId: number;
    dateTime: any;
    isSaving: boolean;
    isView: boolean;


    constructor(
        private voucherTemplateService: VoucherTemplateService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    /*confirmDelete(id: number) {
        this.isSaving = true;
        this.voucherTemplateService.executeQuery(id,this.dateTime,this.locationId).subscribe((response) => {
            this.isSaving = true;
            this.eventManager.broadcast({
                name: 'voucherTemplateListModification',
                content: 'Deleted an voucherTemplate'
            });
            this.activeModal.dismiss(true);
        });
    }*/

    confirmDelete(id: number) {
        this.isSaving = true;
            this.subscribeToSaveResponse(
                this.voucherTemplateService.executeQuery(id,this.dateTime,this.locationId));
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<VoucherType>>) {
        result.subscribe((res: HttpResponse<VoucherType>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: VoucherType) {
        this.eventManager.broadcast({name: 'voucherTypeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

}

@Component({
    selector: 'jhi-voucher-template-execute-query-popup',
    template: ''
})
export class VoucherTemplateExecuteQueryPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private voucherTemplatePopupService: VoucherTemplatePopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.voucherTemplatePopupService
                .open(VoucherTemplateExecuteQueryDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
