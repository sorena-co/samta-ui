import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import { RefuelCenterComponent } from './refuel-center.component';
import { RefuelCenterPopupComponent } from './refuel-center-dialog.component';
import { RefuelCenterDeletePopupComponent } from './refuel-center-delete-dialog.component';

@Injectable()
export class RefuelCenterResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const size = route.queryParams['size'] ? route.queryParams['size'] : ITEMS_PER_PAGE;
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,desc';
        return {
            size: this.paginationUtil.parsePage(size),
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    }
}

export const refuelCenterRoute: Routes = [
    {
        path: 'refuel-center',
        component: RefuelCenterComponent,
        resolve: {
            'pagingParams': RefuelCenterResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_REFUEL_CENTER'],
            pageTitle: 'niopdcgatewayApp.refuelCenter.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const refuelCenterPopupRoute: Routes = [
    {
        path: 'refuel-center-new',
        component: RefuelCenterPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_REFUEL_CENTER'],
            pageTitle: 'niopdcgatewayApp.refuelCenter.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'refuel-center/:id/edit',
        component: RefuelCenterPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_REFUEL_CENTER'],
            pageTitle: 'niopdcgatewayApp.refuelCenter.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'refuel-center/:id/delete',
        component: RefuelCenterDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_REFUEL_CENTER'],
            pageTitle: 'niopdcgatewayApp.refuelCenter.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'refuel-center/:id/:view',
        component: RefuelCenterPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_REFUEL_CENTER'],
            pageTitle: 'niopdcgatewayApp.refuelCenter.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
