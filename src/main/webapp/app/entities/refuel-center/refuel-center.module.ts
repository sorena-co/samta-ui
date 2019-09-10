import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    RefuelCenterService,
    RefuelCenterPopupService,
    RefuelCenterComponent,
    RefuelCenterDialogComponent,
    RefuelCenterPopupComponent,
    RefuelCenterDeletePopupComponent,
    RefuelCenterDeleteDialogComponent,
    refuelCenterRoute,
    refuelCenterPopupRoute,
    RefuelCenterResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...refuelCenterRoute,
    ...refuelCenterPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RefuelCenterComponent,
        RefuelCenterDialogComponent,
        RefuelCenterDeleteDialogComponent,
        RefuelCenterPopupComponent,
        RefuelCenterDeletePopupComponent,
    ],
    entryComponents: [
        RefuelCenterComponent,
        RefuelCenterDialogComponent,
        RefuelCenterPopupComponent,
        RefuelCenterDeleteDialogComponent,
        RefuelCenterDeletePopupComponent,
    ],
    providers: [
        RefuelCenterService,
        RefuelCenterPopupService,
        RefuelCenterResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayRefuelCenterModule {}
