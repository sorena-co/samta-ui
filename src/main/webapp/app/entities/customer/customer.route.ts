import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {CustomerComponent} from './customer.component';
import {CustomerPopupComponent} from './customer-dialog.component';
import {CustomerDeletePopupComponent} from './customer-delete-dialog.component';
import {BoundaryCustomerComponent} from "./boundary-customer.component";
import {BoundaryPopupComponent} from './boundary-dialog.component';

@Injectable()
export class CustomerResolvePagingParams implements Resolve<any> {

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

export const customerRoute: Routes = [
    {
        path: 'customer',
        component: CustomerComponent,
        resolve: {
            'pagingParams': CustomerResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_CUSTOMER'],
            pageTitle: 'samtagatewayApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'sell-contract/:sellContractId/customer',
        component: CustomerComponent,
        resolve: {
            'pagingParams': CustomerResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_CUSTOMER'],
            pageTitle: 'samtagatewayApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'boundary-customer',
        component: BoundaryCustomerComponent,
        resolve: {
            'pagingParams': CustomerResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_BOUNDARY_CUSTOMER'],
            pageTitle: 'samtagatewayApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const customerPopupRoute: Routes = [
    {
        path: 'customer-new',
        component: CustomerPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_CUSTOMER'],
            pageTitle: 'samtagatewayApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },{
        path: 'boundary-customer-new',
        component: BoundaryPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_BOUNDARY_CUSTOMER'],
            pageTitle: 'samtagatewayApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'customer/:id/edit',
        component: CustomerPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_CUSTOMER'],
            pageTitle: 'samtagatewayApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'boundary-customer/:id/edit',
        component: BoundaryPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_BOUNDARY_CUSTOMER'],
            pageTitle: 'samtagatewayApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'customer/:id/delete',
        component: CustomerDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_CUSTOMER'],
            pageTitle: 'samtagatewayApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'boundary-customer/:id/delete',
        component: CustomerDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_BOUNDARY_CUSTOMER'],
            pageTitle: 'samtagatewayApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'customer/:id/:view',
        component: CustomerPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_CUSTOMER'],
            pageTitle: 'samtagatewayApp.customer.home.title',
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'boundary-customer/:id/:view',
        component: BoundaryPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_BOUNDARY_CUSTOMER'],
            pageTitle: 'samtagatewayApp.customer.home.title',
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
