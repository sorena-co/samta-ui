import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    CarTypeService,
    CarTypePopupService,
    CarTypeComponent,
    CarTypeDialogComponent,
    CarTypePopupComponent,
    CarTypeDeletePopupComponent,
    CarTypeDeleteDialogComponent,
    carTypeRoute,
    carTypePopupRoute,
    CarTypeResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...carTypeRoute,
    ...carTypePopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CarTypeComponent,
        CarTypeDialogComponent,
        CarTypeDeleteDialogComponent,
        CarTypePopupComponent,
        CarTypeDeletePopupComponent,
    ],
    entryComponents: [
        CarTypeComponent,
        CarTypeDialogComponent,
        CarTypePopupComponent,
        CarTypeDeleteDialogComponent,
        CarTypeDeletePopupComponent,
    ],
    providers: [
        CarTypeService,
        CarTypePopupService,
        CarTypeResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayCarTypeModule {}
