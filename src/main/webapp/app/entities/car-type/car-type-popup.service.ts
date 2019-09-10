import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CarType } from './car-type.model';
import { CarTypeService } from './car-type.service';

@Injectable()
export class CarTypePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private modalService: NgbModal,
    private router: Router,
    private carTypeService: CarTypeService

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
                this.carTypeService.find(id).subscribe((carType) => {
                    this.ngbModalRef = this.carTypeModalRef(component, carType.body);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const carType = new CarType();
                    this.ngbModalRef = this.carTypeModalRef(component, carType);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    carTypeModalRef(component: Component, carType: CarType): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.carType = carType;
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
