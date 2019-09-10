import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { BankTransactionComponent } from './bank-transaction.component';
import { BankTransactionDetailComponent } from './bank-transaction-detail.component';
import { BankTransactionPopupComponent } from './bank-transaction-dialog.component';
import { BankTransactionDeletePopupComponent } from './bank-transaction-delete-dialog.component';
import {ITEMS_PER_PAGE} from '../../shared/constants/pagination.constants';

@Injectable()
export class BankTransactionResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const size = route.queryParams['size'] ? route.queryParams['size'] : ITEMS_PER_PAGE;
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,desc';
        return {
            page: this.paginationUtil.parsePage(page),
            size: this.paginationUtil.parsePage(size),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const bankTransactionRoute: Routes = [
    {
        path: 'bank-transaction',
        component: BankTransactionComponent,
        resolve: {
            'pagingParams': BankTransactionResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'samtagatewayApp.bankTransaction.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'bank-transaction/:id',
        component: BankTransactionDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'samtagatewayApp.bankTransaction.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bankTransactionPopupRoute: Routes = [
    {
        path: 'bank-transaction-new',
        component: BankTransactionPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'samtagatewayApp.bankTransaction.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bank-transaction/:id/edit',
        component: BankTransactionPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'samtagatewayApp.bankTransaction.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bank-transaction/:id/delete',
        component: BankTransactionDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'samtagatewayApp.bankTransaction.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
