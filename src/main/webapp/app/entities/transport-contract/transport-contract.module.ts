import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    TransportContractService,
    TransportContractPopupService,
    TransportContractComponent,
    TransportContractDialogComponent,
    TransportContractPopupComponent,
    TransportContractDeletePopupComponent,
    TransportContractDeleteDialogComponent,
    transportContractRoute,
    transportContractPopupRoute,
    TransportContractResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...transportContractRoute,
    ...transportContractPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TransportContractComponent,
        TransportContractDialogComponent,
        TransportContractDeleteDialogComponent,
        TransportContractPopupComponent,
        TransportContractDeletePopupComponent,
    ],
    entryComponents: [
        TransportContractComponent,
        TransportContractDialogComponent,
        TransportContractPopupComponent,
        TransportContractDeleteDialogComponent,
        TransportContractDeletePopupComponent,
    ],
    providers: [
        TransportContractService,
        TransportContractPopupService,
        TransportContractResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayTransportContractModule {}
