import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {Payment} from './payment.model';
import {PaymentPopupService} from './payment-popup.service';
import {PaymentService} from './payment.service';
import {Currency, CurrencyService} from '../currency';
import {Region} from '../region';

@Component({
    selector: 'jhi-payment-dialog',
    templateUrl: './payment-dialog.component.html'
})
export class PaymentDialogComponent implements OnInit {

    currencies;
    payment: Payment;
    isSaving: boolean;
    isView: boolean;

    constructor(public activeModal: NgbActiveModal,
                private paymentService: PaymentService,
                private currencyService: CurrencyService,
                private eventManager: JhiEventManager,
                private jhiAlertService: JhiAlertService) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.currencyService.query()
            .subscribe((res: HttpResponse<Currency[]>) => {
                this.currencies = res.body;
                if (!this.payment.id) {
                    this.currencies.forEach((currency) => {
                        if (currency.isNationalCurrency) {
                            this.payment.currencyId = currency.id;
                        }
                    });
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.payment.id !== undefined) {
            this.subscribeToSaveResponse(
                this.paymentService.update(this.payment));
        } else {
            this.subscribeToSaveResponse(
                this.paymentService.create(this.payment));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Payment>>) {
        result.subscribe((res: HttpResponse<Payment>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Payment) {
        this.eventManager.broadcast({name: 'paymentListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCurrencyById(index: number, item: Currency) {
        return item.id;
    }

}

@Component({
    selector: 'jhi-payment-popup',
    template: ''
})
export class PaymentPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private paymentPopupService: PaymentPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.paymentPopupService
                    .open(PaymentDialogComponent as Component, params['id']);
            } else {
                this.paymentPopupService
                    .open(PaymentDialogComponent as Component);
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
