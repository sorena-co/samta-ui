import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {JhiPaginationUtil} from 'ng-jhipster';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {SellContractCustomerComponent} from './sell-contract-customer.component';
import {SellContractCustomerDetailComponent} from './sell-contract-customer-detail.component';
import {SellContractCustomerPopupComponent} from './sell-contract-customer-dialog.component';
import {SellContractCustomerDeletePopupComponent} from './sell-contract-customer-delete-dialog.component';

@Injectable()
export class SellContractCustomerResolvePagingParams implements Resolve<any> {

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

export const sellContractCustomerRoute: Routes = [
    {
        path: 'sell-contract-customer',
        component: SellContractCustomerComponent,
        resolve: {
            'pagingParams': SellContractCustomerResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'niopdcgatewayApp.sellContractCustomer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'sell-contract-customer/:id',
        component: SellContractCustomerDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'niopdcgatewayApp.sellContractCustomer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sellContractCustomerPopupRoute: Routes = [
    {
        path: 'sell-contract-customer-new',
        component: SellContractCustomerPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'niopdcgatewayApp.sellContractCustomer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'sell-contract-customer/:id/edit',
        component: SellContractCustomerPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'niopdcgatewayApp.sellContractCustomer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'sell-contract-customer/:id/delete',
        component: SellContractCustomerDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'niopdcgatewayApp.sellContractCustomer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
