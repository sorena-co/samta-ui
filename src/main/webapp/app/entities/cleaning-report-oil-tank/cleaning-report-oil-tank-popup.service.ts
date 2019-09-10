import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {HttpResponse} from '@angular/common/http';
import {DatePipe} from '@angular/common';
import {CleaningReportOilTank} from './cleaning-report-oil-tank.model';
import {CleaningReportOilTankService} from './cleaning-report-oil-tank.service';

@Injectable()
export class CleaningReportOilTankPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private datePipe: DatePipe,
                private modalService: NgbModal,
                private router: Router,
                private cleaningReportOilTankService: CleaningReportOilTankService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.cleaningReportOilTankService.find(id)
                    .subscribe((cleaningReportOilTankResponse: HttpResponse<CleaningReportOilTank>) => {
                        const cleaningReportOilTank: CleaningReportOilTank = cleaningReportOilTankResponse.body;
                        this.ngbModalRef = this.cleaningReportOilTankModalRef(component, cleaningReportOilTank);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.cleaningReportOilTankModalRef(component, new CleaningReportOilTank());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    cleaningReportOilTankModalRef(component: Component, cleaningReportOilTank: CleaningReportOilTank): NgbModalRef {
        const modalRef = this.modalService.open(component, {size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.cleaningReportOilTank = cleaningReportOilTank;
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
