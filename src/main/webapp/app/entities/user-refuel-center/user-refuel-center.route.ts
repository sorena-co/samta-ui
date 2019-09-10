import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {JhiPaginationUtil} from 'ng-jhipster';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {UserRefuelCenterComponent} from './user-refuel-center.component';
import {UserRefuelCenterDetailComponent} from './user-refuel-center-detail.component';
import {UserRefuelCenterPopupComponent} from './user-refuel-center-dialog.component';
import {UserRefuelCenterDeletePopupComponent} from './user-refuel-center-delete-dialog.component';

@Injectable()
export class UserRefuelCenterResolvePagingParams implements Resolve<any> {

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

export const userRefuelCenterRoute: Routes = [
    {
        path: 'user-refuel-center',
        component: UserRefuelCenterComponent,
        resolve: {
            'pagingParams': UserRefuelCenterResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'samtagatewayApp.userRefuelCenter.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'user-refuel-center/:id',
        component: UserRefuelCenterDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'samtagatewayApp.userRefuelCenter.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userRefuelCenterPopupRoute: Routes = [
    {
        path: 'user-refuel-center-new/:username',
        component: UserRefuelCenterPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_REFUEL_CENTER_USER'],
            pageTitle: 'samtagatewayApp.userRefuelCenter.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-refuel-center/:id/edit',
        component: UserRefuelCenterPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'samtagatewayApp.userRefuelCenter.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-refuel-center/:id/delete',
        component: UserRefuelCenterDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'samtagatewayApp.userRefuelCenter.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
