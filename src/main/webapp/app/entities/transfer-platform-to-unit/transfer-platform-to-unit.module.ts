import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    TransferPlatformToUnitService,
    TransferPlatformToUnitPopupService,
    TransferPlatformToUnitComponent,
    TransferPlatformToUnitDialogComponent,
    TransferPlatformToUnitPopupComponent,
    TransferPlatformToUnitDeletePopupComponent,
    TransferPlatformToUnitDeleteDialogComponent,
    transferPlatformToUnitRoute,
    transferPlatformToUnitPopupRoute,
    TransferPlatformToUnitResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...transferPlatformToUnitRoute,
    ...transferPlatformToUnitPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TransferPlatformToUnitComponent,
        TransferPlatformToUnitDialogComponent,
        TransferPlatformToUnitDeleteDialogComponent,
        TransferPlatformToUnitPopupComponent,
        TransferPlatformToUnitDeletePopupComponent,
    ],
    entryComponents: [
        TransferPlatformToUnitComponent,
        TransferPlatformToUnitDialogComponent,
        TransferPlatformToUnitPopupComponent,
        TransferPlatformToUnitDeleteDialogComponent,
        TransferPlatformToUnitDeletePopupComponent,
    ],
    providers: [
        TransferPlatformToUnitService,
        TransferPlatformToUnitPopupService,
        TransferPlatformToUnitResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayTransferPlatformToUnitModule {}
