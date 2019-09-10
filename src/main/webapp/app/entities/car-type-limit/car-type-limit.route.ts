import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CarTypeLimitComponent } from './car-type-limit.component';
import { CarTypeLimitPopupComponent } from './car-type-limit-dialog.component';
import { CarTypeLimitDeletePopupComponent } from './car-type-limit-delete-dialog.component';

@Injectable()
export class CarTypeLimitResolvePagingParams implements Resolve<any> {

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

export const carTypeLimitRoute: Routes = [
    {
        path: 'customer-type/:customerTypeId/car-type-limit',
        component: CarTypeLimitComponent,
        resolve: {
            'pagingParams': CarTypeLimitResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_CAR_TYPE_LIMIT'],
            pageTitle: 'niopdcgatewayApp.carTypeLimit.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const carTypeLimitPopupRoute: Routes = [
  {
    path: 'car-type-limit-new/:customerTypeId',
    component: CarTypeLimitPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN','CREATE_CAR_TYPE_LIMIT'],
        pageTitle: 'niopdcgatewayApp.carTypeLimit.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'car-type-limit/:id/edit',
    component: CarTypeLimitPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN','EDIT_CAR_TYPE_LIMIT'],
        pageTitle: 'niopdcgatewayApp.carTypeLimit.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'car-type-limit/:id/delete',
    component: CarTypeLimitDeletePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN','DELETE_CAR_TYPE_LIMIT'],
        pageTitle: 'niopdcgatewayApp.carTypeLimit.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
      path: 'car-type-limit/:id/:view',
      component: CarTypeLimitPopupComponent,
      data: {
          authorities: ['ROLE_ADMIN','VIEW_CAR_TYPE_LIMIT'],
          pageTitle: 'niopdcgatewayApp.carTypeLimit.home.title'
      },
      canActivate: [UserRouteAccessService],
      outlet: 'popup'
  }
];
