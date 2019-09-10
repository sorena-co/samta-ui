import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    UserDataAccessService,
    UserDataAccessPopupService,
    UserDataAccessComponent,
    UserDataAccessDialogComponent,
    UserDataAccessPopupComponent,
    UserDataAccessDeletePopupComponent,
    UserDataAccessDeleteDialogComponent,
    userDataAccessRoute,
    userDataAccessPopupRoute,
    UserDataAccessResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...userDataAccessRoute,
    ...userDataAccessPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UserDataAccessComponent,
        UserDataAccessDialogComponent,
        UserDataAccessDeleteDialogComponent,
        UserDataAccessPopupComponent,
        UserDataAccessDeletePopupComponent,
    ],
    entryComponents: [
        UserDataAccessComponent,
        UserDataAccessDialogComponent,
        UserDataAccessPopupComponent,
        UserDataAccessDeleteDialogComponent,
        UserDataAccessDeletePopupComponent,
    ],
    providers: [
        UserDataAccessService,
        UserDataAccessPopupService,
        UserDataAccessResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayUserDataAccessModule {}
