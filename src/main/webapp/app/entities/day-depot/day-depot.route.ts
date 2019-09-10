import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {DayDepotComponent} from './day-depot.component';
import {DayDepotPopupComponent} from './day-depot-dialog.component';
import {DayDepotDeletePopupComponent} from './day-depot-delete-dialog.component';
import {MainDayDepotClosePopupComponent} from "../main-day-depot/main-day-depot-close-dialog.component";
import {FullEndMeasurementPopupComponent} from "./full-end-measurement-dialog.component";

@Injectable()
export class DayDepotResolvePagingParams implements Resolve<any> {

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

export const dayDepotRoute: Routes = [
    {
        path: 'main-day-depot/:mainDayDepotId/day-depot',
        component: DayDepotComponent,
        resolve: {
            'pagingParams': DayDepotResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_DAY_DEPOT'],
            pageTitle: 'niopdcgatewayApp.dayDepot.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'main-day-operation/:mainDayOperationId/day-depot',
        component: DayDepotComponent,
        resolve: {
            'pagingParams': DayDepotResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_DAY_DEPOT'],
            pageTitle: 'niopdcgatewayApp.dayDepot.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const dayDepotPopupRoute: Routes = [
    {
        path: 'day-depot/full-end-measurement/:id',
        component: FullEndMeasurementPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CLOSE_MAIN_DAY_DEPOT'],
            pageTitle: 'niopdcgatewayApp.mainDayDepot.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'day-depot/:id/edit',
        component: DayDepotPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_DAY_DEPOT'],
            pageTitle: 'niopdcgatewayApp.dayDepot.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'day-depot/:id/delete',
        component: DayDepotDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_DAY_DEPOT'],
            pageTitle: 'niopdcgatewayApp.dayDepot.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'day-depot/:id/:view',
        component: DayDepotPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_DAY_DEPOT'],
            pageTitle: 'niopdcgatewayApp.dayDepot.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },

];
