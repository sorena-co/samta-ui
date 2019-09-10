import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CarTypeComponent } from './car-type.component';
import { CarTypePopupComponent } from './car-type-dialog.component';
import { CarTypeDeletePopupComponent } from './car-type-delete-dialog.component';

@Injectable()
export class CarTypeResolvePagingParams implements Resolve<any> {

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

export const carTypeRoute: Routes = [
    {
        path: 'car-type',
        component: CarTypeComponent,
        resolve: {
            'pagingParams': CarTypeResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_CAR_TYPE'],
            pageTitle: 'niopdcgatewayApp.carType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const carTypePopupRoute: Routes = [
  {
    path: 'car-type-new',
    component: CarTypePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN','CREATE_CAR_TYPE'],
        pageTitle: 'niopdcgatewayApp.carType.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'car-type/:id/edit',
    component: CarTypePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN','EDIT_CAR_TYPE'],
        pageTitle: 'niopdcgatewayApp.carType.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'car-type/:id/delete',
    component: CarTypeDeletePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN','DELETE_CAR_TYPE'],
        pageTitle: 'niopdcgatewayApp.carType.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
      path: 'car-type/:id/:view',
      component: CarTypePopupComponent,
      data: {
          authorities: ['ROLE_ADMIN','VIEW_CAR_TYPE'],
          pageTitle: 'niopdcgatewayApp.carType.home.title'
      },
      canActivate: [UserRouteAccessService],
      outlet: 'popup'
  }
];
