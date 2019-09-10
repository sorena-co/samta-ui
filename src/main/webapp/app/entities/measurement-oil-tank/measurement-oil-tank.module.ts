import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    MeasurementOilTankService,
    MeasurementOilTankPopupService,
    MeasurementOilTankComponent,
    MeasurementOilTankDialogComponent,
    MeasurementOilTankPopupComponent,
    MeasurementOilTankDeletePopupComponent,
    MeasurementOilTankDeleteDialogComponent,
    measurementOilTankRoute,
    measurementOilTankPopupRoute,
    MeasurementOilTankResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...measurementOilTankRoute,
    ...measurementOilTankPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MeasurementOilTankComponent,
        MeasurementOilTankDialogComponent,
        MeasurementOilTankDeleteDialogComponent,
        MeasurementOilTankPopupComponent,
        MeasurementOilTankDeletePopupComponent,
    ],
    entryComponents: [
        MeasurementOilTankComponent,
        MeasurementOilTankDialogComponent,
        MeasurementOilTankPopupComponent,
        MeasurementOilTankDeleteDialogComponent,
        MeasurementOilTankDeletePopupComponent,
    ],
    providers: [
        MeasurementOilTankService,
        MeasurementOilTankPopupService,
        MeasurementOilTankResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayMeasurementOilTankModule {}
