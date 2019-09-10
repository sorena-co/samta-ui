import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { MainDayDepot } from './main-day-depot.model';
import { MainDayDepotService } from './main-day-depot.service';

@Injectable()
export class MainDayDepotPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private router: Router,
    private mainDayDepotService: MainDayDepotService

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
                this.mainDayDepotService.find(id).subscribe((mainDayDepot) => {
                    this.ngbModalRef = this.mainDayDepotModalRef(component, mainDayDepot.body);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const mainDayDepot = new MainDayDepot();
                    mainDayDepot.day = Date.now();
                    this.ngbModalRef = this.mainDayDepotModalRef(component, mainDayDepot);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    mainDayDepotModalRef(component: Component, mainDayDepot: MainDayDepot): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.mainDayDepot = mainDayDepot;
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
