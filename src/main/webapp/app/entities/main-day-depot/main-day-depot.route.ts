import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {MainDayDepotComponent} from './main-day-depot.component';
import {MainDayDepotPopupComponent} from './main-day-depot-dialog.component';
import {MainDayDepotDeletePopupComponent} from './main-day-depot-delete-dialog.component';
import {MainDayDepotClosePopupComponent} from './main-day-depot-close-dialog.component';
import {MainDayDepotUpdatePopupComponent} from './main-day-depot-update-dialog.component';
import {MainDayDepotOpenPopupComponent} from './main-day-depot-open-dialog.component';

@Injectable()
export class MainDayDepotResolvePagingParams implements Resolve<any> {

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

export const mainDayDepotRoute: Routes = [
    {
        path: 'main-day-depot',
        component: MainDayDepotComponent,
        resolve: {
            'pagingParams': MainDayDepotResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_MAIN_DAY_DEPOT'],
            pageTitle: 'samtagatewayApp.mainDayDepot.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const mainDayDepotPopupRoute: Routes = [
    {
        path: 'main-day-depot-new',
        component: MainDayDepotPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_MAIN_DAY_DEPOT'],
            pageTitle: 'samtagatewayApp.mainDayDepot.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'main-day-depot/:id/edit',
        component: MainDayDepotPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_MAIN_DAY_DEPOT'],
            pageTitle: 'samtagatewayApp.mainDayDepot.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'main-day-depot/:id/delete',
        component: MainDayDepotDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_MAIN_DAY_DEPOT'],
            pageTitle: 'samtagatewayApp.mainDayDepot.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'main-day-depot/:id/close',
        component: MainDayDepotClosePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CLOSE_MAIN_DAY_DEPOT'],
            pageTitle: 'samtagatewayApp.mainDayDepot.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'main-day-depot/:id/update',
        component: MainDayDepotUpdatePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'UPDATE_MAIN_DAY_DEPOT'],
            pageTitle: 'samtagatewayApp.mainDayDepot.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'main-day-depot/:id/open',
        component: MainDayDepotOpenPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'OPEN_MAIN_DAY_DEPOT'],
            pageTitle: 'samtagatewayApp.mainDayDepot.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'main-day-depot/:id/:view',
        component: MainDayDepotPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_MAIN_DAY_DEPOT'],
            pageTitle: 'samtagatewayApp.mainDayDepot.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
