import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    AirportService,
    AirportPopupService,
    AirportComponent,
    AirportDialogComponent,
    AirportPopupComponent,
    AirportDeletePopupComponent,
    AirportDeleteDialogComponent,
    airportRoute,
    airportPopupRoute,
    AirportResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...airportRoute,
    ...airportPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        AirportComponent,
        AirportDialogComponent,
        AirportDeleteDialogComponent,
        AirportPopupComponent,
        AirportDeletePopupComponent,
    ],
    entryComponents: [
        AirportComponent,
        AirportDialogComponent,
        AirportPopupComponent,
        AirportDeleteDialogComponent,
        AirportDeletePopupComponent,
    ],
    providers: [
        AirportService,
        AirportPopupService,
        AirportResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayAirportModule {}
