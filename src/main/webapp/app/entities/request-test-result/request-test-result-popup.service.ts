import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { RequestTestResult } from './request-test-result.model';
import { RequestTestResultService } from './request-test-result.service';

@Injectable()
export class RequestTestResultPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private router: Router,
    private requestTestResultService: RequestTestResultService

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
                this.requestTestResultService.find(id).subscribe((requestTestResult) => {
                    this.ngbModalRef = this.requestTestResultModalRef(component, requestTestResult.body);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.requestTestResultModalRef(component, new RequestTestResult());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    requestTestResultModalRef(component: Component, requestTestResult: RequestTestResult): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.requestTestResult = requestTestResult;
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
