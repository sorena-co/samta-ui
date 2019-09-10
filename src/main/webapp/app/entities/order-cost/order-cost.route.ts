import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {JhiPaginationUtil} from 'ng-jhipster';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {OrderCostComponent} from './order-cost.component';
import {OrderCostPopupComponent} from './order-cost-dialog.component';
import {OrderCostDeletePopupComponent} from './order-cost-delete-dialog.component';

@Injectable()
export class OrderCostResolvePagingParams implements Resolve<any> {

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

export const orderCostRoute: Routes = [
    {
        path: 'order-cost',
        component: OrderCostComponent,
        resolve: {
            'pagingParams': OrderCostResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'niopdcgatewayApp.orderCost.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const orderCostPopupRoute: Routes = [
    {
        path: 'order-cost-new',
        component: OrderCostPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'niopdcgatewayApp.orderCost.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'order-cost/:id/edit',
        component: OrderCostPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'niopdcgatewayApp.orderCost.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'order-cost/:id/delete',
        component: OrderCostDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'niopdcgatewayApp.orderCost.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
