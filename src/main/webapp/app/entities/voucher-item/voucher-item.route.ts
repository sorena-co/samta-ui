import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { VoucherItemComponent } from './voucher-item.component';
import { VoucherItemDetailComponent } from './voucher-item-detail.component';
import { VoucherItemPopupComponent } from './voucher-item-dialog.component';
import { VoucherItemDeletePopupComponent } from './voucher-item-delete-dialog.component';

@Injectable()
export class VoucherItemResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,desc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const voucherItemRoute: Routes = [
    {
        path: 'voucher-item',
        component: VoucherItemComponent,
        resolve: {
            'pagingParams': VoucherItemResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'niopdcgatewayApp.voucherItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'voucher-item/:id',
        component: VoucherItemDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'niopdcgatewayApp.voucherItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const voucherItemPopupRoute: Routes = [
    {
        path: 'voucher-item-new',
        component: VoucherItemPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'niopdcgatewayApp.voucherItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'voucher-item/:id/edit',
        component: VoucherItemPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'niopdcgatewayApp.voucherItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'voucher-item/:id/delete',
        component: VoucherItemDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'niopdcgatewayApp.voucherItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
