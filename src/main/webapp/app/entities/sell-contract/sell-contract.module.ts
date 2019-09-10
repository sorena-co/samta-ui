import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    SellContractService,
    SellContractPopupService,
    SellContractComponent,
    SellContractDialogComponent,
    SellContractDeletePopupComponent,
    SellContractDeleteDialogComponent,
    SellContractConfirmPopupComponent,
    SellContractConfirmDialogComponent,
    sellContractRoute,
    sellContractPopupRoute,
    SellContractResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...sellContractRoute,
    ...sellContractPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SellContractComponent,
        SellContractDialogComponent,
        SellContractDeleteDialogComponent,
        SellContractDeletePopupComponent,
        SellContractConfirmDialogComponent,
        SellContractConfirmPopupComponent,
    ],
    entryComponents: [
        SellContractComponent,
        SellContractDialogComponent,
        SellContractDeleteDialogComponent,
        SellContractDeletePopupComponent,
        SellContractConfirmDialogComponent,
        SellContractConfirmPopupComponent,
    ],
    providers: [
        SellContractService,
        SellContractPopupService,
        SellContractResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewaySellContractModule {}
