import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { BankTransactionRef } from './bank-transaction-ref.model';
import { BankTransactionRefService } from './bank-transaction-ref.service';

@Injectable()
export class BankTransactionRefPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private bankTransactionRefService: BankTransactionRefService

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
                this.bankTransactionRefService.find(id)
                    .subscribe((bankTransactionRefResponse: HttpResponse<BankTransactionRef>) => {
                        const bankTransactionRef: BankTransactionRef = bankTransactionRefResponse.body;
                        this.ngbModalRef = this.bankTransactionRefModalRef(component, bankTransactionRef);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.bankTransactionRefModalRef(component, new BankTransactionRef());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    bankTransactionRefModalRef(component: Component, bankTransactionRef: BankTransactionRef): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.bankTransactionRef = bankTransactionRef;
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
