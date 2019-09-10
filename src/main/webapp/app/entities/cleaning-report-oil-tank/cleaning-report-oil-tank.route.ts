import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {JhiPaginationUtil} from 'ng-jhipster';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {CleaningReportOilTankComponent} from './cleaning-report-oil-tank.component';
import {CleaningReportOilTankPopupComponent} from './cleaning-report-oil-tank-dialog.component';
import {CleaningReportOilTankDeletePopupComponent} from './cleaning-report-oil-tank-delete-dialog.component';

@Injectable()
export class CleaningReportOilTankResolvePagingParams implements Resolve<any> {

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

export const cleaningReportOilTankRoute: Routes = [
    {
        path: 'cleaning-report-oil-tank',
        component: CleaningReportOilTankComponent,
        resolve: {
            'pagingParams': CleaningReportOilTankResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_CLEANING_REPORT_OIL_TANK'],
            pageTitle: 'niopdcgatewayApp.cleaningReportOilTank.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cleaningReportOilTankPopupRoute: Routes = [
    {
        path: 'cleaning-report-oil-tank-new',
        component: CleaningReportOilTankPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_CLEANING_REPORT_OIL_TANK'],
            pageTitle: 'niopdcgatewayApp.cleaningReportOilTank.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cleaning-report-oil-tank/:id/edit',
        component: CleaningReportOilTankPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_CLEANING_REPORT_OIL_TANK'],
            pageTitle: 'niopdcgatewayApp.cleaningReportOilTank.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cleaning-report-oil-tank/:id/delete',
        component: CleaningReportOilTankDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_CLEANING_REPORT_OIL_TANK'],
            pageTitle: 'niopdcgatewayApp.cleaningReportOilTank.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cleaning-report-oil-tank/:id/:view',
        component: CleaningReportOilTankPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_CLEANING_REPORT_OIL_TANK'],
            pageTitle: 'niopdcgatewayApp.cleaningReportOilTank.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
