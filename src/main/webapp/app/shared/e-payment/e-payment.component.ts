import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiEventManager, JhiParseLinks, JhiAlertService} from 'ng-jhipster';
import {PaymentService} from '../../entities/payment/payment.service';
import {Principal} from '../index';
import {TranslateService} from '@ngx-translate/core';
import {SpentType} from '../../entities/payment-bill/index';
import {BankTransactionService, BankTransactionState} from '../../entities/bank-transaction/index';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Payment} from '../../entities/payment/payment.model';
import {PlatformLocation} from '@angular/common';
import {CookieService} from 'ngx-cookie';
import {PosService} from './pos.service';
import {PosDevice, PosSale, PosSaleResponse} from './pos.model';

@Component({
    selector: 'jhi-e-payment',
    templateUrl: './e-payment.component.html',
    styleUrls: ['./e-payment.component.css']
})
export class EPaymentComponent implements OnInit, OnChanges {

    @Input('requestIdentifier')
    requestIdentifier;
    @Input('showButton')
    showButton = true;
    @Output('status')
    status = new EventEmitter();
    @Output('onlyPayment')
    onlyPaymentEm = new EventEmitter();

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
    SpentType = SpentType;
    amount: number;
    BankTransactionState = BankTransactionState;
    type: SpentType;
    state: any;
    payments: Payment[] = [];
    @ViewChild('formipg') form: ElementRef;
    onlyPayment: boolean;
    payAmount: number;
    baseUrl: any;
    message: any;
    redirectUrl: any;

    pos: { ip: string, device: PosDevice } = {ip: 'http://localhost:8050', device: null};
    devices: PosDevice[] | null;
    payType: string;

    constructor(private paymentService: PaymentService,
                private bankTransactionService: BankTransactionService,
                private parseLinks: JhiParseLinks,
                private jhiAlertService: JhiAlertService,
                private principal: Principal,
                private router: Router,
                private translateService: TranslateService,
                private posService: PosService,
                private eventManager: JhiEventManager,
                private cookieService: CookieService,
                private platformLocation: PlatformLocation) {
        this.baseUrl = (platformLocation as any).location.origin;
        cookieService.put('baseUrl', this.baseUrl);
        this.pos.ip = cookieService.get('posIp');
        this.payType = 'EPAYMENT';
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
        this.onlyPaymentEm.emit(this.onlyPayment);
    }


    public changeType(event) {
        console.log(event);
        this.payType = event.nextId;
    }

    public pay() {
        if (!this.onlyPayment) {
            if (this.payType === 'EPAYMENT') {
                this.paymentService.updatePreviousPayments(this.requestIdentifier, this.payments)
                    .subscribe((isOk: HttpResponse<Boolean>) => {
                        if (isOk) {
                            this.form.nativeElement.submit();
                        }
                    }, (res: HttpErrorResponse) => this.jhiAlertService.error(res.message, null, null));
            } else {
                const sale = new PosSale(this.pos.device.IpAdress, this.pos.device.Port, 'Lan', '1:0,2:100', '3', this.payAmount + '');
                this.posService.sale(this.pos.ip, sale).subscribe((value: PosSaleResponse) => {
                    if (value.ResponseCode === '0' || value.ResponseCode === '00') {
                        this.paymentService.payByPreviousPaymentsAndPcPos(this.requestIdentifier, this.payments, value)
                            .subscribe((isOk: HttpResponse<any>) => {
                                if (isOk) {
                                    window.location.reload();
                                }
                            }, (res: HttpErrorResponse) => this.jhiAlertService.error(res.message, null, null));
                    } else {
                        this.jhiAlertService.error(value.PcPosStatus, null, null);
                    }
                });
            }
        } else {
            if (this.payments && this.payments.length > 0) {
                this.paymentService.payByPreviousPayments(this.requestIdentifier, this.payments)
                    .subscribe((isOk: HttpResponse<any>) => {
                        if (isOk) {
                            window.location.reload();
                        }
                    }, (res: HttpErrorResponse) => this.jhiAlertService.error(res.message, null, null));
            }
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.requestIdentifier && !changes.requestIdentifier.isFirstChange()) {
            this.ngOnInit();
        }
    }

    ngOnInit() {

        if (this.pos.ip) {
            this.posService.getInfo(this.pos.ip).subscribe((value) => {
                this.posService.getDevices(this.pos.ip).subscribe((value1) => {
                    this.devices = value1.body;
                    if (this.devices && this.devices.length) {
                        this.pos.device = this.devices[0];
                    }
                });
            }, error1 => {
                this.pos.ip = null;
                console.log(error1);
            });
        }
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
                this.status.emit(this.state);
            }, (res: Response) => {
                this.onError(res);
            });
        }
    }

    private onSuccess(data, headers) {

    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
        this.createMessage();
    }

    createMessage() {
        this.message = null;
        if (!this.state) {
            this.message = {
                icon: 'error',
                reload: true,
                title: 'بارگذاری اطلاعات اولیه',
                body: 'خطا در بارگذاری اطلاعات اولیه. اطلاعات را دوباره بارگذاری کنید.'
            };
        } else if (this.state === this.BankTransactionState[this.BankTransactionState.FAILED]) {
            this.message = {
                icon: 'warning',
                title: 'پرداخت ناموفق',
                body: 'تراکنش ناموفق بوده است. در صورت کسر از حساب شما این مبلغ طی 24 الی 48 ساعت به حساب شما بازگشت داده خواهد شد. '
            };
        } else if (this.state === this.BankTransactionState[this.BankTransactionState.CANCEL]) {
            this.message = {
                icon: 'warning',
                title: 'پرداخت لغو شده',
                body: 'پرداخت از طرف کاربر لغو شده اشت.'
            };
        } else if (this.state === this.BankTransactionState[this.BankTransactionState.SYS_ERROR] ||
            this.state === this.BankTransactionState[this.BankTransactionState.BANK_ERROR]) {
            this.message = {
                icon: 'error',
                title: 'خطا',
                body: 'عملیات پرداخت با خطا متوقف شد. در صورت کسر از حساب شما این مبلغ طی 24 الی 48 ساعت به حساب شما بازگشت داده خواهد شد.'
            };
        } else if (this.state === this.BankTransactionState[this.BankTransactionState.COMPLETE]) {
            this.message = {
                icon: 'good',
                title: 'تراکنش موفق',
                body: 'تراکنش با شناسه پرداخت ' + this.requestIdentifier + ' با موفقیت انجام شد.',
                redirectUrl: this.redirectUrl
            };
        } else if (this.state === this.BankTransactionState[this.BankTransactionState.COMPLETE_PAY]) {
            this.message = {
                icon: 'good',
                title: 'تراکنش موفق',
                body: 'تراکنش با شناسه پرداخت ' + this.requestIdentifier + ' با موفقیت انجام شد. و به لیست فیش های موجود شما اضافه گردید.',
                redirectUrl: this.redirectUrl
            };
        } else if (this.state === this.BankTransactionState[this.BankTransactionState.PENDING]) {
            this.message = {
                icon: 'warning',
                title: 'فیش موجود',
                body: 'تراکنش با شناسه پرداخت ' + this.requestIdentifier + ' به فیش های موجود شما افزوده شد. مراحل پرداخت از طریق فیش های موجود شما امکان پزیر می باشد.'
            };
        }
    }
}
