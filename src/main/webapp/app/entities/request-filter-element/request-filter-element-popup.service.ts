import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import {RequestFilterElement} from './request-filter-element.model';
import {RequestFilterElementService} from './request-filter-element.service';

@Injectable()
export class RequestFilterElementPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private datePipe: DatePipe,
                private modalService: NgbModal,
                private router: Router,
                private requestFilterElementService: RequestFilterElementService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.requestFilterElementService.find(id).subscribe((requestFilterElement) => {
                    this.ngbModalRef = this.requestFilterElementModalRef(component, requestFilterElement.body);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.requestFilterElementModalRef(component, new RequestFilterElement());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    requestFilterElementModalRef(component: Component, requestFilterElement: RequestFilterElement): NgbModalRef {
        const modalRef = this.modalService.open(component, {size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.requestFilterElement = requestFilterElement;
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
