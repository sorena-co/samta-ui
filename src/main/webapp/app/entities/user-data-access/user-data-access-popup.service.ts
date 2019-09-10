import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { UserDataAccess } from './user-data-access.model';
import { UserDataAccessService } from './user-data-access.service';

@Injectable()
export class UserDataAccessPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private modalService: NgbModal,
    private router: Router,
    private userDataAccessService: UserDataAccessService

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
                this.userDataAccessService.find(id)
                    .subscribe((userDataAccessResponse: HttpResponse<UserDataAccess>) => {
                        const userDataAccess: UserDataAccess = userDataAccessResponse.body;
                        this.ngbModalRef = this.userDataAccessModalRef(component, userDataAccess);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const userDataAccess = new UserDataAccess();
                    userDataAccess.username = username;
                    this.ngbModalRef = this.userDataAccessModalRef(component, userDataAccess);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    userDataAccessModalRef(component: Component, userDataAccess: UserDataAccess): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.userDataAccess = userDataAccess;
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
