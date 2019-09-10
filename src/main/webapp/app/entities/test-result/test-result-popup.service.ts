import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { TestResult } from './test-result.model';
import { TestResultService } from './test-result.service';

@Injectable()
export class TestResultPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private modalService: NgbModal,
    private router: Router,
    private testResultService: TestResultService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, requestTestResultId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.testResultService.find(id)
                    .subscribe((testResultResponse: HttpResponse<TestResult>) => {
                        const testResult: TestResult = testResultResponse.body;
                        this.ngbModalRef = this.testResultModalRef(component, testResult);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const testResult = new TestResult();
                    testResult.requestTestResultId = requestTestResultId;
                    this.ngbModalRef = this.testResultModalRef(component, testResult);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    testResultModalRef(component: Component, testResult: TestResult): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.testResult = testResult;
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
