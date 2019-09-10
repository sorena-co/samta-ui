import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    SellGroundFuelService,
    SellGroundFuelPopupService,
    SellGroundFuelComponent,
    SellGroundFuelDialogComponent,
    SellGroundFuelPopupComponent,
    SellGroundFuelDeletePopupComponent,
    SellGroundFuelDeleteDialogComponent,
    sellGroundFuelRoute,
    sellGroundFuelPopupRoute,
    SellGroundFuelResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...sellGroundFuelRoute,
    ...sellGroundFuelPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SellGroundFuelComponent,
        SellGroundFuelDialogComponent,
        SellGroundFuelDeleteDialogComponent,
        SellGroundFuelPopupComponent,
        SellGroundFuelDeletePopupComponent,
    ],
    entryComponents: [
        SellGroundFuelComponent,
        SellGroundFuelDialogComponent,
        SellGroundFuelPopupComponent,
        SellGroundFuelDeleteDialogComponent,
        SellGroundFuelDeletePopupComponent,
    ],
    providers: [
        SellGroundFuelService,
        SellGroundFuelPopupService,
        SellGroundFuelResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewaySellGroundFuelModule {}
