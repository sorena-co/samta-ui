import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    SellContractProductService,
    SellContractProductPopupService,
    SellContractProductComponent,
    SellContractProductDialogComponent,
    SellContractProductPopupComponent,
    SellContractProductDeletePopupComponent,
    SellContractProductDeleteDialogComponent,
    sellContractProductRoute,
    sellContractProductPopupRoute,
    SellContractProductResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...sellContractProductRoute,
    ...sellContractProductPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SellContractProductComponent,
        SellContractProductDialogComponent,
        SellContractProductDeleteDialogComponent,
        SellContractProductPopupComponent,
        SellContractProductDeletePopupComponent,
    ],
    entryComponents: [
        SellContractProductComponent,
        SellContractProductDialogComponent,
        SellContractProductPopupComponent,
        SellContractProductDeleteDialogComponent,
        SellContractProductDeletePopupComponent,
    ],
    providers: [
        SellContractProductService,
        SellContractProductPopupService,
        SellContractProductResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewaySellContractProductModule {}
