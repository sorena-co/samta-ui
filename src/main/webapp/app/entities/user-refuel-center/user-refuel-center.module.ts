import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    UserRefuelCenterService,
    UserRefuelCenterPopupService,
    UserRefuelCenterComponent,
    UserRefuelCenterDetailComponent,
    UserRefuelCenterDialogComponent,
    UserRefuelCenterPopupComponent,
    UserRefuelCenterDeletePopupComponent,
    UserRefuelCenterDeleteDialogComponent,
    userRefuelCenterRoute,
    userRefuelCenterPopupRoute,
    UserRefuelCenterResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...userRefuelCenterRoute,
    ...userRefuelCenterPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UserRefuelCenterComponent,
        UserRefuelCenterDetailComponent,
        UserRefuelCenterDialogComponent,
        UserRefuelCenterDeleteDialogComponent,
        UserRefuelCenterPopupComponent,
        UserRefuelCenterDeletePopupComponent,
    ],
    entryComponents: [
        UserRefuelCenterComponent,
        UserRefuelCenterDialogComponent,
        UserRefuelCenterPopupComponent,
        UserRefuelCenterDeleteDialogComponent,
        UserRefuelCenterDeletePopupComponent,
    ],
    providers: [
        UserRefuelCenterService,
        UserRefuelCenterPopupService,
        UserRefuelCenterResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayUserRefuelCenterModule {}
