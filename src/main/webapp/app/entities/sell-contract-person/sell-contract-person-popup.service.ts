import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { SellContractPerson } from './sell-contract-person.model';
import { SellContractPersonService } from './sell-contract-person.service';

@Injectable()
export class SellContractPersonPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private sellContractPersonService: SellContractPersonService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, sellContractId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.sellContractPersonService.find(id)
                    .subscribe((sellContractPersonResponse: HttpResponse<SellContractPerson>) => {
                        const sellContractPerson: SellContractPerson = sellContractPersonResponse.body;
                        sellContractPerson.startDate = this.datePipe
                            .transform(sellContractPerson.startDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.sellContractPersonModalRef(component, sellContractPerson);
                        resolve(this.ngbModalRef);
                    });
            } else if (sellContractId) {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const sellContractPerson = new SellContractPerson();
                    sellContractPerson.sellContractId = sellContractId;
                    this.ngbModalRef = this.sellContractPersonModalRef(component, sellContractPerson);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    sellContractPersonModalRef(component: Component, sellContractPerson: SellContractPerson): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.sellContractPerson = sellContractPerson;
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
