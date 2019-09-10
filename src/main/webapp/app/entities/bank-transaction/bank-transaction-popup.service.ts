import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {HttpResponse} from '@angular/common/http';
import {DatePipe} from '@angular/common';
import {BankTransaction} from './bank-transaction.model';
import {BankTransactionService} from './bank-transaction.service';

@Injectable()
export class BankTransactionPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private datePipe: DatePipe,
                private modalService: NgbModal,
                private router: Router,
                private bankTransactionService: BankTransactionService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.bankTransactionService.find(id)
                    .subscribe((bankTransactionResponse: HttpResponse<BankTransaction>) => {
                        const bankTransaction: BankTransaction = bankTransactionResponse.body;
                        this.ngbModalRef = this.bankTransactionModalRef(component, bankTransaction);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.bankTransactionModalRef(component, new BankTransaction());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    bankTransactionModalRef(component: Component, bankTransaction: BankTransaction): NgbModalRef {
        const modalRef = this.modalService.open(component, {size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.bankTransaction = bankTransaction;
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
