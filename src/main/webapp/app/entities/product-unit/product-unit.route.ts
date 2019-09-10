import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {ProductUnitComponent} from './product-unit.component';
import {ProductUnitPopupComponent} from './product-unit-dialog.component';
import {ProductUnitDeletePopupComponent} from './product-unit-delete-dialog.component';

@Injectable()
export class ProductUnitResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const size = route.queryParams['size'] ? route.queryParams['size'] : ITEMS_PER_PAGE;
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'title,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            size: this.paginationUtil.parsePage(size),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    }
}

export const productUnitRoute: Routes = [
    {
        path: 'product-unit',
        component: ProductUnitComponent,
        resolve: {
            'pagingParams': ProductUnitResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_PRODUCT_UNIT'],
            pageTitle: 'samtagatewayApp.productUnit.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const productUnitPopupRoute: Routes = [
    {
        path: 'product-unit-new',
        component: ProductUnitPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_PRODUCT_UNIT'],
            pageTitle: 'samtagatewayApp.productUnit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'product-unit/:id/edit',
        component: ProductUnitPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_PRODUCT_UNIT'],
            pageTitle: 'samtagatewayApp.productUnit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'product-unit/:id/delete',
        component: ProductUnitDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_PRODUCT_UNIT'],
            pageTitle: 'samtagatewayApp.productUnit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'product-unit/:id/:view',
        component: ProductUnitPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_PRODUCT_UNIT'],
            pageTitle: 'samtagatewayApp.productUnit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
