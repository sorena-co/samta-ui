import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {HttpResponse} from '@angular/common/http';
import {DatePipe} from '@angular/common';
import {CustomerCredit} from './customer-credit.model';
import {CustomerCreditService} from './customer-credit.service';
import {SellContractProductService} from '../sell-contract-product';
import {SellContractCustomerService} from '../sell-contract-customer';

@Injectable()
export class CustomerCreditPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private datePipe: DatePipe,
                private modalService: NgbModal,
                private router: Router,
                private sellContractProductService: SellContractProductService,
                private sellContractCustomerService: SellContractCustomerService,
                private customerCreditService: CustomerCreditService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, customerId?: number | any, personId?: number | any, sellContractProductId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.customerCreditService.find(id)
                    .subscribe((customerCreditResponse: HttpResponse<CustomerCredit>) => {
                        const customerCredit: CustomerCredit = customerCreditResponse.body;
                        this.ngbModalRef = this.customerCreditModalRef(component, customerCredit);
                        resolve(this.ngbModalRef);
                    });
            } else if (customerId) {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const customerCredit2 = new CustomerCredit();
                    customerCredit2.creditNumber = 0;
                    if (customerId) {
                        customerCredit2.customerId = customerId;
                    }
                    this.ngbModalRef = this.customerCreditModalRef(component, customerCredit2);
                    resolve(this.ngbModalRef);
                }, 0);
            } else if (personId) {
                setTimeout(() => {
                    const customerCredit2 = new CustomerCredit();
                    customerCredit2.creditNumber = 0;
                    if (personId) {
                        customerCredit2.personId = personId;
                    }
                    this.ngbModalRef = this.customerCreditModalRef(component, customerCredit2);
                    resolve(this.ngbModalRef);
                }, 0);
            } else if (sellContractProductId) {
                this.sellContractProductService.findSellContractCustomerIdBySellContractProduct(sellContractProductId)
                    .subscribe((customerId) => {
                        const customerCredit2 = new CustomerCredit();
                        customerCredit2.creditNumber = 0;
                        customerCredit2.productId = sellContractProductId;
                        customerCredit2.customerId = customerId;
                        this.ngbModalRef = this.customerCreditModalRef(component, customerCredit2);
                        resolve(this.ngbModalRef);
                    });
            }
        });
    }

    customerCreditModalRef(component: Component, customerCredit: CustomerCredit): NgbModalRef {
        const modalRef = this.modalService.open(component, {size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.customerCredit = customerCredit;
        modalRef.result.then((result) => {
            this.router.navigate([{outlets: {popup: null}}], {replaceUrl: true, queryParamsHandling: 'merge'});
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{outlets: {popup: null}}], {replaceUrl: true, queryParamsHandling: 'merge'});
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
