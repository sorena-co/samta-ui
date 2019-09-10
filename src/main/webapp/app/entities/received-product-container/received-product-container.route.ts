import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {ReceivedProductContainerComponent} from './received-product-container.component';
import {ReceivedProductContainerPopupComponent} from './received-product-container-dialog.component';
import {ReceivedProductContainerDeletePopupComponent} from './received-product-container-delete-dialog.component';

@Injectable()
export class ReceivedProductContainerResolvePagingParams implements Resolve<any> {

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

export const receivedProductContainerRoute: Routes = [
    {
        path: 'main-day-depot/:mainDayDepotId/day-depot-container/:dayDepotContainerId/received-product-container',
        component: ReceivedProductContainerComponent,
        resolve: {
            'pagingParams': ReceivedProductContainerResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_RECEIVED_PRODUCT_CONTAINER'],
            pageTitle: 'samtagatewayApp.receivedProductContainer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const receivedProductContainerPopupRoute: Routes = [
    {
        path: 'received-product-container-new/:dayDepotContainerId',
        component: ReceivedProductContainerPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_RECEIVED_PRODUCT_CONTAINER'],
            pageTitle: 'samtagatewayApp.receivedProductContainer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'received-product-container/:id/edit',
        component: ReceivedProductContainerPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_RECEIVED_PRODUCT_CONTAINER'],
            pageTitle: 'samtagatewayApp.receivedProductContainer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'received-product-container/:id/delete',
        component: ReceivedProductContainerDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_RECEIVED_PRODUCT_CONTAINER'],
            pageTitle: 'samtagatewayApp.receivedProductContainer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'received-product-container/:id/:view',
        component: ReceivedProductContainerPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_RECEIVED_PRODUCT_CONTAINER'],
            pageTitle: 'samtagatewayApp.receivedProductContainer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
