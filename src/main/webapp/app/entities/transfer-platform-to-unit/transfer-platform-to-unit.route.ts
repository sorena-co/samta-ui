import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {TransferPlatformToUnitComponent} from './transfer-platform-to-unit.component';
import {TransferPlatformToUnitPopupComponent} from './transfer-platform-to-unit-dialog.component';
import {TransferPlatformToUnitDeletePopupComponent} from './transfer-platform-to-unit-delete-dialog.component';

@Injectable()
export class TransferPlatformToUnitResolvePagingParams implements Resolve<any> {

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

export const transferPlatformToUnitRoute: Routes = [
    {
        path: 'main-day-operation/:mainDayOperationId/day-depot/:dayDepotId/transfer-platform-to-unit',
        component: TransferPlatformToUnitComponent,
        resolve: {
            'pagingParams': TransferPlatformToUnitResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_TRANSFER_PLATFORM_TO_UNIT'],
            pageTitle: 'niopdcgatewayApp.transferPlatformToUnit.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'main-day-depot/:mainDayDepotId/day-depot/:dayDepotId/transfer-platform-to-unit',
        component: TransferPlatformToUnitComponent,
        resolve: {
            'pagingParams': TransferPlatformToUnitResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_TRANSFER_PLATFORM_TO_UNIT'],
            pageTitle: 'niopdcgatewayApp.transferPlatformToUnit.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const transferPlatformToUnitPopupRoute: Routes = [
    {
        path: 'transfer-platform-to-unit-new/:dayDepotId',
        component: TransferPlatformToUnitPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_TRANSFER_PLATFORM_TO_UNIT'],
            pageTitle: 'niopdcgatewayApp.transferPlatformToUnit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'transfer-platform-to-unit/:id/edit',
        component: TransferPlatformToUnitPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_TRANSFER_PLATFORM_TO_UNIT'],
            pageTitle: 'niopdcgatewayApp.transferPlatformToUnit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'transfer-platform-to-unit/:id/delete',
        component: TransferPlatformToUnitDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_TRANSFER_PLATFORM_TO_UNIT'],
            pageTitle: 'niopdcgatewayApp.transferPlatformToUnit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'transfer-platform-to-unit/:id/:view',
        component: TransferPlatformToUnitPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_TRANSFER_PLATFORM_TO_UNIT'],
            pageTitle: 'niopdcgatewayApp.transferPlatformToUnit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
