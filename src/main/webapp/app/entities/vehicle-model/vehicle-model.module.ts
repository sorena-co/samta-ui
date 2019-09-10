import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    VehicleModelService,
    VehicleModelPopupService,
    VehicleModelComponent,
    VehicleModelDialogComponent,
    VehicleModelPopupComponent,
    VehicleModelDeletePopupComponent,
    VehicleModelDeleteDialogComponent,
    vehicleModelRoute,
    vehicleModelPopupRoute,
    VehicleModelResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...vehicleModelRoute,
    ...vehicleModelPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        VehicleModelComponent,
        VehicleModelDialogComponent,
        VehicleModelDeleteDialogComponent,
        VehicleModelPopupComponent,
        VehicleModelDeletePopupComponent,
    ],
    entryComponents: [
        VehicleModelComponent,
        VehicleModelDialogComponent,
        VehicleModelPopupComponent,
        VehicleModelDeleteDialogComponent,
        VehicleModelDeletePopupComponent,
    ],
    providers: [
        VehicleModelService,
        VehicleModelPopupService,
        VehicleModelResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayVehicleModelModule {}
