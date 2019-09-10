import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { BillItemComponent } from './bill-item.component';
import { BillItemDetailComponent } from './bill-item-detail.component';
import { BillItemPopupComponent } from './bill-item-dialog.component';
import { BillItemDeletePopupComponent } from './bill-item-delete-dialog.component';

@Injectable()
export class BillItemResolvePagingParams implements Resolve<any> {

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

export const billItemRoute: Routes = [
    {
        path: 'bill-item',
        component: BillItemComponent,
        resolve: {
            'pagingParams': BillItemResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'niopdcgatewayApp.billItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'bill-item/:id',
        component: BillItemDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'niopdcgatewayApp.billItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const billItemPopupRoute: Routes = [
    {
        path: 'bill-item-new',
        component: BillItemPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'niopdcgatewayApp.billItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bill-item/:id/edit',
        component: BillItemPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'niopdcgatewayApp.billItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bill-item/:id/delete',
        component: BillItemDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'niopdcgatewayApp.billItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
