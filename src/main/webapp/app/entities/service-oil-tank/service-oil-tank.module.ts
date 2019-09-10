import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    ServiceOilTankService,
    ServiceOilTankPopupService,
    ServiceOilTankComponent,
    ServiceOilTankDialogComponent,
    ServiceOilTankPopupComponent,
    ServiceOilTankDeletePopupComponent,
    ServiceOilTankDeleteDialogComponent,
    serviceOilTankRoute,
    serviceOilTankPopupRoute,
    ServiceOilTankResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...serviceOilTankRoute,
    ...serviceOilTankPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ServiceOilTankComponent,
        ServiceOilTankDialogComponent,
        ServiceOilTankDeleteDialogComponent,
        ServiceOilTankPopupComponent,
        ServiceOilTankDeletePopupComponent,
    ],
    entryComponents: [
        ServiceOilTankComponent,
        ServiceOilTankDialogComponent,
        ServiceOilTankPopupComponent,
        ServiceOilTankDeleteDialogComponent,
        ServiceOilTankDeletePopupComponent,
    ],
    providers: [
        ServiceOilTankService,
        ServiceOilTankPopupService,
        ServiceOilTankResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayServiceOilTankModule {}
