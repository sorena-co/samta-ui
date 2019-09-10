import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Loan } from './loan.model';
import { LoanPopupService } from './loan-popup.service';
import { LoanService } from './loan.service';
import { LoanType, LoanTypeService } from '../loan-type';

@Component({
    selector: 'jhi-loan-dialog',
    templateUrl: './loan-dialog.component.html'
})
export class LoanDialogComponent implements OnInit {

    loan: Loan;
    isSaving: boolean;
    isView: boolean;


        loantype: LoanType[];
    loantypes: LoanType[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private loanService: LoanService,
        private loanTypeService: LoanTypeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.loanTypeService.query()
            .subscribe((res: HttpResponse<LoanType[]>) => { this.loantype = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.loan.id !== undefined) {
            this.subscribeToSaveResponse(
                this.loanService.update(this.loan));
        } else {
            this.subscribeToSaveResponse(
                this.loanService.create(this.loan));
        }
    }

private subscribeToSaveResponse(result: Observable<HttpResponse<Loan>>) {
        result.subscribe((res: HttpResponse<Loan>) =>
        this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

private onSaveSuccess(result: Loan) {
        this.eventManager.broadcast({ name: 'loanListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

private onSaveError() {
        this.isSaving = false;
    }

private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

            trackLoanTypeById(index: number, item: LoanType) {
                return item.id;
            }
}

@Component({
    selector: 'jhi-loan-popup',
    template: ''
})
export class LoanPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private loanPopupService: LoanPopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            View.isView = !!params['view'];

            if ( params['id'] ) {
                this.loanPopupService
                    .open(LoanDialogComponent as Component, params['id']);
            } else {
                this.loanPopupService
                    .open(LoanDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
class View {
    static isView: boolean;
}
