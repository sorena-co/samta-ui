import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    DayDepotServiceOilTankService,
    DayDepotServiceOilTankPopupService,
    DayDepotServiceOilTankComponent,
    DayDepotServiceOilTankDialogComponent,
    DayDepotServiceOilTankPopupComponent,
    DayDepotServiceOilTankDeletePopupComponent,
    DayDepotServiceOilTankDeleteDialogComponent,
    FullEndMeasurementPopupComponent,
    FullEndMeasurementDialogComponent,
    dayDepotServiceOilTankRoute,
    dayDepotServiceOilTankPopupRoute,
    DayDepotServiceOilTankResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...dayDepotServiceOilTankRoute,
    ...dayDepotServiceOilTankPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DayDepotServiceOilTankComponent,
        DayDepotServiceOilTankDialogComponent,
        DayDepotServiceOilTankDeleteDialogComponent,
        DayDepotServiceOilTankPopupComponent,
        DayDepotServiceOilTankDeletePopupComponent,
        FullEndMeasurementPopupComponent,
        FullEndMeasurementDialogComponent,
    ],
    entryComponents: [
        DayDepotServiceOilTankComponent,
        DayDepotServiceOilTankDialogComponent,
        DayDepotServiceOilTankPopupComponent,
        DayDepotServiceOilTankDeleteDialogComponent,
        DayDepotServiceOilTankDeletePopupComponent,
        FullEndMeasurementPopupComponent,
        FullEndMeasurementDialogComponent,
    ],
    providers: [
        DayDepotServiceOilTankService,
        DayDepotServiceOilTankPopupService,
        DayDepotServiceOilTankResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayDayDepotServiceOilTankModule {}
