import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {JhiPaginationUtil} from 'ng-jhipster';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {SellContractPersonComponent} from './sell-contract-person.component';
import {SellContractPersonPopupComponent} from './sell-contract-person-dialog.component';
import {SellContractPersonDeletePopupComponent} from './sell-contract-person-delete-dialog.component';

@Injectable()
export class SellContractPersonResolvePagingParams implements Resolve<any> {

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

export const sellContractPersonRoute: Routes = [
    {
        path: 'sell-contract/:sellContractId/sell-contract-person',
        component: SellContractPersonComponent,
        resolve: {
            'pagingParams': SellContractPersonResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_SELL_CONTRACT_PERSON'],
            pageTitle: 'niopdcgatewayApp.sellContractPerson.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sellContractPersonPopupRoute: Routes = [
    {
        path: 'sell-contract-person-new/:sellContractId',
        component: SellContractPersonPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_SELL_CONTRACT_PERSON'],
            pageTitle: 'niopdcgatewayApp.sellContractPerson.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'sell-contract-person/:id/edit',
        component: SellContractPersonPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_SELL_CONTRACT_PERSON'],
            pageTitle: 'niopdcgatewayApp.sellContractPerson.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'sell-contract-person/:id/delete',
        component: SellContractPersonDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_SELL_CONTRACT_PERSON'],
            pageTitle: 'niopdcgatewayApp.sellContractPerson.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'sell-contract-person/:id/:view',
        component: SellContractPersonPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_SELL_CONTRACT_PERSON'],
            pageTitle: 'niopdcgatewayApp.sellContractPerson.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
