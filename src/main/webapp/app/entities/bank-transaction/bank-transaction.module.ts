import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    BankTransactionService,
    BankTransactionPopupService,
    BankTransactionComponent,
    BankTransactionDetailComponent,
    BankTransactionDialogComponent,
    BankTransactionPopupComponent,
    BankTransactionDeletePopupComponent,
    BankTransactionDeleteDialogComponent,
    bankTransactionRoute,
    bankTransactionPopupRoute,
    BankTransactionResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...bankTransactionRoute,
    ...bankTransactionPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BankTransactionComponent,
        BankTransactionDetailComponent,
        BankTransactionDialogComponent,
        BankTransactionDeleteDialogComponent,
        BankTransactionPopupComponent,
        BankTransactionDeletePopupComponent,
    ],
    entryComponents: [
        BankTransactionComponent,
        BankTransactionDialogComponent,
        BankTransactionPopupComponent,
        BankTransactionDeleteDialogComponent,
        BankTransactionDeletePopupComponent,
    ],
    providers: [
        BankTransactionService,
        BankTransactionPopupService,
        BankTransactionResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayBankTransactionModule {}
