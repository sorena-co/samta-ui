import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { CustomerDeactiveRule } from './customer-deactive-rule.model';
import { CustomerDeactiveRuleService } from './customer-deactive-rule.service';

@Injectable()
export class CustomerDeactiveRulePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private router: Router,
    private customerDeactiveRuleService: CustomerDeactiveRuleService

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
                this.customerDeactiveRuleService.find(id).subscribe((customerDeactiveRule) => {
                    this.ngbModalRef = this.customerDeactiveRuleModalRef(component, customerDeactiveRule.body);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const customerDeactiveRule = new CustomerDeactiveRule();
                    this.ngbModalRef = this.customerDeactiveRuleModalRef(component, customerDeactiveRule);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    customerDeactiveRuleModalRef(component: Component, customerDeactiveRule: CustomerDeactiveRule): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.customerDeactiveRule = customerDeactiveRule;
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
