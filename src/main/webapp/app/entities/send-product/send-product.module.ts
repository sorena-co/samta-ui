import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    SendProductService,
    SendProductPopupService,
    SendProductComponent,
    SendProductDialogComponent,
    SendProductPopupComponent,
    SendProductDeletePopupComponent,
    SendProductDeleteDialogComponent,
    sendProductRoute,
    sendProductPopupRoute,
    SendProductResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...sendProductRoute,
    ...sendProductPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SendProductComponent,
        SendProductDialogComponent,
        SendProductDeleteDialogComponent,
        SendProductPopupComponent,
        SendProductDeletePopupComponent,
    ],
    entryComponents: [
        SendProductComponent,
        SendProductDialogComponent,
        SendProductPopupComponent,
        SendProductDeleteDialogComponent,
        SendProductDeletePopupComponent,
    ],
    providers: [
        SendProductService,
        SendProductPopupService,
        SendProductResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewaySendProductModule {}
