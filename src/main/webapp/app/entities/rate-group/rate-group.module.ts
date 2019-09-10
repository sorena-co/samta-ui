import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    RateGroupService,
    RateGroupPopupService,
    RateGroupComponent,
    RateGroupDialogComponent,
    RateGroupPopupComponent,
    RateGroupDeletePopupComponent,
    RateGroupDeleteDialogComponent,
    rateGroupRoute,
    rateGroupPopupRoute,
    RateGroupResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...rateGroupRoute,
    ...rateGroupPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RateGroupComponent,
        RateGroupDialogComponent,
        RateGroupDeleteDialogComponent,
        RateGroupPopupComponent,
        RateGroupDeletePopupComponent,
    ],
    entryComponents: [
        RateGroupComponent,
        RateGroupDialogComponent,
        RateGroupPopupComponent,
        RateGroupDeleteDialogComponent,
        RateGroupDeletePopupComponent,
    ],
    providers: [
        RateGroupService,
        RateGroupPopupService,
        RateGroupResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayRateGroupModule {}
