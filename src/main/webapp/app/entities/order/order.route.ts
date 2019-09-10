import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {JhiPaginationUtil} from 'ng-jhipster';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {OrderComponent} from './order.component';
import {OrderDialogComponent, OrderPopupComponent} from './order-dialog.component';
import {OrderDeletePopupComponent} from './order-delete-dialog.component';
import {OrderCreditNotDepositedComponent} from './order-credit-not-deposited-component';
import {OrderConfirmPopupComponent} from './order-confirm-dialog.component';
import {ConnectDepotComponent} from './connect-depot.component';
import {BoundarySellDialogComponent} from './boundary-sell-dialog.component';
import {OrderReportComponent} from './order-report.component';
import {BoundaryComponent} from './boundary.component';
import {OrderRevocationPopupComponent} from "./order-revocation-dialog.component";
import {
    OrderRevertConfirmDialogComponent,
    OrderRevertConfirmPopupComponent
} from "./order-revert-confirm-dialog.component";

@Injectable()
export class OrderResolvePagingParams implements Resolve<any> {

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

export const orderRoute: Routes = [
    {
        path: 'order/credit-not-deposited',
        component: OrderCreditNotDepositedComponent,
        resolve: {
            'pagingParams': OrderResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_ORDER'],
            pageTitle: 'samtagatewayApp.order.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'boundary-sell',
        component: BoundaryComponent,
        resolve: {
            'pagingParams': OrderResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_BOUNDARY_SELL'],
            pageTitle: 'samtagatewayApp.order.home.boundarySell'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'order/:mode',
        component: OrderComponent,
        resolve: {
            'pagingParams': OrderResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_ORDER'],
            pageTitle: 'samtagatewayApp.order.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'boundary-sell/new/:mode',
        component: BoundarySellDialogComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_BOUNDARY_SELL'],
            pageTitle: 'samtagatewayApp.order.home.boundarySell'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'boundary-sell/:orderId/edit/:mode/:activeIndex',
        component: BoundarySellDialogComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_BOUNDARY_SELL'],
            pageTitle: 'samtagatewayApp.order.home.boundarySell'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'order/order-new/:mode',
        component: OrderDialogComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_ORDER'],
            pageTitle: 'samtagatewayApp.order.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'connect-depot',
        component: ConnectDepotComponent,
        data: {
            // todo add auth
            authorities: ['ROLE_ADMIN', 'CONNECT_DEPOT_DOWNLOAD', 'CONNECT_DEPOT_UPLOAD'],
            pageTitle: 'samtagatewayApp.order.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'order/:mode/:id/edit/:activeIndex',
        component: OrderDialogComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_ORDER'],
            pageTitle: 'samtagatewayApp.order.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'order/:mode/:id/print',
        component: OrderReportComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'PRINT_ORDER','PRINT_AGAIN_ORDER'],
            pageTitle: 'samtagatewayApp.order.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const orderPopupRoute: Routes = [
    {
        path: 'order/confirm/:id',
        component: OrderConfirmPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CONFIRM_ORDER'],
            pageTitle: 'samtagatewayApp.order.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }, {
        path: 'order/revert-confirm/:id',
        component: OrderRevertConfirmPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CONFIRM_ORDER'],
            pageTitle: 'samtagatewayApp.order.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    /*{
    path: 'order-new',
    component: OrderPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN','CREATE_ORDER'],
        pageTitle: 'samtagatewayApp.order.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'order/:id/edit',
    component: OrderPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN','EDIT_ORDER'],
        pageTitle: 'samtagatewayApp.order.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },*/
    {
        path: 'order/:id/delete',
        component: OrderDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_ORDER'],
            pageTitle: 'samtagatewayApp.order.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },{
        path: 'order/:id/revocation',
        component: OrderRevocationPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'REVOCATION_ORDER'],
            pageTitle: 'samtagatewayApp.order.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'order/:id/:view',
        component: OrderPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_ORDER'],
            pageTitle: 'samtagatewayApp.order.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
