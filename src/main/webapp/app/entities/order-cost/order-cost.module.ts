import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    OrderCostService,
    OrderCostPopupService,
    OrderCostComponent,
    OrderCostDialogComponent,
    OrderCostPopupComponent,
    OrderCostDeletePopupComponent,
    OrderCostDeleteDialogComponent,
    orderCostRoute,
    orderCostPopupRoute,
    OrderCostResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...orderCostRoute,
    ...orderCostPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        OrderCostComponent,
        OrderCostDialogComponent,
        OrderCostDeleteDialogComponent,
        OrderCostPopupComponent,
        OrderCostDeletePopupComponent,
    ],
    entryComponents: [
        OrderCostComponent,
        OrderCostDialogComponent,
        OrderCostPopupComponent,
        OrderCostDeleteDialogComponent,
        OrderCostDeletePopupComponent,
    ],
    providers: [
        OrderCostService,
        OrderCostPopupService,
        OrderCostResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayOrderCostModule {}
