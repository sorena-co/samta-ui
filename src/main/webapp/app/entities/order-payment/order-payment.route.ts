import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {JhiPaginationUtil} from 'ng-jhipster';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {OrderPaymentComponent} from './order-payment.component';
import {OrderPaymentPopupComponent} from './order-payment-dialog.component';
import {OrderPaymentDeletePopupComponent} from './order-payment-delete-dialog.component';

@Injectable()
export class OrderPaymentResolvePagingParams implements Resolve<any> {

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

export const orderPaymentRoute: Routes = [
    {
        path: 'order-payment',
        component: OrderPaymentComponent,
        resolve: {
            'pagingParams': OrderPaymentResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'niopdcgatewayApp.orderPayment.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const orderPaymentPopupRoute: Routes = [
    {
        path: 'order-payment-new',
        component: OrderPaymentPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'niopdcgatewayApp.orderPayment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'order-payment/:id/edit',
        component: OrderPaymentPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'niopdcgatewayApp.orderPayment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'order-payment/:id/delete',
        component: OrderPaymentDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'niopdcgatewayApp.orderPayment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
