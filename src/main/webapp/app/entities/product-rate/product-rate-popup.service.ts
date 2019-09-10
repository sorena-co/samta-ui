import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import {ProductRate} from './product-rate.model';
import {ProductRateService} from './product-rate.service';

@Injectable()
export class ProductRatePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private datePipe: DatePipe,
                private modalService: NgbModal,
                private router: Router,
                private productRateService: ProductRateService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, productId?: number | any, containerId?: number): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.productRateService.find(id).subscribe((productRate) => {
                    this.ngbModalRef = this.productRateModalRef(component, productRate.body);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const productRate = new ProductRate();
                    if (productId) {
                        productRate.productId = productId;
                    } else if (containerId) {
                        productRate.containerId = containerId;
                    }
                    this.ngbModalRef = this.productRateModalRef(component, productRate);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    productRateModalRef(component: Component, productRate: ProductRate): NgbModalRef {
        const modalRef = this.modalService.open(component, {size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.productRate = productRate;
        modalRef.result.then((result) => {
            this.router.navigate([{outlets: {popup: null}}], {replaceUrl: true});
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{outlets: {popup: null}}], {replaceUrl: true});
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
