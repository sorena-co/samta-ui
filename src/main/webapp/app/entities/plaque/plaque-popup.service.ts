import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Plaque } from './plaque.model';
import { PlaqueService } from './plaque.service';

@Injectable()
export class PlaquePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private modalService: NgbModal,
    private router: Router,
    private plaqueService: PlaqueService

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
                this.plaqueService.find(id).subscribe((plaque) => {
                    this.ngbModalRef = this.plaqueModalRef(component, plaque.body);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const plaque = new Plaque();
                    this.ngbModalRef = this.plaqueModalRef(component, plaque);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    plaqueModalRef(component: Component, plaque: Plaque): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.plaque = plaque;
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
