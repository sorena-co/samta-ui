import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    LoanService,
    LoanPopupService,
    LoanComponent,
    LoanDialogComponent,
    LoanPopupComponent,
    LoanDeletePopupComponent,
    LoanDeleteDialogComponent,
    loanRoute,
    loanPopupRoute,
    LoanResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...loanRoute,
    ...loanPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        LoanComponent,
        LoanDialogComponent,
        LoanDeleteDialogComponent,
        LoanPopupComponent,
        LoanDeletePopupComponent,
    ],
    entryComponents: [
        LoanComponent,
        LoanDialogComponent,
        LoanPopupComponent,
        LoanDeleteDialogComponent,
        LoanDeletePopupComponent,
    ],
    providers: [
        LoanService,
        LoanPopupService,
        LoanResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayLoanModule {}
