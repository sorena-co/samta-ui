import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Role } from './role.model';
import { RolePopupService } from './role-popup.service';
import { RoleService } from './role.service';
import { MainAuthority } from '../main-authority';
import { ParentAuthorityService, ParentAuthority } from '../parent-authority';
import { User } from '../../shared';
import { AccountService } from '../../shared';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
    selector: 'jhi-role-dialog',
    templateUrl: './role-dialog.component.html'
})
export class RoleDialogComponent implements OnInit {
    parentAuthorities: ParentAuthority[];

    role: Role;
    authorities1: any[];
    denyAuthorities1: any[];
    isSaving: boolean;
    isView: boolean;

    canAuth: MainAuthority[];
    currentUserType: any;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private roleService: RoleService,
        private parentAuthorityService: ParentAuthorityService,
        private eventManager: JhiEventManager,
        private accountService: AccountService
    ) {
    }

    ngOnInit() {
        if (this.role.id) {
            this.authorities1 = this.role.authorities;
            this.denyAuthorities1 = this.role.denyAuthorities;
        }
        this.isView = View.isView;
        this.isSaving = false;
        this.accountService.get().subscribe(
            (res: HttpResponse<User>) => {
                this.canAuth = res.body.authorities.map((s) => new MainAuthority(s));
            });
        this.parentAuthorityService.query(
            {
                sort: ['persianName,asc']
            }
        ).subscribe(
            (res: HttpResponse<ParentAuthority[]>) => {
                this.parentAuthorities = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));

        this.accountService.get().subscribe(
            (res: HttpResponse<User>) => {
                this.currentUserType = res.body.userType;
                this.canAuth = res.body.authorities.map((s) => new MainAuthority(s));
            });
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.role.id !== undefined) {
            this.roleService.update(this.role)
                .subscribe((res: HttpResponse<Role>) =>
                    this.onSaveSuccess(res.body), (res: Response) => this.onSaveError(res));
        } else {
            this.roleService.create(this.role)
                .subscribe((res: HttpResponse<Role>) =>
                    this.onSaveSuccess(res.body), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(result: Role) {
        this.eventManager.broadcast({name: 'roleListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    authoritiesSelected(event) {
        this.role.authorities = event;
    }

    denyAuthoritiesSelected(event) {
        this.role.denyAuthorities = event;
    }

}

@Component({
    selector: 'jhi-role-popup',
    template: ''
})
export class RolePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rolePopupService: RolePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            View.isView = !!params['view'];
            if ( params['id'] ) {
                this.rolePopupService
                    .open(RoleDialogComponent as Component, params['id']);
            } else {
                this.rolePopupService
                    .open(RoleDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
class View {
    static isView: boolean;
}
