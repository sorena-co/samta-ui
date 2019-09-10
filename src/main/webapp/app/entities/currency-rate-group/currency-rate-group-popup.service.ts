import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { CurrencyRateGroup } from './currency-rate-group.model';
import { CurrencyRateGroupService } from './currency-rate-group.service';

@Injectable()
export class CurrencyRateGroupPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private currencyRateGroupService: CurrencyRateGroupService

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
                this.currencyRateGroupService.find(id)
                    .subscribe((currencyRateGroupResponse: HttpResponse<CurrencyRateGroup>) => {
                        const currencyRateGroup: CurrencyRateGroup = currencyRateGroupResponse.body;
                        this.ngbModalRef = this.currencyRateGroupModalRef(component, currencyRateGroup);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.currencyRateGroupModalRef(component, new CurrencyRateGroup());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    currencyRateGroupModalRef(component: Component, currencyRateGroup: CurrencyRateGroup): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.currencyRateGroup = currencyRateGroup;
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
