import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CustomerScoreComponent } from './customer-score.component';
import { CustomerScorePopupComponent } from './customer-score-dialog.component';
import { CustomerScoreDeletePopupComponent } from './customer-score-delete-dialog.component';

@Injectable()
export class CustomerScoreResolvePagingParams implements Resolve<any> {

        constructor(private paginationUtil: JhiPaginationUtil) {}

        resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
            const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
            const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,desc';
            return {
                page: this.paginationUtil.parsePage(page),
                predicate: this.paginationUtil.parsePredicate(sort),
                ascending: this.paginationUtil.parseAscending(sort)
            };
        }
    }

export const customerScoreRoute: Routes = [
    {
        path: 'customer/:customerId/customer-score',
        component: CustomerScoreComponent,
        resolve: {
            'pagingParams': CustomerScoreResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_CUSTOMER_SCORE'],
            pageTitle: 'samtagatewayApp.customerScore.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const customerScorePopupRoute: Routes = [
  {
    path: 'customer-score-new/:customerId',
    component: CustomerScorePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN','CREATE_CUSTOMER_SCORE'],
        pageTitle: 'samtagatewayApp.customerScore.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'customer-score/:id/edit',
    component: CustomerScorePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN','EDIT_CUSTOMER_SCORE'],
        pageTitle: 'samtagatewayApp.customerScore.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'customer-score/:id/delete',
    component: CustomerScoreDeletePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN','DELETE_CUSTOMER_SCORE'],
        pageTitle: 'samtagatewayApp.customerScore.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
      path: 'customer-score/:id/:view',
      component: CustomerScorePopupComponent,
      data: {
          authorities: ['ROLE_ADMIN','VIEW_CUSTOMER_SCORE'],
          pageTitle: 'samtagatewayApp.customerScore.home.title'
      },
      canActivate: [UserRouteAccessService],
      outlet: 'popup'
  }
];
