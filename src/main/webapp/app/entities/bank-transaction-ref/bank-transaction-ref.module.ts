import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    BankTransactionRefService,
    BankTransactionRefPopupService,
    BankTransactionRefComponent,
    BankTransactionRefDetailComponent,
    BankTransactionRefDialogComponent,
    BankTransactionRefPopupComponent,
    BankTransactionRefDeletePopupComponent,
    BankTransactionRefDeleteDialogComponent,
    bankTransactionRefRoute,
    bankTransactionRefPopupRoute,
    BankTransactionRefResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...bankTransactionRefRoute,
    ...bankTransactionRefPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BankTransactionRefComponent,
        BankTransactionRefDetailComponent,
        BankTransactionRefDialogComponent,
        BankTransactionRefDeleteDialogComponent,
        BankTransactionRefPopupComponent,
        BankTransactionRefDeletePopupComponent,
    ],
    entryComponents: [
        BankTransactionRefComponent,
        BankTransactionRefDialogComponent,
        BankTransactionRefPopupComponent,
        BankTransactionRefDeleteDialogComponent,
        BankTransactionRefDeletePopupComponent,
    ],
    providers: [
        BankTransactionRefService,
        BankTransactionRefPopupService,
        BankTransactionRefResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayBankTransactionRefModule {}
