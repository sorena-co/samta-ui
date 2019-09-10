import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {MainDayOperationComponent} from './main-day-operation.component';
import {MainDayOperationPopupComponent} from './main-day-operation-dialog.component';
import {MainDayOperationDeletePopupComponent} from './main-day-operation-delete-dialog.component';
import {MainDayOperationClosePopupComponent} from './main-day-operation-close-dialog.component';
import {MainDayOperationUpdatePopupComponent} from './main-day-operation-update-dialog.component';
import {MainDayOperationOpenPopupComponent} from "./main-day-operation-open-dialog.component";

@Injectable()
export class MainDayOperationResolvePagingParams implements Resolve<any> {

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

export const mainDayOperationRoute: Routes = [
    {
        path: 'main-day-operation',
        component: MainDayOperationComponent,
        resolve: {
            'pagingParams': MainDayOperationResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_MAIN_DAY_OPERATION'],
            pageTitle: 'niopdcgatewayApp.mainDayOperation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const mainDayOperationPopupRoute: Routes = [
    {
        path: 'main-day-operation-new',
        component: MainDayOperationPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_MAIN_DAY_OPERATION'],
            pageTitle: 'niopdcgatewayApp.mainDayOperation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'main-day-operation/:id/edit',
        component: MainDayOperationPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_MAIN_DAY_OPERATION'],
            pageTitle: 'niopdcgatewayApp.mainDayOperation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'main-day-operation/:id/delete',
        component: MainDayOperationDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_MAIN_DAY_OPERATION'],
            pageTitle: 'niopdcgatewayApp.mainDayOperation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'main-day-operation/:id/close',
        component: MainDayOperationClosePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CLOSE_MAIN_DAY_OPERATION'],
            pageTitle: 'niopdcgatewayApp.mainDayOperation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'main-day-operation/:id/update',
        component: MainDayOperationUpdatePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'UPDATE_MAIN_DAY_OPERATION'],
            pageTitle: 'niopdcgatewayApp.mainDayDepot.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'main-day-operation/:id/open',
        component: MainDayOperationOpenPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'OPEN_MAIN_DAY_OPERATION'],
            pageTitle: 'niopdcgatewayApp.mainDayDepot.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'main-day-operation/:id/:view',
        component: MainDayOperationPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_MAIN_DAY_OPERATION'],
            pageTitle: 'niopdcgatewayApp.mainDayOperation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
