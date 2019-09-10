import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {JhiPaginationUtil} from 'ng-jhipster';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {StakeholderComponent} from './stakeholder.component';
import {StakeholderDetailComponent} from './stakeholder-detail.component';
import {StakeholderPopupComponent} from './stakeholder-dialog.component';
import {StakeholderDeletePopupComponent} from './stakeholder-delete-dialog.component';

@Injectable()
export class StakeholderResolvePagingParams implements Resolve<any> {

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

export const stakeholderRoute: Routes = [
    {
        path: 'stakeholder',
        component: StakeholderComponent,
        resolve: {
            'pagingParams': StakeholderResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'samtagatewayApp.stakeholder.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'stakeholder/:id',
        component: StakeholderDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'samtagatewayApp.stakeholder.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const stakeholderPopupRoute: Routes = [
    {
        path: 'stakeholder-new',
        component: StakeholderPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'samtagatewayApp.stakeholder.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'stakeholder/:id/edit',
        component: StakeholderPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'samtagatewayApp.stakeholder.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'stakeholder/:id/delete',
        component: StakeholderDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'samtagatewayApp.stakeholder.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
