import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import { ChangeContainerComponent } from './change-container.component';
import { ChangeContainerPopupComponent } from './change-container-dialog.component';
import { ChangeContainerDeletePopupComponent } from './change-container-delete-dialog.component';

@Injectable()
export class ChangeContainerResolvePagingParams implements Resolve<any> {

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

export const changeContainerRoute: Routes = [
    {
        path: 'main-day-depot/:mainDayDepotId/day-depot-container/:dayDepotContainerId/change-container',
        component: ChangeContainerComponent,
        resolve: {
            'pagingParams': ChangeContainerResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_CHANGE_CONTAINER'],
            pageTitle: 'samtagatewayApp.changeContainer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'main-day-depot/:mainDayDepotId/day-depot/:dayDepotId/change-container',
        component: ChangeContainerComponent,
        resolve: {
            'pagingParams': ChangeContainerResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_CHANGE_CONTAINER'],
            pageTitle: 'samtagatewayApp.changeContainer.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'main-day-operation/:mainDayOperationId/day-depot-container/:dayDepotContainerId/change-container',
        component: ChangeContainerComponent,
        resolve: {
            'pagingParams': ChangeContainerResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_CHANGE_CONTAINER'],
            pageTitle: 'samtagatewayApp.changeContainer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'main-day-operation/:mainDayOperationId/day-depot/:dayDepotId/change-container',
        component: ChangeContainerComponent,
        resolve: {
            'pagingParams': ChangeContainerResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_CHANGE_CONTAINER'],
            pageTitle: 'samtagatewayApp.changeContainer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const changeContainerPopupRoute: Routes = [
    {
        path: 'change-container-new/day-depot-container/:dayDepotContainerId',
        component: ChangeContainerPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_CHANGE_CONTAINER'],
            pageTitle: 'samtagatewayApp.changeContainer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'change-container-new/day-depot/:dayDepotId',
        component: ChangeContainerPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_CHANGE_CONTAINER'],
            pageTitle: 'samtagatewayApp.changeContainer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'change-container/:id/:parent/:parent-id/edit',
        component: ChangeContainerPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_CHANGE_CONTAINER'],
            pageTitle: 'samtagatewayApp.changeContainer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'change-container/:id/delete',
        component: ChangeContainerDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_CHANGE_CONTAINER'],
            pageTitle: 'samtagatewayApp.changeContainer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'change-container/:id/:parent/:parent-id/:view',
        component: ChangeContainerPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_CHANGE_CONTAINER'],
            pageTitle: 'samtagatewayApp.changeContainer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
