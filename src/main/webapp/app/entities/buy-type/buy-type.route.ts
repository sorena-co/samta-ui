import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import { BuyTypeComponent } from './buy-type.component';
import { BuyTypePopupComponent } from './buy-type-dialog.component';
import { BuyTypeDeletePopupComponent } from './buy-type-delete-dialog.component';

@Injectable()
export class BuyTypeResolvePagingParams implements Resolve<any> {

        constructor(private paginationUtil: JhiPaginationUtil) {}

        resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
            const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
            const size = route.queryParams['size'] ? route.queryParams['size'] : ITEMS_PER_PAGE;
            const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,desc';
            return {
                size: this.paginationUtil.parsePage(size),
                page: this.paginationUtil.parsePage(page),
                predicate: this.paginationUtil.parsePredicate(sort),
                ascending: this.paginationUtil.parseAscending(sort)
            };
        }
    }

export const buyTypeRoute: Routes = [
    {
        path: 'buy-type',
        component: BuyTypeComponent,
        resolve: {
            'pagingParams': BuyTypeResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_BUY_TYPE'],
            pageTitle: 'niopdcgatewayApp.buyType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const buyTypePopupRoute: Routes = [
  {
    path: 'buy-type-new',
    component: BuyTypePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'CREATE_BUY_TYPE'],
        pageTitle: 'niopdcgatewayApp.buyType.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'buy-type/:id/edit',
    component: BuyTypePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'EDIT_BUY_TYPE'],
        pageTitle: 'niopdcgatewayApp.buyType.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'buy-type/:id/delete',
    component: BuyTypeDeletePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'DELETE_BUY_TYPE'],
        pageTitle: 'niopdcgatewayApp.buyType.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
      path: 'buy-type/:id/:view',
      component: BuyTypePopupComponent,
      data: {
          authorities: ['ROLE_ADMIN', 'VIEW_BUY_TYPE'],
          pageTitle: 'niopdcgatewayApp.buyType.home.title'
      },
      canActivate: [UserRouteAccessService],
      outlet: 'popup'
  }
];
