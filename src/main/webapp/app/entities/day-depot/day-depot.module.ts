import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    DayDepotService,
    DayDepotPopupService,
    DayDepotComponent,
    DayDepotDialogComponent,
    DayDepotPopupComponent,
    DayDepotDeletePopupComponent,
    FullEndMeasurementPopupComponent,
    FullEndMeasurementDialogComponent,
    DayDepotDeleteDialogComponent,
    dayDepotRoute,
    dayDepotPopupRoute,
    DayDepotResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...dayDepotRoute,
    ...dayDepotPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DayDepotComponent,
        DayDepotDialogComponent,
        DayDepotDeleteDialogComponent,
        FullEndMeasurementPopupComponent,
        FullEndMeasurementDialogComponent,
        DayDepotPopupComponent,
        DayDepotDeletePopupComponent,
    ],
    entryComponents: [
        DayDepotComponent,
        DayDepotDialogComponent,
        DayDepotPopupComponent,
        DayDepotDeleteDialogComponent,
        DayDepotDeletePopupComponent,
        FullEndMeasurementPopupComponent,
        FullEndMeasurementDialogComponent,
    ],
    providers: [
        DayDepotService,
        DayDepotPopupService,
        DayDepotResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayDayDepotModule {}
