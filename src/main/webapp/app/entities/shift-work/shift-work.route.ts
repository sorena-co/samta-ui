import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ShiftWorkComponent } from './shift-work.component';
import { ShiftWorkPopupComponent } from './shift-work-dialog.component';
import { ShiftWorkDeletePopupComponent } from './shift-work-delete-dialog.component';

@Injectable()
export class ShiftWorkResolvePagingParams implements Resolve<any> {

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

export const shiftWorkRoute: Routes = [
    {
        path: 'location/:locationId/shift-work',
        component: ShiftWorkComponent,
        resolve: {
            'pagingParams': ShiftWorkResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_SHIFT_WORK'],
            pageTitle: 'niopdcgatewayApp.shiftWork.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const shiftWorkPopupRoute: Routes = [
  {
    path: 'shift-work-new/:locationId',
    component: ShiftWorkPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN','CREATE_SHIFT_WORK'],
        pageTitle: 'niopdcgatewayApp.shiftWork.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'shift-work/:id/edit',
    component: ShiftWorkPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN','EDIT_SHIFT_WORK'],
        pageTitle: 'niopdcgatewayApp.shiftWork.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'shift-work/:id/delete',
    component: ShiftWorkDeletePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN','DELETE_SHIFT_WORK'],
        pageTitle: 'niopdcgatewayApp.shiftWork.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
      path: 'shift-work/:id/:view',
      component: ShiftWorkPopupComponent,
      data: {
          authorities: ['ROLE_ADMIN','VIEW_SHIFT_WORK'],
          pageTitle: 'niopdcgatewayApp.shiftWork.home.title'
      },
      canActivate: [UserRouteAccessService],
      outlet: 'popup'
  }
];
