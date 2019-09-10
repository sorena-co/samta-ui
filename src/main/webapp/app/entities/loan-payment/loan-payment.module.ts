import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    LoanPaymentService,
    LoanPaymentPopupService,
    LoanPaymentComponent,
    LoanPaymentDetailComponent,
    LoanPaymentDialogComponent,
    LoanPaymentPopupComponent,
    LoanPaymentDeletePopupComponent,
    LoanPaymentDeleteDialogComponent,
    loanPaymentRoute,
    loanPaymentPopupRoute,
    LoanPaymentResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...loanPaymentRoute,
    ...loanPaymentPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LoanPaymentComponent,
        LoanPaymentDetailComponent,
        LoanPaymentDialogComponent,
        LoanPaymentDeleteDialogComponent,
        LoanPaymentPopupComponent,
        LoanPaymentDeletePopupComponent,
    ],
    entryComponents: [
        LoanPaymentComponent,
        LoanPaymentDialogComponent,
        LoanPaymentPopupComponent,
        LoanPaymentDeleteDialogComponent,
        LoanPaymentDeletePopupComponent,
    ],
    providers: [
        LoanPaymentService,
        LoanPaymentPopupService,
        LoanPaymentResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayLoanPaymentModule {}
