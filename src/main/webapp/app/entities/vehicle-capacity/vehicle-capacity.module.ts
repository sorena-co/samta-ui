import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    VehicleCapacityService,
    VehicleCapacityPopupService,
    VehicleCapacityComponent,
    VehicleCapacityDialogComponent,
    VehicleCapacityPopupComponent,
    VehicleCapacityDeletePopupComponent,
    VehicleCapacityDeleteDialogComponent,
    vehicleCapacityRoute,
    vehicleCapacityPopupRoute,
    VehicleCapacityResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...vehicleCapacityRoute,
    ...vehicleCapacityPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        VehicleCapacityComponent,
        VehicleCapacityDialogComponent,
        VehicleCapacityDeleteDialogComponent,
        VehicleCapacityPopupComponent,
        VehicleCapacityDeletePopupComponent,
    ],
    entryComponents: [
        VehicleCapacityComponent,
        VehicleCapacityDialogComponent,
        VehicleCapacityPopupComponent,
        VehicleCapacityDeleteDialogComponent,
        VehicleCapacityDeletePopupComponent,
    ],
    providers: [
        VehicleCapacityService,
        VehicleCapacityPopupService,
        VehicleCapacityResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayVehicleCapacityModule {}
