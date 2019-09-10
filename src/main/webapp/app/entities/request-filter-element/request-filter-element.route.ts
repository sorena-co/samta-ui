import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {RequestFilterElementComponent} from './request-filter-element.component';
import {RequestFilterElementPopupComponent} from './request-filter-element-dialog.component';
import {RequestFilterElementDeletePopupComponent} from './request-filter-element-delete-dialog.component';

@Injectable()
export class RequestFilterElementResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {
    }

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

export const requestFilterElementRoute: Routes = [
    {
        path: 'request-filter-element',
        component: RequestFilterElementComponent,
        resolve: {
            'pagingParams': RequestFilterElementResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_REQUEST_FILTER_ELEMENT'],
            pageTitle: 'samtagatewayApp.requestFilterElement.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const requestFilterElementPopupRoute: Routes = [
    {
        path: 'request-filter-element-new',
        component: RequestFilterElementPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_REQUEST_FILTER_ELEMENT'],
            pageTitle: 'samtagatewayApp.requestFilterElement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'request-filter-element/:id/edit',
        component: RequestFilterElementPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_REQUEST_FILTER_ELEMENT'],
            pageTitle: 'samtagatewayApp.requestFilterElement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'request-filter-element/:id/delete',
        component: RequestFilterElementDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_REQUEST_FILTER_ELEMENT'],
            pageTitle: 'samtagatewayApp.requestFilterElement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'request-filter-element/:id/:view',
        component: RequestFilterElementPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_REQUEST_FILTER_ELEMENT'],
            pageTitle: 'samtagatewayApp.requestFilterElement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
