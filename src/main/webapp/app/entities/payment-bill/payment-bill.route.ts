import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {JhiPaginationUtil} from 'ng-jhipster';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {PaymentBillComponent} from './payment-bill.component';
import {PaymentBillPopupComponent} from './payment-bill-dialog.component';
import {PaymentBillDeletePopupComponent} from './payment-bill-delete-dialog.component';

@Injectable()
export class PaymentBillResolvePagingParams implements Resolve<any> {

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

export const paymentBillRoute: Routes = [
    {
        path: 'payment-bill',
        component: PaymentBillComponent,
        resolve: {
            'pagingParams': PaymentBillResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'samtagatewayApp.paymentBill.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const paymentBillPopupRoute: Routes = [
    {
        path: 'payment-bill-new',
        component: PaymentBillPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'samtagatewayApp.paymentBill.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'payment-bill/:id/edit',
        component: PaymentBillPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'samtagatewayApp.paymentBill.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'payment-bill/:id/delete',
        component: PaymentBillDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'samtagatewayApp.paymentBill.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
