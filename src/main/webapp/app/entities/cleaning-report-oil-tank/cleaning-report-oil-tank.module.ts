import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    CleaningReportOilTankService,
    CleaningReportOilTankPopupService,
    CleaningReportOilTankComponent,
    CleaningReportOilTankDialogComponent,
    CleaningReportOilTankPopupComponent,
    CleaningReportOilTankDeletePopupComponent,
    CleaningReportOilTankDeleteDialogComponent,
    cleaningReportOilTankRoute,
    cleaningReportOilTankPopupRoute,
    CleaningReportOilTankResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...cleaningReportOilTankRoute,
    ...cleaningReportOilTankPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CleaningReportOilTankComponent,
        CleaningReportOilTankDialogComponent,
        CleaningReportOilTankDeleteDialogComponent,
        CleaningReportOilTankPopupComponent,
        CleaningReportOilTankDeletePopupComponent,
    ],
    entryComponents: [
        CleaningReportOilTankComponent,
        CleaningReportOilTankDialogComponent,
        CleaningReportOilTankPopupComponent,
        CleaningReportOilTankDeleteDialogComponent,
        CleaningReportOilTankDeletePopupComponent,
    ],
    providers: [
        CleaningReportOilTankService,
        CleaningReportOilTankPopupService,
        CleaningReportOilTankResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayCleaningReportOilTankModule {}
