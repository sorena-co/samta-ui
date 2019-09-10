import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {Bill} from './bill.model';
import {BillPopupService} from './bill-popup.service';
import {BillService} from './bill.service';
import {CustomerSellContract, SellContractService} from '../sell-contract';

@Component({
    selector: 'jhi-bill-dialog',
    templateUrl: './bill-dialog.component.html'
})
export class BillDialogComponent implements OnInit {

    bill: Bill;
    isSaving: boolean;
    isView: boolean;
    customerSellContract: CustomerSellContract;
    customerSellContracts: CustomerSellContract[] | null;
    days: number[] = [];
    years: number[] = [];
    isActive: boolean = true;


    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private billService: BillService,
        private eventManager: JhiEventManager,
        private sellContractService: SellContractService
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.customerSellContract = new CustomerSellContract();
        if (this.bill.id != null) {
            this.sellContractService.findAllCustomerSellContract(this.bill.year, this.bill.month, this.bill.day, this.bill.paymentPeriod)
                .subscribe((res: HttpResponse<CustomerSellContract[]>) => {
                    this.customerSellContracts = res.body;
                    this.customerSellContract = this.customerSellContracts.find(value => value.customerId == this.bill.customerId && value.sellContractId == this.bill.sellContractId);
                });
            this.customerSellContract.sellContractId = this.bill.sellContractId;
            this.customerSellContract.customerId = this.bill.sellContractId;
            this.customerSellContract.locationId = this.bill.locationId;
        }
        for (let i = 0; i < 31; i++) {
            this.days.push(i + 1);
        }
        for (let i = 0; i < 30; i++) {
            this.years.push(1382 + i);
        }
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.bill.id !== undefined) {
            this.subscribeToSaveResponse(
                this.billService.update(this.bill));
        } else {
            this.subscribeToSaveResponse(
                this.billService.create(this.bill));
        }
    }

    changeCustomerSellContract(data) {
        this.customerSellContract = data;
        if (data != null) {
            this.bill.customerId = data.customerId;
            this.bill.sellContractId = data.sellContractId;
            this.bill.locationId = data.locationId;

        } else {
            this.bill.customerId = null;
            this.bill.sellContractId = null;
            this.bill.locationId = null;
        }
        this.billService.checkActive(this.bill)
            .subscribe(value => {
                this.isActive = value.body;
            });
    }

    changeDate() {
        this.sellContractService.findAllCustomerSellContract(this.bill.year, this.bill.month, this.bill.day, this.bill.paymentPeriod)
            .subscribe((res: HttpResponse<CustomerSellContract[]>) => {
                this.customerSellContracts = res.body;
            });
    }

    paymentPeriodChanged(date) {
        if (date != 'DAY') {
            this.bill.day = 1;
            if (date == 'YEAR') {
                this.bill.month = 0;
            }
            if (date == 'SEASON') {
                this.bill.month = 2;
            }
        }
    }

    onChangeYear(year) {
        this.bill.customerId = null;
        this.bill.totalPrice = null;
        this.bill.sellContractId = null;
        this.bill.locationId = null;
        this.bill.year = year;
        this.customerSellContracts = [];
        if (year && this.bill.day && this.bill.month) {
            this.changeDate();
        }
    }

    onChangeDay(day) {
        this.bill.customerId = null;
        this.bill.totalPrice = null;
        this.bill.sellContractId = null;
        this.bill.locationId = null;
        this.bill.day = day;
        this.customerSellContracts = [];
        if (day && this.bill.year && this.bill.month) {
            this.changeDate();
        }
    }

    onChangeMonth(month) {
        this.bill.month = month;
        this.bill.customerId = null;
        this.bill.totalPrice = null;
        this.bill.sellContractId = null;
        this.bill.locationId = null;
        this.bill.month = month;
        this.customerSellContracts = [];
        if (month && this.bill.year && this.bill.day) {
            this.changeDate();
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Bill>>) {
        result.subscribe((res: HttpResponse<Bill>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Bill) {
        this.eventManager.broadcast({name: 'billListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-bill-popup',
    template: ''
})
export class BillPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private billPopupService: BillPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.billPopupService
                    .open(BillDialogComponent as Component, params['id']);
            } else {
                this.billPopupService
                    .open(BillDialogComponent as Component);
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
