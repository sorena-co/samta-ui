import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    OrderProductService,
    OrderProductPopupService,
    OrderProductComponent,
    OrderProductDetailComponent,
    OrderProductDialogComponent,
    OrderProductPopupComponent,
    OrderProductDeletePopupComponent,
    OrderProductDeleteDialogComponent,
    orderProductRoute,
    orderProductPopupRoute,
    OrderProductResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...orderProductRoute,
    ...orderProductPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        OrderProductComponent,
        OrderProductDetailComponent,
        OrderProductDialogComponent,
        OrderProductDeleteDialogComponent,
        OrderProductPopupComponent,
        OrderProductDeletePopupComponent,
    ],
    entryComponents: [
        OrderProductComponent,
        OrderProductDialogComponent,
        OrderProductPopupComponent,
        OrderProductDeleteDialogComponent,
        OrderProductDeletePopupComponent,
    ],
    providers: [
        OrderProductService,
        OrderProductPopupService,
        OrderProductResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayOrderProductModule {}
