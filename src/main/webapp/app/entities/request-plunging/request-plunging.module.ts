import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    RequestPlungingService,
    RequestPlungingPopupService,
    RequestPlungingComponent,
    RequestPlungingDialogComponent,
    RequestPlungingPopupComponent,
    RequestPlungingDeletePopupComponent,
    RequestPlungingDeleteDialogComponent,
    requestPlungingRoute,
    requestPlungingPopupRoute,
    RequestPlungingResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...requestPlungingRoute,
    ...requestPlungingPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RequestPlungingComponent,
        RequestPlungingDialogComponent,
        RequestPlungingDeleteDialogComponent,
        RequestPlungingPopupComponent,
        RequestPlungingDeletePopupComponent,
    ],
    entryComponents: [
        RequestPlungingComponent,
        RequestPlungingDialogComponent,
        RequestPlungingPopupComponent,
        RequestPlungingDeleteDialogComponent,
        RequestPlungingDeletePopupComponent,
    ],
    providers: [
        RequestPlungingService,
        RequestPlungingPopupService,
        RequestPlungingResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayRequestPlungingModule {}
