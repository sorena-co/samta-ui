import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SellContractCustomer } from './sell-contract-customer.model';
import { SellContractCustomerPopupService } from './sell-contract-customer-popup.service';
import { SellContractCustomerService } from './sell-contract-customer.service';
import { SellContract, SellContractService } from '../sell-contract';
import { Customer, CustomerService } from '../customer';
import { Location, LocationService } from '../location';
import {MenuItem} from 'primeng/api';

@Component({
    selector: 'jhi-sell-contract-customer-dialog',
    templateUrl: './sell-contract-customer-dialog.component.html'
})
export class SellContractCustomerDialogComponent implements OnInit {

    sellContractCustomer: SellContractCustomer;
    isSaving: boolean;

    sellcontracts: SellContract[];

    customers: Customer[];

    locations: Location[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private sellContractCustomerService: SellContractCustomerService,
        private sellContractService: SellContractService,
        private customerService: CustomerService,
        private locationService: LocationService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.sellContractService.query()
            .subscribe((res: HttpResponse<SellContract[]>) => { this.sellcontracts = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.customerService.query()
            .subscribe((res: HttpResponse<Customer[]>) => { this.customers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.locationService.query()
            .subscribe((res: HttpResponse<Location[]>) => { this.locations = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.sellContractCustomer.id !== undefined) {
            this.subscribeToSaveResponse(
                this.sellContractCustomerService.update(this.sellContractCustomer));
        } else {
            this.subscribeToSaveResponse(
                this.sellContractCustomerService.create(this.sellContractCustomer));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SellContractCustomer>>) {
        result.subscribe((res: HttpResponse<SellContractCustomer>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SellContractCustomer) {
        this.eventManager.broadcast({ name: 'sellContractCustomerListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackSellContractById(index: number, item: SellContract) {
        return item.id;
    }

    trackCustomerById(index: number, item: Customer) {
        return item.id;
    }

    trackLocationById(index: number, item: Location) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-sell-contract-customer-popup',
    template: ''
})
export class SellContractCustomerPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sellContractCustomerPopupService: SellContractCustomerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.sellContractCustomerPopupService
                    .open(SellContractCustomerDialogComponent as Component, params['id']);
            } else {
                this.sellContractCustomerPopupService
                    .open(SellContractCustomerDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
