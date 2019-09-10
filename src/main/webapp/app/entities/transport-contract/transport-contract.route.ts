import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {TransportContractComponent} from './transport-contract.component';
import {TransportContractPopupComponent} from './transport-contract-dialog.component';
import {TransportContractDeletePopupComponent} from './transport-contract-delete-dialog.component';

@Injectable()
export class TransportContractResolvePagingParams implements Resolve<any> {

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

export const transportContractRoute: Routes = [
    {
        path: 'customer/:customerId/transport-contract',
        component: TransportContractComponent,
        resolve: {
            'pagingParams': TransportContractResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_TRANSPORT_CONTRACT'],
            pageTitle: 'samtagatewayApp.transportContract.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const transportContractPopupRoute: Routes = [
    {
        path: 'transport-contract-new/:customerId',
        component: TransportContractPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_TRANSPORT_CONTRACT'],
            pageTitle: 'samtagatewayApp.transportContract.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'transport-contract/:id/edit',
        component: TransportContractPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_TRANSPORT_CONTRACT'],
            pageTitle: 'samtagatewayApp.transportContract.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'transport-contract/:id/delete',
        component: TransportContractDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_TRANSPORT_CONTRACT'],
            pageTitle: 'samtagatewayApp.transportContract.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'transport-contract/:id/:view',
        component: TransportContractPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_TRANSPORT_CONTRACT'],
            pageTitle: 'samtagatewayApp.transportContract.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
