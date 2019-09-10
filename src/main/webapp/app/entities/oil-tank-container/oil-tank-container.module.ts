import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    OilTankContainerService,
    OilTankContainerPopupService,
    OilTankContainerComponent,
    OilTankContainerDialogComponent,
    OilTankContainerPopupComponent,
    OilTankContainerDeletePopupComponent,
    OilTankContainerDeleteDialogComponent,
    oilTankContainerRoute,
    oilTankContainerPopupRoute,
    OilTankContainerResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...oilTankContainerRoute,
    ...oilTankContainerPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        OilTankContainerComponent,
        OilTankContainerDialogComponent,
        OilTankContainerDeleteDialogComponent,
        OilTankContainerPopupComponent,
        OilTankContainerDeletePopupComponent,
    ],
    entryComponents: [
        OilTankContainerComponent,
        OilTankContainerDialogComponent,
        OilTankContainerPopupComponent,
        OilTankContainerDeleteDialogComponent,
        OilTankContainerDeletePopupComponent,
    ],
    providers: [
        OilTankContainerService,
        OilTankContainerPopupService,
        OilTankContainerResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayOilTankContainerModule {}
