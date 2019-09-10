import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import { BankTransactionRefComponent } from './bank-transaction-ref.component';
import { BankTransactionRefDetailComponent } from './bank-transaction-ref-detail.component';
import { BankTransactionRefPopupComponent } from './bank-transaction-ref-dialog.component';
import { BankTransactionRefDeletePopupComponent } from './bank-transaction-ref-delete-dialog.component';

@Injectable()
export class BankTransactionRefResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

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

export const bankTransactionRefRoute: Routes = [
    {
        path: 'bank-transaction-ref',
        component: BankTransactionRefComponent,
        resolve: {
            'pagingParams': BankTransactionRefResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'samtagatewayApp.bankTransactionRef.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'bank-transaction-ref/:id',
        component: BankTransactionRefDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'samtagatewayApp.bankTransactionRef.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bankTransactionRefPopupRoute: Routes = [
    {
        path: 'bank-transaction-ref-new',
        component: BankTransactionRefPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'samtagatewayApp.bankTransactionRef.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bank-transaction-ref/:id/edit',
        component: BankTransactionRefPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'samtagatewayApp.bankTransactionRef.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bank-transaction-ref/:id/delete',
        component: BankTransactionRefDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'samtagatewayApp.bankTransactionRef.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
