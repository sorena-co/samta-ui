import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {UserModalService} from './user-modal.service';
import {AccountService, JhiLanguageHelper, User, UserService} from '../../shared';
import {MainAuthority} from '../../entities/main-authority';
import {Role, RoleService} from '../../entities/role';
import {ParentAuthority, ParentAuthorityService} from '../../entities/parent-authority';
import {HttpResponse} from '@angular/common/http';
import {LocationService} from '../../entities/location';
import {Location} from '../../entities/location/location.model';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'jhi-user-mgmt-dialog',
    templateUrl: './user-management-dialog.component.html'
})
export class UserMgmtDialogComponent implements OnInit {
    roleSelected: any[] = [];

    user: User;
    languages: any[];
    authorities: any[];
    isSaving: Boolean;
    isView: boolean;
    parentAuthorities: ParentAuthority[];
    roles: any[];
    groups: any[];
    authorities1: any[];
    denyAuthorities1: any[];
    canAuth: MainAuthority[];
    disabledAuthorities = false;
    adminRole = false;
    currentUserType: any | undefined;
    roleAuthorities: any[];
    denyRoleAuthorities: any[];
    confirmPass = null;

    constructor(public activeModal: NgbActiveModal,
                private languageHelper: JhiLanguageHelper,
                private userService: UserService,
                private translateService: TranslateService,
                private parentAuthorityService: ParentAuthorityService,
                private roleService: RoleService,
                private locationService: LocationService,
                private eventManager: JhiEventManager,
                private accountService: AccountService) {
    }

    ngOnInit() {
        if (this.user.id) {
            if (this.user.authorities && this.user.authorities.length > 0) {
                this.adminRole = this.user.authorities.find(value => value === 'ROLE_ADMIN') === 'ROLE_ADMIN';
                this.authorities1 = this.user.authorities.map((s) => new MainAuthority(s));
            }
            if (this.user.denyAuthorities) {
                this.denyAuthorities1 = this.user.denyAuthorities.map((s) => new MainAuthority(s));
            }
            this.userTypeChange();
        }

        this.accountService.get().subscribe(
            (res: HttpResponse<User>) => {
                this.currentUserType = res.body.userType;
                this.canAuth = res.body.authorities.map((s) => new MainAuthority(s));
            });
        if (this.user.login != null)
            this.locationService.findAllLocationForUserTree(this.user.login).subscribe(
                (res: HttpResponse<Location[]>) => {
                    this.user.locationIds = res.body.map(value => value.id);
                });
        this.parentAuthorityService.query(
            {
                sort: ['persianName,asc']
            }
        ).subscribe(
            (res: HttpResponse<ParentAuthority[]>) => {
                this.parentAuthorities = res.body;
            });


        this.isView = View.isView;
        this.isSaving = false;
        this.languageHelper.getAll().then((languages) => {
            this.languages = languages;
        });
    }

    onChangeRoles() {
        this.user.roles = [];
        for (let i = 0; i < this.roleSelected.length; i++) {
            for (let j = 0; j < this.roles.length; j++) {
                if (this.roleSelected[i] === this.roles[j].id) {
                    this.user.roles[i] = this.roles[j];
                }
            }
        }
        let ids = this.user.roles.filter(value => value.id).map(value => value.id);
        if (ids && ids.length) {
            this.roleService.getAuthority(ids).subscribe(
                (res: HttpResponse<any>) => {
                    this.roleAuthorities = res.body.authorities;
                    this.denyRoleAuthorities = res.body.denyAuthorities;
                });
        }
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        if (this.adminRole) {
            this.user.authorities = [];
            this.user.authorities.push('ROLE_ADMIN');
        }
        this.isSaving = true;
        if (this.user.id !== null) {
            this.userService.update(this.user).subscribe((response) => this.onSaveSuccess(response), () => this.onSaveError());
        } else {
            this.userService.create(this.user).subscribe((response) => this.onSaveSuccess(response), () => this.onSaveError());
        }
    }

    authoritiesSelected(event: MainAuthority[]) {
        this.user.authorities = event.map((s) => s.name).filter(value => this.roleAuthorities == null || this.roleAuthorities.find(value1 => value1.name == value) == null);
    }

    denyAuthoritiesSelected(event: MainAuthority[]) {
        this.user.denyAuthorities = event.map((s) => s.name);
        this.user.denyAuthorities = event.map((s) => s.name).filter(value => this.denyRoleAuthorities == null || this.denyRoleAuthorities.find(value1 => value1.name == value) == null);

    }

    userTypeChange() {
        this.roleService.readListByUserType(this.user.userType, {sort: ['role.name,asc']})
            .subscribe(
                (res: HttpResponse<Role[]>) => {
                    this.roles = res.body;
                    for (let i = 0; i < this.roles.length; i++) {
                        this.roles[i].label = this.roles[i].name + '[' + this.translateService.instant('samtagatewayApp.userType.' + this.roles[i].userType) + ']';
                        this.roles[i].value = this.roles[i].id;
                    }

                    if (this.user.id !== null) {
                        this.roleSelected = [];
                        for (let i = 0; i < this.user.roles.length; i++) {
                            this.roleSelected.push(this.user.roles[i].id);
                        }
                        this.onChangeRoles();
                    }
                });
    }

    private onSaveSuccess(result) {
        this.eventManager.broadcast({name: 'userListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result.body);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-user-dialog',
    template: ''
})
export class UserDialogComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private userModalService: UserModalService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            View.isView = !!params['view'];

            if (params['login']) {
                this.userModalService.open(UserMgmtDialogComponent as Component, params['login']);
            } else {
                this.userModalService.open(UserMgmtDialogComponent as Component);
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
