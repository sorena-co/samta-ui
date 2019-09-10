import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CarTank } from './car-tank.model';
import { CarTankService } from './car-tank.service';

@Injectable()
export class CarTankPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private modalService: NgbModal,
    private router: Router,
    private carTankService: CarTankService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, customerId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.carTankService.find(id).subscribe((carTank) => {
                    this.ngbModalRef = this.carTankModalRef(component, carTank.body);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const carTank = new CarTank();
                    carTank.customerId = customerId;
                    this.ngbModalRef = this.carTankModalRef(component, carTank);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    carTankModalRef(component: Component, carTank: CarTank): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.carTank = carTank;
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
