import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { LiteratureVolumeOilTank } from './literature-volume-oil-tank.model';
import { LiteratureVolumeOilTankService } from './literature-volume-oil-tank.service';

@Injectable()
export class LiteratureVolumeOilTankPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private modalService: NgbModal,
    private router: Router,
    private literatureVolumeOilTankService: LiteratureVolumeOilTankService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, oilTankId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.literatureVolumeOilTankService.find(id)
                    .subscribe((literatureVolumeOilTankResponse: HttpResponse<LiteratureVolumeOilTank>) => {
                        const literatureVolumeOilTank: LiteratureVolumeOilTank = literatureVolumeOilTankResponse.body;
                        this.ngbModalRef = this.literatureVolumeOilTankModalRef(component, literatureVolumeOilTank);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const literatureVolumeOilTank = new LiteratureVolumeOilTank();
                    literatureVolumeOilTank.oilTankId = oilTankId;
                    this.ngbModalRef = this.literatureVolumeOilTankModalRef(component, literatureVolumeOilTank);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    literatureVolumeOilTankModalRef(component: Component, literatureVolumeOilTank: LiteratureVolumeOilTank): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.literatureVolumeOilTank = literatureVolumeOilTank;
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
