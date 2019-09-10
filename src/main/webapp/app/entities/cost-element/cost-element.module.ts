import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    CostElementService,
    CostElementPopupService,
    CostElementComponent,
    CostElementDialogComponent,
    CostElementPopupComponent,
    CostElementDeletePopupComponent,
    CostElementDeleteDialogComponent,
    costElementRoute,
    costElementPopupRoute,
    CostElementResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...costElementRoute,
    ...costElementPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CostElementComponent,
        CostElementDialogComponent,
        CostElementDeleteDialogComponent,
        CostElementPopupComponent,
        CostElementDeletePopupComponent,
    ],
    entryComponents: [
        CostElementComponent,
        CostElementDialogComponent,
        CostElementPopupComponent,
        CostElementDeleteDialogComponent,
        CostElementDeletePopupComponent,
    ],
    providers: [
        CostElementService,
        CostElementPopupService,
        CostElementResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayCostElementModule {}
