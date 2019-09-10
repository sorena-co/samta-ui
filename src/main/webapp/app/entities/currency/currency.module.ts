import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    CurrencyService,
    CurrencyPopupService,
    CurrencyComponent,
    CurrencyDialogComponent,
    CurrencyPopupComponent,
    CurrencyDeletePopupComponent,
    CurrencyDeleteDialogComponent,
    currencyRoute,
    currencyPopupRoute,
    CurrencyResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...currencyRoute,
    ...currencyPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CurrencyComponent,
        CurrencyDialogComponent,
        CurrencyDeleteDialogComponent,
        CurrencyPopupComponent,
        CurrencyDeletePopupComponent,
    ],
    entryComponents: [
        CurrencyComponent,
        CurrencyDialogComponent,
        CurrencyPopupComponent,
        CurrencyDeleteDialogComponent,
        CurrencyDeletePopupComponent,
    ],
    providers: [
        CurrencyService,
        CurrencyPopupService,
        CurrencyResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayCurrencyModule {}
