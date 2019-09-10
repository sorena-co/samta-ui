import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    LoanTypeService,
    LoanTypePopupService,
    LoanTypeComponent,
    LoanTypeDialogComponent,
    LoanTypePopupComponent,
    LoanTypeDeletePopupComponent,
    LoanTypeDeleteDialogComponent,
    loanTypeRoute,
    loanTypePopupRoute,
    LoanTypeResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...loanTypeRoute,
    ...loanTypePopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        LoanTypeComponent,
        LoanTypeDialogComponent,
        LoanTypeDeleteDialogComponent,
        LoanTypePopupComponent,
        LoanTypeDeletePopupComponent,
    ],
    entryComponents: [
        LoanTypeComponent,
        LoanTypeDialogComponent,
        LoanTypePopupComponent,
        LoanTypeDeleteDialogComponent,
        LoanTypeDeletePopupComponent,
    ],
    providers: [
        LoanTypeService,
        LoanTypePopupService,
        LoanTypeResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayLoanTypeModule {}
