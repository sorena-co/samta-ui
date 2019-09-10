import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {CostGroupComponent} from './cost-group.component';
import {CostGroupPopupComponent} from './cost-group-dialog.component';
import {CostGroupDeletePopupComponent} from './cost-group-delete-dialog.component';

@Injectable()
export class CostGroupResolvePagingParams implements Resolve<any> {

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

export const costGroupRoute: Routes = [
    {
        path: 'cost-group',
        component: CostGroupComponent,
        resolve: {
            'pagingParams': CostGroupResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_COST_GROUP'],
            pageTitle: 'samtagatewayApp.costGroup.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const costGroupPopupRoute: Routes = [
    {
        path: 'cost-group-new',
        component: CostGroupPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_COST_GROUP'],
            pageTitle: 'samtagatewayApp.costGroup.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cost-group/:id/edit',
        component: CostGroupPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_COST_GROUP'],
            pageTitle: 'samtagatewayApp.costGroup.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cost-group/:id/delete',
        component: CostGroupDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_COST_GROUP'],
            pageTitle: 'samtagatewayApp.costGroup.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cost-group/:id/:view',
        component: CostGroupPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_COST_GROUP'],
            pageTitle: 'samtagatewayApp.costGroup.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
