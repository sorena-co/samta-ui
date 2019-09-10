import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { LoanPaymentComponent } from './loan-payment.component';
import { LoanPaymentDetailComponent } from './loan-payment-detail.component';
import { LoanPaymentPopupComponent } from './loan-payment-dialog.component';
import { LoanPaymentDeletePopupComponent } from './loan-payment-delete-dialog.component';

@Injectable()
export class LoanPaymentResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const loanPaymentRoute: Routes = [
    {
        path: 'loan-payment',
        component: LoanPaymentComponent,
        resolve: {
            'pagingParams': LoanPaymentResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'niopdcgatewayApp.loanPayment.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'loan-payment/:id',
        component: LoanPaymentDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'niopdcgatewayApp.loanPayment.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const loanPaymentPopupRoute: Routes = [
    {
        path: 'loan-payment-new',
        component: LoanPaymentPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'niopdcgatewayApp.loanPayment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'loan-payment/:id/edit',
        component: LoanPaymentPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'niopdcgatewayApp.loanPayment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'loan-payment/:id/delete',
        component: LoanPaymentDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'niopdcgatewayApp.loanPayment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
