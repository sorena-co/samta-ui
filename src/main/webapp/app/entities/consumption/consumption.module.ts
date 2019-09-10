import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    ConsumptionService,
    ConsumptionPopupService,
    ConsumptionComponent,
    ConsumptionDialogComponent,
    ConsumptionPopupComponent,
    ConsumptionDeletePopupComponent,
    ConsumptionDeleteDialogComponent,
    consumptionRoute,
    consumptionPopupRoute,
    ConsumptionResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...consumptionRoute,
    ...consumptionPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ConsumptionComponent,
        ConsumptionDialogComponent,
        ConsumptionDeleteDialogComponent,
        ConsumptionPopupComponent,
        ConsumptionDeletePopupComponent,
    ],
    entryComponents: [
        ConsumptionComponent,
        ConsumptionDialogComponent,
        ConsumptionPopupComponent,
        ConsumptionDeleteDialogComponent,
        ConsumptionDeletePopupComponent,
    ],
    providers: [
        ConsumptionService,
        ConsumptionPopupService,
        ConsumptionResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayConsumptionModule {}
