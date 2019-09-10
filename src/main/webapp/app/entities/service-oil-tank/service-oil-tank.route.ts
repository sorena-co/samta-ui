import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {ServiceOilTankComponent} from './service-oil-tank.component';
import {ServiceOilTankPopupComponent} from './service-oil-tank-dialog.component';
import {ServiceOilTankDeletePopupComponent} from './service-oil-tank-delete-dialog.component';

@Injectable()
export class ServiceOilTankResolvePagingParams implements Resolve<any> {

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

export const serviceOilTankRoute: Routes = [
    {
        path: 'oil-tank/:oilTankId/service-oil-tank',
        component: ServiceOilTankComponent,
        resolve: {
            'pagingParams': ServiceOilTankResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_SERVICE_OIL_TANK'],
            pageTitle: 'samtagatewayApp.serviceOilTank.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const serviceOilTankPopupRoute: Routes = [
    {
        path: 'service-oil-tank-new/oil-tank/:oilTankId',
        component: ServiceOilTankPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_SERVICE_OIL_TANK'],
            pageTitle: 'samtagatewayApp.serviceOilTank.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'service-oil-tank/:id/:parent/:parentId/edit',
        component: ServiceOilTankPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_SERVICE_OIL_TANK'],
            pageTitle: 'samtagatewayApp.serviceOilTank.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'service-oil-tank/:id/delete',
        component: ServiceOilTankDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_SERVICE_OIL_TANK'],
            pageTitle: 'samtagatewayApp.serviceOilTank.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'service-oil-tank/:id/:parent/:parentId/:view',
        component: ServiceOilTankPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_SERVICE_OIL_TANK'],
            pageTitle: 'samtagatewayApp.serviceOilTank.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
