import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {HttpResponse} from '@angular/common/http';
import {DatePipe} from '@angular/common';
import {ChangeFilterElement} from './change-filter-element.model';
import {ChangeFilterElementService} from './change-filter-element.service';

@Injectable()
export class ChangeFilterElementPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private datePipe: DatePipe,
                private modalService: NgbModal,
                private router: Router,
                private changeFilterElementService: ChangeFilterElementService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, requestFilterElementId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.changeFilterElementService.find(id)
                    .subscribe((changeFilterElementResponse: HttpResponse<ChangeFilterElement>) => {
                        const changeFilterElement: ChangeFilterElement = changeFilterElementResponse.body;
                        this.ngbModalRef = this.changeFilterElementModalRef(component, changeFilterElement);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const changeFilterElement = new ChangeFilterElement();
                    changeFilterElement.requestFilterElementId = requestFilterElementId;
                    this.ngbModalRef = this.changeFilterElementModalRef(component, changeFilterElement);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    changeFilterElementModalRef(component: Component, changeFilterElement: ChangeFilterElement): NgbModalRef {
        const modalRef = this.modalService.open(component, {size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.changeFilterElement = changeFilterElement;
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
