import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    SellContractPersonService,
    SellContractPersonPopupService,
    SellContractPersonComponent,
    SellContractPersonDialogComponent,
    SellContractPersonPopupComponent,
    SellContractPersonDeletePopupComponent,
    SellContractPersonDeleteDialogComponent,
    sellContractPersonRoute,
    sellContractPersonPopupRoute,
    SellContractPersonResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...sellContractPersonRoute,
    ...sellContractPersonPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SellContractPersonComponent,
        SellContractPersonDialogComponent,
        SellContractPersonDeleteDialogComponent,
        SellContractPersonPopupComponent,
        SellContractPersonDeletePopupComponent,
    ],
    entryComponents: [
        SellContractPersonComponent,
        SellContractPersonDialogComponent,
        SellContractPersonPopupComponent,
        SellContractPersonDeleteDialogComponent,
        SellContractPersonDeletePopupComponent,
    ],
    providers: [
        SellContractPersonService,
        SellContractPersonPopupService,
        SellContractPersonResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewaySellContractPersonModule {}
