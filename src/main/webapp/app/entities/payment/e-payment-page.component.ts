import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiEventManager, JhiParseLinks, JhiAlertService} from 'ng-jhipster';
import {PaymentService} from './payment.service';
import {Principal} from '../../shared';
import {TranslateService} from '@ngx-translate/core';
import {SpentType} from '../payment-bill';
import {BankTransactionService, BankTransactionState} from '../bank-transaction';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Payment} from './payment.model';
import {PlatformLocation} from '@angular/common';

@Component({
    selector: 'jhi-e-payment-page',
    templateUrl: './e-payment-page.component.html',
    styleUrls: ['../../shared/e-payment/e-payment.component.css']
})
export class EPaymentPageComponent implements OnInit {

    error: any;
    success: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    breadcrumbItems: any[];
    SpentType = SpentType;
    @Input('requestIdentifier')
    requestIdentifier;
    amount: number;
    type: SpentType;
    BankTransactionState = BankTransactionState;
    state: any;
    payments: Payment[] = [];
    @ViewChild('formipg') form: ElementRef;
    onlyPayment: boolean;
    payAmount: number;
    baseUrl: any;
    message: any;
    redirectUrl: any;

    constructor(private paymentService: PaymentService,
                private bankTransactionService: BankTransactionService,
                private parseLinks: JhiParseLinks,
                private jhiAlertService: JhiAlertService,
                private principal: Principal,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private translateService: TranslateService,
                private eventManager: JhiEventManager,
                private platformLocation: PlatformLocation) {
        this.requestIdentifier = activatedRoute.snapshot.queryParams.identifier;
        this.baseUrl = (platformLocation as any).location.origin;
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe((title) => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.payment.electronic.title').subscribe((title) => {
            this.breadcrumbItems.push({label: title});
        });
    }

    paymentSelected(paymentSelected: Payment[]) {
        let sum = 0;
        paymentSelected.forEach((value) => {
            sum += value.currentAmount;
        });

        if (sum >= this.amount) {
            this.onlyPayment = true;
        } else {
            this.onlyPayment = false;
            this.payAmount = this.amount - sum;
        }

    }
/*
    payAndBuy() {

        this.bankTransactionService.updateRequestIdentifier(this.requestIdentifier, this.payments)
            .subscribe((isOk: HttpResponse<Boolean>) => {
                if (isOk) this.form.nativeElement.submit();
            }, (res: HttpErrorResponse) => this.jhiAlertService.error(res.message, null, null));

    }

    pay() {
        if (this.payments && this.payments.length > 0) {
            this.paymentService.payByPayment(this.requestIdentifier, this.payments)
                .subscribe((isOk: HttpResponse<any>) => {
                    window.location.reload();
                }, (res: HttpErrorResponse) => this.jhiAlertService.error(res.message, null, null));
        }
    }*/

    ngOnInit() {
        this.setBreadCrumb();

        this.loadBankTransaction();
    }

    loadBankTransaction() {
        if (this.requestIdentifier) {
            this.bankTransactionService.findByIdentifier(this.requestIdentifier).subscribe((bankTransaction) => {
                this.amount = bankTransaction.body.amount;
                this.type = bankTransaction.body.type;
                this.state = bankTransaction.body.bankTransactionState;
                this.payAmount = this.amount;
                this.redirectUrl = bankTransaction.body.redirectUrl;
                this.createMessage();
            }, (res: Response) => {
                this.onError(res);
            });
        } else {
            window.history.back();
        }
    }

    private onSuccess(data, headers) {

    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
        this.createMessage();
    }

    // error.pnggood.pngwarning.png
    createMessage() {
        this.message = null;
        if (!this.state) {
            this.message = {
                icon: 'error',
                reload: true,
                title: 'بارگذاری اطلاعات اولیه',
                body: 'خطا در بارگذاری اطلاعات اولیه. اطلاعات را دوباره بارگذاری کنید.'
            };
        }
        else if (this.state == this.BankTransactionState[this.BankTransactionState.FAILED]) {
            this.message = {
                icon: 'warning',
                title: 'پرداخت ناموفق',
                body: 'تراکنش ناموفق بوده است. در صورت کسر از حساب شما این مبلغ طی 24 الی 48 ساعت به حساب شما بازگشت داده خواهد شد. '
            };
        }
        else if (this.state == this.BankTransactionState[this.BankTransactionState.CANCEL]) {
            this.message = {
                icon: 'warning',
                title: 'پرداخت لغو شده',
                body: 'پرداخت از طرف کاربر لغو شده اشت.'
            };
        }
        else if (this.state == this.BankTransactionState[this.BankTransactionState.SYS_ERROR] || this.state == this.BankTransactionState[this.BankTransactionState.BANK_ERROR]) {
            this.message = {
                icon: 'error',
                title: 'خطا',
                body: 'عملیات پرداخت با خطا متوقف شد. در صورت کسر از حساب شما این مبلغ طی 24 الی 48 ساعت به حساب شما بازگشت داده خواهد شد.'
            };
        }
        else if (this.state == this.BankTransactionState[this.BankTransactionState.COMPLETE]) {
            this.message = {
                icon: 'good',
                title: 'تراکنش موفق',
                body: 'تراکنش با شناسه پرداخت ' + this.requestIdentifier + ' با موفقیت انجام شد.',
                redirectUrl: this.redirectUrl
            };
        }
        else if (this.state == this.BankTransactionState[this.BankTransactionState.PENDING]) {
            this.message = {
                icon: 'warning',
                title: 'فیش موجود',
                body: 'تراکنش با شناسه پرداخت ' + this.requestIdentifier + ' به فیش های موجود شما افزوده شد. مراحل پرداخت از طریق فیش های موجود شما امکان پزیر می باشد.'
            };
        }
    }
}
