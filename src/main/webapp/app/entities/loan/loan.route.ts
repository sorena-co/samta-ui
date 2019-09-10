import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { ITEMS_PER_PAGE, UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { LoanComponent } from './loan.component';
import { LoanPopupComponent } from './loan-dialog.component';
import { LoanDeletePopupComponent } from './loan-delete-dialog.component';

@Injectable()
export class LoanResolvePagingParams implements Resolve<any> {

        constructor(private paginationUtil: JhiPaginationUtil) {}

        resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
            const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
            const size = route.queryParams['size'] ? route.queryParams['size'] : ITEMS_PER_PAGE;
            const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
            return {
                page: this.paginationUtil.parsePage(page),
                size: this.paginationUtil.parsePage(size),
                predicate: this.paginationUtil.parsePredicate(sort),
                ascending: this.paginationUtil.parseAscending(sort)
            };
        }
    }

export const loanRoute: Routes = [
    {
        path: 'loan',
        component: LoanComponent,
        resolve: {
            'pagingParams': LoanResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_LOAN'],
            pageTitle: 'samtagatewayApp.loan.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const loanPopupRoute: Routes = [
  {
    path: 'loan-new',
    component: LoanPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN','CREATE_LOAN'],
        pageTitle: 'samtagatewayApp.loan.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'loan/:id/edit',
    component: LoanPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN','EDIT_LOAN'],
        pageTitle: 'samtagatewayApp.loan.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'loan/:id/delete',
    component: LoanDeletePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN','DELETE_LOAN'],
        pageTitle: 'samtagatewayApp.loan.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
      path: 'loan/:id/:view',
      component: LoanPopupComponent,
      data: {
          authorities: ['ROLE_ADMIN','VIEW_LOAN'],
          pageTitle: 'samtagatewayApp.loan.home.title'
      },
      canActivate: [UserRouteAccessService],
      outlet: 'popup'
  }
];
