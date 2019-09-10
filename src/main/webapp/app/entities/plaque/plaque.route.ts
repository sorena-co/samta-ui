import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PlaqueComponent } from './plaque.component';
import { PlaquePopupComponent } from './plaque-dialog.component';
import { PlaqueDeletePopupComponent } from './plaque-delete-dialog.component';

@Injectable()
export class PlaqueResolvePagingParams implements Resolve<any> {

        constructor(private paginationUtil: JhiPaginationUtil) {}

        resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
            const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
            const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
            return {
                page: this.paginationUtil.parsePage(page),
                predicate: this.paginationUtil.parsePredicate(sort),
                ascending: this.paginationUtil.parseAscending(sort)
            };
        }
    }

export const plaqueRoute: Routes = [
    {
        path: 'plaque',
        component: PlaqueComponent,
        resolve: {
            'pagingParams': PlaqueResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_PLAQUE'],
            pageTitle: 'samtagatewayApp.plaque.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const plaquePopupRoute: Routes = [
  {
    path: 'plaque-new',
    component: PlaquePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'CREATE_PLAQUE'],
        pageTitle: 'samtagatewayApp.plaque.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'plaque/:id/edit',
    component: PlaquePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'EDIT_PLAQUE'],
        pageTitle: 'samtagatewayApp.plaque.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'plaque/:id/delete',
    component: PlaqueDeletePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'DELETE_PLAQUE'],
        pageTitle: 'samtagatewayApp.plaque.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
      path: 'plaque/:id/:view',
      component: PlaquePopupComponent,
      data: {
          authorities: ['ROLE_ADMIN', 'VIEW_PLAQUE'],
          pageTitle: 'samtagatewayApp.plaque.home.title'
      },
      canActivate: [UserRouteAccessService],
      outlet: 'popup'
  }
];
