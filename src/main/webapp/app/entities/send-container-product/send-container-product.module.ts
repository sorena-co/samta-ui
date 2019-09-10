import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    SendContainerProductService,
    SendContainerProductPopupService,
    SendContainerProductComponent,
    SendContainerProductDialogComponent,
    SendContainerProductPopupComponent,
    SendContainerProductDeletePopupComponent,
    SendContainerProductDeleteDialogComponent,
    sendContainerProductRoute,
    sendContainerProductPopupRoute,
    SendContainerProductResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...sendContainerProductRoute,
    ...sendContainerProductPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SendContainerProductComponent,
        SendContainerProductDialogComponent,
        SendContainerProductDeleteDialogComponent,
        SendContainerProductPopupComponent,
        SendContainerProductDeletePopupComponent,
    ],
    entryComponents: [
        SendContainerProductComponent,
        SendContainerProductDialogComponent,
        SendContainerProductPopupComponent,
        SendContainerProductDeleteDialogComponent,
        SendContainerProductDeletePopupComponent,
    ],
    providers: [
        SendContainerProductService,
        SendContainerProductPopupService,
        SendContainerProductResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewaySendContainerProductModule {}
