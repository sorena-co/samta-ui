import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CustomerDeactiveRuleComponent } from './customer-deactive-rule.component';
import { CustomerDeactiveRulePopupComponent } from './customer-deactive-rule-dialog.component';
import { CustomerDeactiveRuleDeletePopupComponent } from './customer-deactive-rule-delete-dialog.component';

@Injectable()
export class CustomerDeactiveRuleResolvePagingParams implements Resolve<any> {

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

export const customerDeactiveRuleRoute: Routes = [
    {
        path: 'customer-deactive-rule',
        component: CustomerDeactiveRuleComponent,
        resolve: {
            'pagingParams': CustomerDeactiveRuleResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_CUSTOMER_DEACTIVE_RULE'],
            pageTitle: 'niopdcgatewayApp.customerDeactiveRule.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const customerDeactiveRulePopupRoute: Routes = [
  {
    path: 'customer-deactive-rule-new',
    component: CustomerDeactiveRulePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN','CREATE_CUSTOMER_DEACTIVE_RULE'],
        pageTitle: 'niopdcgatewayApp.customerDeactiveRule.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'customer-deactive-rule/:id/edit',
    component: CustomerDeactiveRulePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN','EDIT_CUSTOMER_DEACTIVE_RULE'],
        pageTitle: 'niopdcgatewayApp.customerDeactiveRule.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'customer-deactive-rule/:id/delete',
    component: CustomerDeactiveRuleDeletePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN','DELETE_CUSTOMER_DEACTIVE_RULE'],
        pageTitle: 'niopdcgatewayApp.customerDeactiveRule.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
      path: 'customer-deactive-rule/:id/:view',
      component: CustomerDeactiveRulePopupComponent,
      data: {
          authorities: ['ROLE_ADMIN','VIEW_CUSTOMER_DEACTIVE_RULE'],
          pageTitle: 'niopdcgatewayApp.customerDeactiveRule.home.title'
      },
      canActivate: [UserRouteAccessService],
      outlet: 'popup'
  }
];
