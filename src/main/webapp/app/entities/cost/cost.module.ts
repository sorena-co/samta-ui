import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {NiopdcgatewaySharedModule} from '../../shared';
import {
    CostComponent,
    CostDeleteDialogComponent,
    CostDeletePopupComponent,
    CostDialogComponent,
    CostPopupComponent,
    costPopupRoute,
    CostPopupService,
    CostResolvePagingParams,
    costRoute,
    CostService,
} from './';

const ENTITY_STATES = [
    ...costRoute,
    ...costPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CostComponent,
        CostDialogComponent,
        CostDeleteDialogComponent,
        CostPopupComponent,
        CostDeletePopupComponent,
    ],
    entryComponents: [
        CostComponent,
        CostDialogComponent,
        CostPopupComponent,
        CostDeleteDialogComponent,
        CostDeletePopupComponent,
    ],
    providers: [
        CostService,
        CostPopupService,
        CostResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayCostModule {
}
