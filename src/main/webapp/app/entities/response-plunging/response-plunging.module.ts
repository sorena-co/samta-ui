import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    ResponsePlungingService,
    ResponsePlungingPopupService,
    ResponsePlungingComponent,
    ResponsePlungingDialogComponent,
    ResponsePlungingPopupComponent,
    ResponsePlungingDeletePopupComponent,
    ResponsePlungingDeleteDialogComponent,
    responsePlungingRoute,
    responsePlungingPopupRoute,
    ResponsePlungingResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...responsePlungingRoute,
    ...responsePlungingPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ResponsePlungingComponent,
        ResponsePlungingDialogComponent,
        ResponsePlungingDeleteDialogComponent,
        ResponsePlungingPopupComponent,
        ResponsePlungingDeletePopupComponent,
    ],
    entryComponents: [
        ResponsePlungingComponent,
        ResponsePlungingDialogComponent,
        ResponsePlungingPopupComponent,
        ResponsePlungingDeleteDialogComponent,
        ResponsePlungingDeletePopupComponent,
    ],
    providers: [
        ResponsePlungingService,
        ResponsePlungingPopupService,
        ResponsePlungingResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayResponsePlungingModule {}
