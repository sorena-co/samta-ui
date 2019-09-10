import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    RequestFilterElementService,
    RequestFilterElementPopupService,
    RequestFilterElementComponent,
    RequestFilterElementDialogComponent,
    RequestFilterElementPopupComponent,
    RequestFilterElementDeletePopupComponent,
    RequestFilterElementDeleteDialogComponent,
    requestFilterElementRoute,
    requestFilterElementPopupRoute,
    RequestFilterElementResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...requestFilterElementRoute,
    ...requestFilterElementPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RequestFilterElementComponent,
        RequestFilterElementDialogComponent,
        RequestFilterElementDeleteDialogComponent,
        RequestFilterElementPopupComponent,
        RequestFilterElementDeletePopupComponent,
    ],
    entryComponents: [
        RequestFilterElementComponent,
        RequestFilterElementDialogComponent,
        RequestFilterElementPopupComponent,
        RequestFilterElementDeleteDialogComponent,
        RequestFilterElementDeletePopupComponent,
    ],
    providers: [
        RequestFilterElementService,
        RequestFilterElementPopupService,
        RequestFilterElementResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayRequestFilterElementModule {}
