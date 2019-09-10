import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    ReceivedProductService,
    ReceivedProductPopupService,
    ReceivedProductComponent,
    ReceivedProductDialogComponent,
    ReceivedProductPopupComponent,
    ReceivedProductDeletePopupComponent,
    ReceivedProductDeleteDialogComponent,
    receivedProductRoute,
    receivedProductPopupRoute,
    ReceivedProductResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...receivedProductRoute,
    ...receivedProductPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ReceivedProductComponent,
        ReceivedProductDialogComponent,
        ReceivedProductDeleteDialogComponent,
        ReceivedProductPopupComponent,
        ReceivedProductDeletePopupComponent,
    ],
    entryComponents: [
        ReceivedProductComponent,
        ReceivedProductDialogComponent,
        ReceivedProductPopupComponent,
        ReceivedProductDeleteDialogComponent,
        ReceivedProductDeletePopupComponent,
    ],
    providers: [
        ReceivedProductService,
        ReceivedProductPopupService,
        ReceivedProductResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayReceivedProductModule {}
