import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { IpFilter } from './ip-filter.model';
import { IpFilterService } from './ip-filter.service';

@Injectable()
export class IpFilterPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private modalService: NgbModal,
    private router: Router,
    private ipFilterService: IpFilterService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, username?: string | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.ipFilterService.find(id)
                    .subscribe((ipFilterResponse: HttpResponse<IpFilter>) => {
                        const ipFilter: IpFilter = ipFilterResponse.body;
                        ipFilter.username = username;
                        this.ngbModalRef = this.ipFilterModalRef(component, ipFilter);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const ipFilter = new IpFilter();
                    ipFilter.username = username;
                    this.ngbModalRef = this.ipFilterModalRef(component, ipFilter);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    ipFilterModalRef(component: Component, ipFilter: IpFilter): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.ipFilter = ipFilter;
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
