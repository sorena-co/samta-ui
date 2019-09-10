import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {RequestPlungingComponent} from './request-plunging.component';
import {RequestPlungingPopupComponent} from './request-plunging-dialog.component';
import {RequestPlungingDeletePopupComponent} from './request-plunging-delete-dialog.component';

@Injectable()
export class RequestPlungingResolvePagingParams implements Resolve<any> {

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

export const requestPlungingRoute: Routes = [
    {
        path: 'request-plunging',
        component: RequestPlungingComponent,
        resolve: {
            'pagingParams': RequestPlungingResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_REQUEST_PLUNGING'],
            pageTitle: 'samtagatewayApp.requestPlunging.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const requestPlungingPopupRoute: Routes = [
    {
        path: 'request-plunging-new',
        component: RequestPlungingPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_REQUEST_PLUNGING'],
            pageTitle: 'samtagatewayApp.requestPlunging.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'request-plunging/:id/edit',
        component: RequestPlungingPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_REQUEST_PLUNGING'],
            pageTitle: 'samtagatewayApp.requestPlunging.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'request-plunging/:id/delete',
        component: RequestPlungingDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_REQUEST_PLUNGING'],
            pageTitle: 'samtagatewayApp.requestPlunging.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'request-plunging/:id/:view',
        component: RequestPlungingPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_REQUEST_PLUNGING'],
            pageTitle: 'samtagatewayApp.requestPlunging.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
