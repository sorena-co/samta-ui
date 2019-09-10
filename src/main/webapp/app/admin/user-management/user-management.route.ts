import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { JhiPaginationUtil } from 'ng-jhipster';

import { UserMgmtComponent } from './user-management.component';
import { UserDialogComponent } from './user-management-dialog.component';
import { UserDeleteDialogComponent } from './user-management-delete-dialog.component';

import {ITEMS_PER_PAGE, Principal, UserRouteAccessService} from '../../shared';

@Injectable()
export class UserResolve implements CanActivate {

    constructor(private principal: Principal) { }

    canActivate() {
        return this.principal.identity().then((account) => this.principal.hasAnyAuthority(['ROLE_ADMIN']));
    }
}

@Injectable()
export class UserResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const size = route.queryParams['size'] ? route.queryParams['size'] : ITEMS_PER_PAGE;
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'login,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            size: this.paginationUtil.parsePage(size),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    }
}

export const userMgmtRoute: Routes = [
    {
        path: 'user-management',
        component: UserMgmtComponent,
        resolve: {
            'pagingParams': UserResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_USER'],
            pageTitle: 'userManagement.home.title'
        },
        canActivate: [UserRouteAccessService]

    }
];

export const userDialogRoute: Routes = [
    {
        path: 'user-management-new',
        component: UserDialogComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_USER'],
            pageTitle: 'userManagement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-management/:login/edit',
        component: UserDialogComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_USER'],
            pageTitle: 'userManagement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-management/:login/delete',
        component: UserDeleteDialogComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_USER'],
            pageTitle: 'userManagement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-management/:login/:view',
        component: UserDialogComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_USER'],
            pageTitle: 'userManagement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
