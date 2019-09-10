import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    VoucherMappingService,
    VoucherMappingPopupService,
    VoucherMappingComponent,
    VoucherMappingDialogComponent,
    VoucherMappingPopupComponent,
    VoucherMappingDeletePopupComponent,
    VoucherMappingDeleteDialogComponent,
    voucherMappingRoute,
    voucherMappingPopupRoute,
    VoucherMappingResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...voucherMappingRoute,
    ...voucherMappingPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        VoucherMappingComponent,
        VoucherMappingDialogComponent,
        VoucherMappingDeleteDialogComponent,
        VoucherMappingPopupComponent,
        VoucherMappingDeletePopupComponent,
    ],
    entryComponents: [
        VoucherMappingComponent,
        VoucherMappingDialogComponent,
        VoucherMappingPopupComponent,
        VoucherMappingDeleteDialogComponent,
        VoucherMappingDeletePopupComponent,
    ],
    providers: [
        VoucherMappingService,
        VoucherMappingPopupService,
        VoucherMappingResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayVoucherMappingModule {}
