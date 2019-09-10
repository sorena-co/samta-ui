import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    CurrencyRateGroupService,
    CurrencyRateGroupPopupService,
    CurrencyRateGroupComponent,
    CurrencyRateGroupDialogComponent,
    CurrencyRateGroupPopupComponent,
    CurrencyRateGroupDeletePopupComponent,
    CurrencyRateGroupDeleteDialogComponent,
    currencyRateGroupRoute,
    currencyRateGroupPopupRoute,
    CurrencyRateGroupResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...currencyRateGroupRoute,
    ...currencyRateGroupPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CurrencyRateGroupComponent,
        CurrencyRateGroupDialogComponent,
        CurrencyRateGroupDeleteDialogComponent,
        CurrencyRateGroupPopupComponent,
        CurrencyRateGroupDeletePopupComponent,
    ],
    entryComponents: [
        CurrencyRateGroupComponent,
        CurrencyRateGroupDialogComponent,
        CurrencyRateGroupPopupComponent,
        CurrencyRateGroupDeleteDialogComponent,
        CurrencyRateGroupDeletePopupComponent,
    ],
    providers: [
        CurrencyRateGroupService,
        CurrencyRateGroupPopupService,
        CurrencyRateGroupResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayCurrencyRateGroupModule {}
