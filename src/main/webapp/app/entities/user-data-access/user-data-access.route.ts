import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {UserDataAccessComponent} from './user-data-access.component';
import {UserDataAccessPopupComponent} from './user-data-access-dialog.component';
import {UserDataAccessDeletePopupComponent} from './user-data-access-delete-dialog.component';

@Injectable()
export class UserDataAccessResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const size = route.queryParams['size'] ? route.queryParams['size'] : ITEMS_PER_PAGE;
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,desc';
        return {
            page: this.paginationUtil.parsePage(page),
            size: this.paginationUtil.parsePage(size),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    }
}

export const userDataAccessRoute: Routes = [
    {
        path: 'user-management/:username/user-data-access',
        component: UserDataAccessComponent,
        resolve: {
            'pagingParams': UserDataAccessResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_USER_DATA_ACCESS'],
            pageTitle: 'samtagatewayApp.userDataAccess.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userDataAccessPopupRoute: Routes = [
    {
        path: 'user-data-access-new/:username',
        component: UserDataAccessPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_USER_DATA_ACCESS'],
            pageTitle: 'samtagatewayApp.userDataAccess.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-data-access/:id/edit',
        component: UserDataAccessPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_USER_DATA_ACCESS'],
            pageTitle: 'samtagatewayApp.userDataAccess.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-data-access/:id/delete',
        component: UserDataAccessDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_USER_DATA_ACCESS'],
            pageTitle: 'samtagatewayApp.userDataAccess.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-data-access/:id/:view',
        component: UserDataAccessPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_USER_DATA_ACCESS'],
            pageTitle: 'samtagatewayApp.userDataAccess.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
