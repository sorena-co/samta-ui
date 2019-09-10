import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {RegionComponent} from './region.component';
import {RegionPopupComponent} from './region-dialog.component';
import {RegionDeletePopupComponent} from './region-delete-dialog.component';
import {RegionFilePopupComponent} from './region-file-dialog.component';

@Injectable()
export class RegionResolvePagingParams implements Resolve<any> {

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

export const regionRoute: Routes = [
    {
        path: 'country/:countryId/region',
        component: RegionComponent,
        resolve: {
            'pagingParams': RegionResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_REGION'],
            pageTitle: 'samtagatewayApp.region.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'country/:countryId/region/:regionId/sub-region',
        component: RegionComponent,
        resolve: {
            'pagingParams': RegionResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_REGION'],
            pageTitle: 'samtagatewayApp.region.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const regionPopupRoute: Routes = [
    {
        path: 'region-new/:parent/:parentId',
        component: RegionPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_REGION'],
            pageTitle: 'samtagatewayApp.region.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'region/:id/edit',
        component: RegionPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_REGION'],
            pageTitle: 'samtagatewayApp.region.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'region/:id/delete',
        component: RegionDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_REGION'],
            pageTitle: 'samtagatewayApp.region.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'region/:id/:view',
        component: RegionPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_REGION'],
            pageTitle: 'samtagatewayApp.region.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'region-excel',
        component: RegionFilePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'REGION_EXCEL'],
            pageTitle: 'samtagatewayApp.region.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
