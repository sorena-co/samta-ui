import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    VoucherPaymentService,
    VoucherPaymentPopupService,
    VoucherPaymentComponent,
    VoucherPaymentDialogComponent,
    VoucherPaymentPopupComponent,
    VoucherPaymentDeletePopupComponent,
    VoucherPaymentDeleteDialogComponent,
    voucherPaymentRoute,
    voucherPaymentPopupRoute,
    VoucherPaymentResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...voucherPaymentRoute,
    ...voucherPaymentPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        VoucherPaymentComponent,
        VoucherPaymentDialogComponent,
        VoucherPaymentDeleteDialogComponent,
        VoucherPaymentPopupComponent,
        VoucherPaymentDeletePopupComponent,
    ],
    entryComponents: [
        VoucherPaymentComponent,
        VoucherPaymentDialogComponent,
        VoucherPaymentPopupComponent,
        VoucherPaymentDeleteDialogComponent,
        VoucherPaymentDeletePopupComponent,
    ],
    providers: [
        VoucherPaymentService,
        VoucherPaymentPopupService,
        VoucherPaymentResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayVoucherPaymentModule {}
