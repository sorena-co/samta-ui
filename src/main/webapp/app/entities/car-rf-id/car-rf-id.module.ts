import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    CarRfIdService,
    CarRfIdPopupService,
    CarRfIdComponent,
    CarRfIdDialogComponent,
    CarRfIdPopupComponent,
    CarRfIdDeletePopupComponent,
    CarRfIdDeleteDialogComponent,
    carRfIdRoute,
    carRfIdPopupRoute,
    CarRfIdResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...carRfIdRoute,
    ...carRfIdPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CarRfIdComponent,
        CarRfIdDialogComponent,
        CarRfIdDeleteDialogComponent,
        CarRfIdPopupComponent,
        CarRfIdDeletePopupComponent,
    ],
    entryComponents: [
        CarRfIdComponent,
        CarRfIdDialogComponent,
        CarRfIdPopupComponent,
        CarRfIdDeleteDialogComponent,
        CarRfIdDeletePopupComponent,
    ],
    providers: [
        CarRfIdService,
        CarRfIdPopupService,
        CarRfIdResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayCarRfIdModule {}
