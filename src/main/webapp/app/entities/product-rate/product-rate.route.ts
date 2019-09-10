import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {ProductRateComponent} from './product-rate.component';
import {ProductRatePopupComponent} from './product-rate-dialog.component';
import {ProductRateDeletePopupComponent} from './product-rate-delete-dialog.component';

@Injectable()
export class ProductRateResolvePagingParams implements Resolve<any> {

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

export const productRateRoute: Routes = [
    {
        path: 'product/:productId/product-rate',
        component: ProductRateComponent,
        resolve: {
            'pagingParams': ProductRateResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_PRODUCT_RATE'],
            pageTitle: 'niopdcgatewayApp.productRate.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'container/:containerId/container-rate',
        component: ProductRateComponent,
        resolve: {
            'pagingParams': ProductRateResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_PRODUCT_RATE'],
            pageTitle: 'niopdcgatewayApp.containerRate.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const productRatePopupRoute: Routes = [
    {
        path: 'product-rate-new/product/:productId',
        component: ProductRatePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_PRODUCT_RATE'],
            pageTitle: 'niopdcgatewayApp.productRate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'container-rate-new/container/:containerId',
        component: ProductRatePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_PRODUCT_RATE'],
            pageTitle: 'niopdcgatewayApp.containerRate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'product-rate/:id/product/:productId/edit',
        component: ProductRatePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_PRODUCT_RATE'],
            pageTitle: 'niopdcgatewayApp.productRate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'container-rate/:id/container/:containerId/edit',
        component: ProductRatePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_PRODUCT_RATE'],
            pageTitle: 'niopdcgatewayApp.containerRate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'product-rate/:id/delete',
        component: ProductRateDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_PRODUCT_RATE'],
            pageTitle: 'niopdcgatewayApp.productRate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'product-rate/:id/product/:productId/:view',
        component: ProductRatePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_PRODUCT_RATE'],
            pageTitle: 'niopdcgatewayApp.productRate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'container-rate/:id/container/:containerId/:view',
        component: ProductRatePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_PRODUCT_RATE'],
            pageTitle: 'niopdcgatewayApp.containerRate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
