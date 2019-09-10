import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import {Payment, ReceiptMethod} from './payment.model';
import { PaymentService } from './payment.service';

@Injectable()
export class PaymentPopupService {
    private ngbModalRef: NgbModalRef;
    ReceiptMethod = ReceiptMethod;

    constructor(
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private router: Router,
    private paymentService: PaymentService

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
                this.paymentService.find(id)
                    .subscribe((paymentResponse: HttpResponse<Payment>) => {
                        const payment: Payment = paymentResponse.body;
                        this.ngbModalRef = this.paymentModalRef(component, payment);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const payment = new Payment();
                    payment.registerMethod = this.ReceiptMethod[this.ReceiptMethod.BRANCH];
                    this.ngbModalRef = this.paymentModalRef(component, payment);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    paymentModalRef(component: Component, payment: Payment): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.payment = payment;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
