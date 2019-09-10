import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    OrderPaymentService,
    OrderPaymentPopupService,
    OrderPaymentComponent,
    OrderPaymentDialogComponent,
    OrderPaymentPopupComponent,
    OrderPaymentDeletePopupComponent,
    OrderPaymentDeleteDialogComponent,
    orderPaymentRoute,
    orderPaymentPopupRoute,
    OrderPaymentResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...orderPaymentRoute,
    ...orderPaymentPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        OrderPaymentComponent,
        OrderPaymentDialogComponent,
        OrderPaymentDeleteDialogComponent,
        OrderPaymentPopupComponent,
        OrderPaymentDeletePopupComponent,
    ],
    entryComponents: [
        OrderPaymentComponent,
        OrderPaymentDialogComponent,
        OrderPaymentPopupComponent,
        OrderPaymentDeleteDialogComponent,
        OrderPaymentDeletePopupComponent,
    ],
    providers: [
        OrderPaymentService,
        OrderPaymentPopupService,
        OrderPaymentResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayOrderPaymentModule {}
