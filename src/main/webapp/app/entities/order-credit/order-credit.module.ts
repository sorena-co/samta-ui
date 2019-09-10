import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    OrderCreditService,
    OrderCreditPopupService,
    OrderCreditComponent,
    OrderCreditDetailComponent,
    OrderCreditDialogComponent,
    OrderCreditPopupComponent,
    OrderCreditDeletePopupComponent,
    OrderCreditDeleteDialogComponent,
    orderCreditRoute,
    orderCreditPopupRoute,
    OrderCreditResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...orderCreditRoute,
    ...orderCreditPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        OrderCreditComponent,
        OrderCreditDetailComponent,
        OrderCreditDialogComponent,
        OrderCreditDeleteDialogComponent,
        OrderCreditPopupComponent,
        OrderCreditDeletePopupComponent,
    ],
    entryComponents: [
        OrderCreditComponent,
        OrderCreditDialogComponent,
        OrderCreditPopupComponent,
        OrderCreditDeleteDialogComponent,
        OrderCreditDeletePopupComponent,
    ],
    providers: [
        OrderCreditService,
        OrderCreditPopupService,
        OrderCreditResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayOrderCreditModule {}
