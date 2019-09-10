import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { CarTypeLimit } from './car-type-limit.model';
import { CarTypeLimitService } from './car-type-limit.service';

@Injectable()
export class CarTypeLimitPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private router: Router,
    private carTypeLimitService: CarTypeLimitService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, customerTypeId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.carTypeLimitService.find(id).subscribe((carTypeLimit) => {
                    this.ngbModalRef = this.carTypeLimitModalRef(component, carTypeLimit.body);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const carTypeLimit = new CarTypeLimit();
                    carTypeLimit.customerTypeId = customerTypeId;
                    this.ngbModalRef = this.carTypeLimitModalRef(component, carTypeLimit);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    carTypeLimitModalRef(component: Component, carTypeLimit: CarTypeLimit): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.carTypeLimit = carTypeLimit;
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
