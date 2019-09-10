import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {JhiPaginationUtil} from 'ng-jhipster';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {OrderCreditComponent} from './order-credit.component';
import {OrderCreditDetailComponent} from './order-credit-detail.component';
import {OrderCreditPopupComponent} from './order-credit-dialog.component';
import {OrderCreditDeletePopupComponent} from './order-credit-delete-dialog.component';

@Injectable()
export class OrderCreditResolvePagingParams implements Resolve<any> {

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

export const orderCreditRoute: Routes = [
    {
        path: 'order-credit',
        component: OrderCreditComponent,
        resolve: {
            'pagingParams': OrderCreditResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'samtagatewayApp.orderCredit.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'order-credit/:id',
        component: OrderCreditDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'samtagatewayApp.orderCredit.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const orderCreditPopupRoute: Routes = [
    {
        path: 'order-credit-new',
        component: OrderCreditPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'samtagatewayApp.orderCredit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'order-credit/:id/edit',
        component: OrderCreditPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'samtagatewayApp.orderCredit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'order-credit/:id/delete',
        component: OrderCreditDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'samtagatewayApp.orderCredit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
