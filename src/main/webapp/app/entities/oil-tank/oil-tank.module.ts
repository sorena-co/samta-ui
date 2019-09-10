import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    OilTankService,
    OilTankPopupService,
    OilTankComponent,
    OilTankDialogComponent,
    OilTankPopupComponent,
    OilTankDeletePopupComponent,
    OilTankDeleteDialogComponent,
    oilTankRoute,
    oilTankPopupRoute,
    OilTankResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...oilTankRoute,
    ...oilTankPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        OilTankComponent,
        OilTankDialogComponent,
        OilTankDeleteDialogComponent,
        OilTankPopupComponent,
        OilTankDeletePopupComponent,
    ],
    entryComponents: [
        OilTankComponent,
        OilTankDialogComponent,
        OilTankPopupComponent,
        OilTankDeleteDialogComponent,
        OilTankDeletePopupComponent,
    ],
    providers: [
        OilTankService,
        OilTankPopupService,
        OilTankResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayOilTankModule {}
