import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {VoucherTypeGroupComponent} from './voucher-type-group.component';
import {VoucherTypeGroupPopupComponent} from './voucher-type-group-dialog.component';
import {VoucherTypeGroupDeletePopupComponent} from './voucher-type-group-delete-dialog.component';

@Injectable()
export class VoucherTypeGroupResolvePagingParams implements Resolve<any> {

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

export const voucherTypeGroupRoute: Routes = [
    {
        path: 'voucher-type-group',
        component: VoucherTypeGroupComponent,
        resolve: {
            'pagingParams': VoucherTypeGroupResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_VOUCHER_TYPE_GROUP'],
            pageTitle: 'samtagatewayApp.voucherTypeGroup.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const voucherTypeGroupPopupRoute: Routes = [
    {
        path: 'voucher-type-group-new',
        component: VoucherTypeGroupPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_VOUCHER_TYPE_GROUP'],
            pageTitle: 'samtagatewayApp.voucherTypeGroup.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'voucher-type-group/:id/edit',
        component: VoucherTypeGroupPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_VOUCHER_TYPE_GROUP'],
            pageTitle: 'samtagatewayApp.voucherTypeGroup.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'voucher-type-group/:id/delete',
        component: VoucherTypeGroupDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_VOUCHER_TYPE_GROUP'],
            pageTitle: 'samtagatewayApp.voucherTypeGroup.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'voucher-type-group/:id/:view',
        component: VoucherTypeGroupPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_VOUCHER_TYPE_GROUP'],
            pageTitle: 'samtagatewayApp.voucherTypeGroup.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
