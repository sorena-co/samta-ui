import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {JhiPaginationUtil} from 'ng-jhipster';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {LocationComponent} from './location.component';
import {LocationPopupComponent} from './location-dialog.component';
import {LocationDeletePopupComponent} from './location-delete-dialog.component';
import {LocationOpenPopupComponent} from './location-open-dialog.component';
import {LocationClosePopupComponent} from './location-close-dialog.component';

@Injectable()
export class LocationResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const size = route.queryParams['size'] ? route.queryParams['size'] : ITEMS_PER_PAGE;
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'name,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            size: this.paginationUtil.parsePage(size),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    }
}

export const locationRoute: Routes = [
    {
        path: 'location',
        component: LocationComponent,
        resolve: {
            'pagingParams': LocationResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_LOCATION'],
            pageTitle: 'samtagatewayApp.location.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'location/:locationId/sub-locations',
        component: LocationComponent,
        resolve: {
            'pagingParams': LocationResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_LOCATION'],
            pageTitle: 'samtagatewayApp.location.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const locationPopupRoute: Routes = [
    {
        path: 'location-new/:locationId',
        component: LocationPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_LOCATION'],
            pageTitle: 'samtagatewayApp.location.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'location/:id/edit',
        component: LocationPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_LOCATION'],
            pageTitle: 'samtagatewayApp.location.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'location/:id/delete',
        component: LocationDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_LOCATION'],
            pageTitle: 'samtagatewayApp.location.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'location/:id/open',
        component: LocationOpenPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'OPEN_LOCATION'],
            pageTitle: 'samtagatewayApp.location.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'location/:id/close',
        component: LocationClosePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CLOSE_LOCATION'],
            pageTitle: 'samtagatewayApp.location.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'location/:id/:view',
        component: LocationPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_LOCATION'],
            pageTitle: 'samtagatewayApp.location.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
