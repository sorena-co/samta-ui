import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {RequestTestResultComponent} from './request-test-result.component';
import {RequestTestResultPopupComponent} from './request-test-result-dialog.component';
import {RequestTestResultDeletePopupComponent} from './request-test-result-delete-dialog.component';

@Injectable()
export class RequestTestResultResolvePagingParams implements Resolve<any> {

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

export const requestTestResultRoute: Routes = [
    {
        path: 'request-test-result',
        component: RequestTestResultComponent,
        resolve: {
            'pagingParams': RequestTestResultResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_REQUEST_TEST_RESULT'],
            pageTitle: 'samtagatewayApp.requestTestResult.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const requestTestResultPopupRoute: Routes = [
    {
        path: 'request-test-result-new',
        component: RequestTestResultPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_REQUEST_TEST_RESULT'],
            pageTitle: 'samtagatewayApp.requestTestResult.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'request-test-result/:id/edit',
        component: RequestTestResultPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_REQUEST_TEST_RESULT'],
            pageTitle: 'samtagatewayApp.requestTestResult.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'request-test-result/:id/delete',
        component: RequestTestResultDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_REQUEST_TEST_RESULT'],
            pageTitle: 'samtagatewayApp.requestTestResult.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'request-test-result/:id/:view',
        component: RequestTestResultPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_REQUEST_TEST_RESULT'],
            pageTitle: 'samtagatewayApp.requestTestResult.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
