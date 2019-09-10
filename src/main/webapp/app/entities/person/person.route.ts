import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {PersonComponent} from './person.component';
import {PersonPopupComponent} from './person-dialog.component';
import {PersonDeletePopupComponent} from './person-delete-dialog.component';
import {StakeholderDeletePopupComponent} from '../stakeholder/stakeholder-delete-dialog.component';
import {PersonRegisterDialogComponent} from "./person-register-dialog.component";
import {PersonChangeStatusPopupComponent} from "./person-change-status-dialog.component";
import {PersonCreateUserDialogComponent, PersonCreateUserPopupComponent} from './person-create-user-dialog.component';

@Injectable()
export class PersonResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const size = route.queryParams['size'] ? route.queryParams['size'] : ITEMS_PER_PAGE;
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'fullName,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            size: this.paginationUtil.parsePage(size),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    }
}

export const personRoute: Routes = [
    {
        path: 'person',
        component: PersonComponent,
        resolve: {
            'pagingParams': PersonResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_PERSON'],
            pageTitle: 'samtagatewayApp.person.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'person/:companyId/stakeholder',
        component: PersonComponent,
        resolve: {
            'pagingParams': PersonResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_STAKEHOLDER'],
            pageTitle: 'samtagatewayApp.stakeholder.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const personPopupRoute: Routes = [
    {
        path: 'person/register',
        component: PersonRegisterDialogComponent,
        data: {
            authorities: [],
            pageTitle: 'samtagatewayApp.person.home.title',
            created: false
        }
    },
    {
        path: 'person/register/created',
        component: PersonRegisterDialogComponent,
        data: {
            authorities: [],
            pageTitle: 'samtagatewayApp.person.home.title',
            created: true
        }
    },
    {
        path: 'person/:id/:mode/user',
        component: PersonCreateUserPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_USER'],
            pageTitle: 'samtagatewayApp.person.home.titleCreateUser'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },{
        path: 'person/:id/:mode/user',
        component: PersonCreateUserPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_USER'],
            pageTitle: 'samtagatewayApp.person.home.titleEditUser'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'person-new',
        component: PersonPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_PERSON'],
            pageTitle: 'samtagatewayApp.person.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }, {
        path: 'stakeholder-new/:companyId',
        component: PersonPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_STAKEHOLDER'],
            pageTitle: 'samtagatewayApp.stakeholder.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'person/:id/edit',
        component: PersonPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_PERSON'],
            pageTitle: 'samtagatewayApp.person.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'stakeholder/:companyId/:id/edit',
        component: PersonPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_STAKEHOLDER'],
            pageTitle: 'samtagatewayApp.stakeholder.home.title',
            stakeholder: true
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'person/:id/delete',
        component: PersonDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_PERSON'],
            pageTitle: 'samtagatewayApp.person.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'stakeholder/:id/delete',
        component: StakeholderDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_STAKEHOLDER'],
            pageTitle: 'samtagatewayApp.person.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }, {
        path: 'person/:id/active',
        component: PersonChangeStatusPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CONFIRM_PERSON'],
            pageTitle: 'samtagatewayApp.person.home.title',
            status:'active'

        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }, {
        path: 'person/:id/de-active',
        component: PersonChangeStatusPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CONFIRM_PERSON'],
            pageTitle: 'samtagatewayApp.person.home.title',
            status:'de-active'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }, {
        path: 'person/:id/reject',
        component: PersonChangeStatusPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CONFIRM_PERSON'],
            pageTitle: 'samtagatewayApp.person.home.title',
            status:'reject'

        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'person/:id/:view',
        component: PersonPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_PERSON'],
            pageTitle: 'samtagatewayApp.person.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'stakeholder/:companyId/:id/:view',
        component: PersonPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_STAKEHOLDER'],
            pageTitle: 'samtagatewayApp.stakeholder.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
