import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { SellContractCustomer } from './sell-contract-customer.model';
import { SellContractCustomerService } from './sell-contract-customer.service';

@Injectable()
export class SellContractCustomerPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private sellContractCustomerService: SellContractCustomerService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.sellContractCustomerService.find(id)
                    .subscribe((sellContractCustomerResponse: HttpResponse<SellContractCustomer>) => {
                        const sellContractCustomer: SellContractCustomer = sellContractCustomerResponse.body;
                        sellContractCustomer.startDate = this.datePipe
                            .transform(sellContractCustomer.startDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.sellContractCustomerModalRef(component, sellContractCustomer);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.sellContractCustomerModalRef(component, new SellContractCustomer());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    sellContractCustomerModalRef(component: Component, sellContractCustomer: SellContractCustomer): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.sellContractCustomer = sellContractCustomer;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
