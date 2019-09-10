import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {JhiPaginationUtil} from 'ng-jhipster';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {PaymentComponent} from './payment.component';
import {PaymentPopupComponent} from './payment-dialog.component';
import {PaymentDeletePopupComponent} from './payment-delete-dialog.component';
import {EPaymentPageComponent} from './e-payment-page.component';
import {NewsDeletePopupComponent} from "../news/news-delete-dialog.component";

@Injectable()
export class PaymentResolvePagingParams implements Resolve<any> {

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

export const paymentRoute: Routes = [
    {
        path: 'payment',
        component: PaymentComponent,
        resolve: {
            'pagingParams': PaymentResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_PAYMENT'],
            pageTitle: 'niopdcgatewayApp.payment.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'e-payment/:identifier',
        component: EPaymentPageComponent,
        resolve: {
            'pagingParams': PaymentResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'PAY_ELECTRONIC_PAYMENT'],
            pageTitle: 'niopdcgatewayApp.payment.electronic.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const paymentPopupRoute: Routes = [
    {
        path: 'payment-new',
        component: PaymentPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN','CREATE_PAYMENT'],
            pageTitle: 'niopdcgatewayApp.payment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'payment/:id/view',
        component: PaymentPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN','VIEW_PAYMENT'],
            pageTitle: 'niopdcgatewayApp.payment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'payment/:id/delete',
        component: PaymentDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_PAYMENT'],
            pageTitle: 'niopdcgatewayApp.payment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
