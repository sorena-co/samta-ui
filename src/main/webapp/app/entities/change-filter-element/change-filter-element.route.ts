import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import { ChangeFilterElementComponent } from './change-filter-element.component';
import { ChangeFilterElementPopupComponent } from './change-filter-element-dialog.component';
import { ChangeFilterElementDeletePopupComponent } from './change-filter-element-delete-dialog.component';

@Injectable()
export class ChangeFilterElementResolvePagingParams implements Resolve<any> {

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

export const changeFilterElementRoute: Routes = [
    {
        path: 'request-filter-element/:requestFilterElementId/change-filter-element',
        component: ChangeFilterElementComponent,
        resolve: {
            'pagingParams': ChangeFilterElementResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_CHANGE_FILTER_ELEMENT'],
            pageTitle: 'niopdcgatewayApp.changeFilterElement.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const changeFilterElementPopupRoute: Routes = [
  {
    path: 'change-filter-element-new/:requestFilterElementId',
    component: ChangeFilterElementPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'CREATE_CHANGE_FILTER_ELEMENT'],
        pageTitle: 'niopdcgatewayApp.changeFilterElement.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'change-filter-element/:id/edit',
    component: ChangeFilterElementPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'EDIT_CHANGE_FILTER_ELEMENT'],
        pageTitle: 'niopdcgatewayApp.changeFilterElement.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'change-filter-element/:id/delete',
    component: ChangeFilterElementDeletePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'DELETE_CHANGE_FILTER_ELEMENT'],
        pageTitle: 'niopdcgatewayApp.changeFilterElement.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
      path: 'change-filter-element/:id/:view',
      component: ChangeFilterElementPopupComponent,
      data: {
          authorities: ['ROLE_ADMIN', 'VIEW_CHANGE_FILTER_ELEMENT'],
          pageTitle: 'niopdcgatewayApp.changeFilterElement.home.title'
      },
      canActivate: [UserRouteAccessService],
      outlet: 'popup'
  }
];
