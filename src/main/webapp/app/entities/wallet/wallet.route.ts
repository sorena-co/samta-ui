import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {WalletComponent} from './wallet.component';
import {WalletPopupComponent} from './wallet-dialog.component';
import {WalletDeletePopupComponent} from './wallet-delete-dialog.component';

@Injectable()
export class WalletResolvePagingParams implements Resolve<any> {

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

export const walletRoute: Routes = [
    {
        path: 'wallet',
        component: WalletComponent,
        resolve: {
            'pagingParams': WalletResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_WALLET'],
            pageTitle: 'niopdcgatewayApp.wallet.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const walletPopupRoute: Routes = [
    {
        path: 'wallet-new',
        component: WalletPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_WALLET'],
            pageTitle: 'niopdcgatewayApp.wallet.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'wallet/:id/edit',
        component: WalletPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_WALLET'],
            pageTitle: 'niopdcgatewayApp.wallet.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'wallet/:id/delete',
        component: WalletDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_WALLET'],
            pageTitle: 'niopdcgatewayApp.wallet.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'wallet/:id/:view',
        component: WalletPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_WALLET'],
            pageTitle: 'niopdcgatewayApp.wallet.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
