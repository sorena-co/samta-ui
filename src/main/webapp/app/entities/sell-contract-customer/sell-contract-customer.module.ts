import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    SellContractCustomerService,
    SellContractCustomerPopupService,
    SellContractCustomerComponent,
    SellContractCustomerDetailComponent,
    SellContractCustomerDialogComponent,
    SellContractCustomerPopupComponent,
    SellContractCustomerDeletePopupComponent,
    SellContractCustomerDeleteDialogComponent,
    sellContractCustomerRoute,
    sellContractCustomerPopupRoute,
    SellContractCustomerResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...sellContractCustomerRoute,
    ...sellContractCustomerPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SellContractCustomerComponent,
        SellContractCustomerDetailComponent,
        SellContractCustomerDialogComponent,
        SellContractCustomerDeleteDialogComponent,
        SellContractCustomerPopupComponent,
        SellContractCustomerDeletePopupComponent,
    ],
    entryComponents: [
        SellContractCustomerComponent,
        SellContractCustomerDialogComponent,
        SellContractCustomerPopupComponent,
        SellContractCustomerDeleteDialogComponent,
        SellContractCustomerDeletePopupComponent,
    ],
    providers: [
        SellContractCustomerService,
        SellContractCustomerPopupService,
        SellContractCustomerResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewaySellContractCustomerModule {}
