import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { ShiftWork } from './shift-work.model';
import { ShiftWorkService } from './shift-work.service';

@Injectable()
export class ShiftWorkPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private router: Router,
    private shiftWorkService: ShiftWorkService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, locationId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.shiftWorkService.find(id).subscribe((shiftWork) => {
                    this.ngbModalRef = this.shiftWorkModalRef(component, shiftWork.body);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const shiftWork = new ShiftWork();
                    shiftWork.locationId = locationId;
                    this.ngbModalRef = this.shiftWorkModalRef(component, shiftWork);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    shiftWorkModalRef(component: Component, shiftWork: ShiftWork): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.shiftWork = shiftWork;
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
