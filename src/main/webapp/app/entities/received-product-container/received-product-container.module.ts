import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    ReceivedProductContainerService,
    ReceivedProductContainerPopupService,
    ReceivedProductContainerComponent,
    ReceivedProductContainerDialogComponent,
    ReceivedProductContainerPopupComponent,
    ReceivedProductContainerDeletePopupComponent,
    ReceivedProductContainerDeleteDialogComponent,
    receivedProductContainerRoute,
    receivedProductContainerPopupRoute,
    ReceivedProductContainerResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...receivedProductContainerRoute,
    ...receivedProductContainerPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ReceivedProductContainerComponent,
        ReceivedProductContainerDialogComponent,
        ReceivedProductContainerDeleteDialogComponent,
        ReceivedProductContainerPopupComponent,
        ReceivedProductContainerDeletePopupComponent,
    ],
    entryComponents: [
        ReceivedProductContainerComponent,
        ReceivedProductContainerDialogComponent,
        ReceivedProductContainerPopupComponent,
        ReceivedProductContainerDeleteDialogComponent,
        ReceivedProductContainerDeletePopupComponent,
    ],
    providers: [
        ReceivedProductContainerService,
        ReceivedProductContainerPopupService,
        ReceivedProductContainerResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayReceivedProductContainerModule {}
