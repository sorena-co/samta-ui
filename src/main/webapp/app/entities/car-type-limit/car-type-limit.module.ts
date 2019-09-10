import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    CarTypeLimitService,
    CarTypeLimitPopupService,
    CarTypeLimitComponent,
    CarTypeLimitDialogComponent,
    CarTypeLimitPopupComponent,
    CarTypeLimitDeletePopupComponent,
    CarTypeLimitDeleteDialogComponent,
    carTypeLimitRoute,
    carTypeLimitPopupRoute,
    CarTypeLimitResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...carTypeLimitRoute,
    ...carTypeLimitPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CarTypeLimitComponent,
        CarTypeLimitDialogComponent,
        CarTypeLimitDeleteDialogComponent,
        CarTypeLimitPopupComponent,
        CarTypeLimitDeletePopupComponent,
    ],
    entryComponents: [
        CarTypeLimitComponent,
        CarTypeLimitDialogComponent,
        CarTypeLimitPopupComponent,
        CarTypeLimitDeleteDialogComponent,
        CarTypeLimitDeletePopupComponent,
    ],
    providers: [
        CarTypeLimitService,
        CarTypeLimitPopupService,
        CarTypeLimitResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayCarTypeLimitModule {}
