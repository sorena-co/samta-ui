import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    TransferService,
    TransferPopupService,
    TransferComponent,
    TransferDialogComponent,
    TransferPopupComponent,
    TransferDeletePopupComponent,
    TransferDeleteDialogComponent,
    transferRoute,
    transferPopupRoute,
    TransferResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...transferRoute,
    ...transferPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TransferComponent,
        TransferDialogComponent,
        TransferDeleteDialogComponent,
        TransferPopupComponent,
        TransferDeletePopupComponent,
    ],
    entryComponents: [
        TransferComponent,
        TransferDialogComponent,
        TransferPopupComponent,
        TransferDeleteDialogComponent,
        TransferDeletePopupComponent,
    ],
    providers: [
        TransferService,
        TransferPopupService,
        TransferResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayTransferModule {}
