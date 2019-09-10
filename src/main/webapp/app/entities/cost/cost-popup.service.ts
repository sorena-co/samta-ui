import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Cost} from './cost.model';
import {CostService} from './cost.service';

@Injectable()
export class CostPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private modalService: NgbModal,
                private router: Router,
                private costService: CostService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, costGroupId?: number | any, costId?: number): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.costService.find(id).subscribe((cost) => {
                    this.ngbModalRef = this.costModalRef(component, cost.body);
                    resolve(this.ngbModalRef);
                });
            } else if (costGroupId) {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const cost = new Cost();
                    cost.costGroupId = costGroupId;
                    this.ngbModalRef = this.costModalRef(component, cost);
                    resolve(this.ngbModalRef);
                }, 0);
            } else if (costId) {
                setTimeout(() => {
                    const cost = new Cost();
                    cost.parentId = costId;
                    this.ngbModalRef = this.costModalRef(component, cost);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    costModalRef(component: Component, cost: Cost): NgbModalRef {
        const modalRef = this.modalService.open(component, {size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.cost = cost;
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
