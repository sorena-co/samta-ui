import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {JhiPaginationUtil} from 'ng-jhipster';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {CustomerCreditComponent} from './customer-credit.component';
import {CustomerCreditPopupComponent} from './customer-credit-dialog.component';
import {CustomerCreditDeletePopupComponent} from './customer-credit-delete-dialog.component';

@Injectable()
export class CustomerCreditResolvePagingParams implements Resolve<any> {

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

export const customerCreditRoute: Routes = [
    {
        path: 'customer/:customerId/customer-credit',
        component: CustomerCreditComponent,
        resolve: {
            'pagingParams': CustomerCreditResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_CUSTOMER_CREDIT'],
            pageTitle: 'samtagatewayApp.customerCredit.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'person/:personId/person-credit',
        component: CustomerCreditComponent,
        resolve: {
            'pagingParams': CustomerCreditResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_PERSON_CREDIT'],
            pageTitle: 'samtagatewayApp.personCredit.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sell-contract/:sellContractId/sell-contract-product/:sellContractProductId/sell-contract-product-credit',
        component: CustomerCreditComponent,
        resolve: {
            'pagingParams': CustomerCreditResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_CUSTOMER_CREDIT','LIST_PERSON_CREDIT'],
            pageTitle: 'samtagatewayApp.personCredit.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const customerCreditPopupRoute: Routes = [
    {
        path: 'customer-credit-new/customer/:customerId',
        component: CustomerCreditPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_CUSTOMER_CREDIT'],
            pageTitle: 'samtagatewayApp.customerCredit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'person-credit-new/person/:personId',
        component: CustomerCreditPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_PERSON_CREDIT'],
            pageTitle: 'samtagatewayApp.personCredit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'sell-contract-product-credit-new/sell-contract-product/:sellContractProductId',
        component: CustomerCreditPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_CUSTOMER_CREDIT','CREATE_PERSON_CREDIT'],
            pageTitle: 'samtagatewayApp.personCredit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'customer-credit/:id/customer/:customerId/edit',
        component: CustomerCreditPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_CUSTOMER_CREDIT'],
            pageTitle: 'samtagatewayApp.customerCredit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'person-credit/:id/person/:personId/edit',
        component: CustomerCreditPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_PERSON_CREDIT'],
            pageTitle: 'samtagatewayApp.personCredit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'sell-contract-product-credit/:id/sell-contract-product/:sellContractProductId/edit',
        component: CustomerCreditPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_CUSTOMER_CREDIT','EDIT_PERSON_CREDIT'],
            pageTitle: 'samtagatewayApp.personCredit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'customer-credit/:id/delete',
        component: CustomerCreditDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_CUSTOMER_CREDIT'],
            pageTitle: 'samtagatewayApp.customerCredit.home.title',
            isPerson: false
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'person-credit/:id/delete',
        component: CustomerCreditDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_PERSON_CREDIT'],
            pageTitle: 'samtagatewayApp.customerCredit.home.title',
            isPerson: true
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'sell-contract-product-credit/:id/delete',
        component: CustomerCreditDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_CUSTOMER_CREDIT','DELETE_PERSON_CREDIT'],
            pageTitle: 'samtagatewayApp.customerCredit.home.title',
            isPerson: true
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'customer-credit/:id/customer/:customerId/:view',
        component: CustomerCreditPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_CUSTOMER_CREDIT'],
            pageTitle: 'samtagatewayApp.customerCredit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }, {
        path: 'person-credit/:id/person/:personId/:view',
        component: CustomerCreditPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_PERSON_CREDIT'],
            pageTitle: 'samtagatewayApp.personCredit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }, {
        path: 'sell-contract-product-credit/:id/sell-contract-product/:sellContractProductId/:view',
        component: CustomerCreditPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_CUSTOMER_CREDIT','VIEW_PERSON_CREDIT'],
            pageTitle: 'samtagatewayApp.personCredit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
