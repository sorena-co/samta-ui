import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    PaymentBillService,
    PaymentBillPopupService,
    PaymentBillComponent,
    PaymentBillDialogComponent,
    PaymentBillPopupComponent,
    PaymentBillDeletePopupComponent,
    PaymentBillDeleteDialogComponent,
    paymentBillRoute,
    paymentBillPopupRoute,
    PaymentBillResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...paymentBillRoute,
    ...paymentBillPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PaymentBillComponent,
        PaymentBillDialogComponent,
        PaymentBillDeleteDialogComponent,
        PaymentBillPopupComponent,
        PaymentBillDeletePopupComponent,
    ],
    entryComponents: [
        PaymentBillComponent,
        PaymentBillDialogComponent,
        PaymentBillPopupComponent,
        PaymentBillDeleteDialogComponent,
        PaymentBillDeletePopupComponent,
    ],
    providers: [
        PaymentBillService,
        PaymentBillPopupService,
        PaymentBillResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayPaymentBillModule {}
