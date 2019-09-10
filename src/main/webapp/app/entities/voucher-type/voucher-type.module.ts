import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    VoucherTypeService,
    VoucherTypePopupService,
    VoucherTypeComponent,
    VoucherTypeDialogComponent,
    VoucherTypePopupComponent,
    VoucherTypeDeletePopupComponent,
    VoucherTypeDeleteDialogComponent,
    voucherTypeRoute,
    voucherTypePopupRoute,
    VoucherTypeResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...voucherTypeRoute,
    ...voucherTypePopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        VoucherTypeComponent,
        VoucherTypeDialogComponent,
        VoucherTypeDeleteDialogComponent,
        VoucherTypePopupComponent,
        VoucherTypeDeletePopupComponent,
    ],
    entryComponents: [
        VoucherTypeComponent,
        VoucherTypeDialogComponent,
        VoucherTypePopupComponent,
        VoucherTypeDeleteDialogComponent,
        VoucherTypeDeletePopupComponent,
    ],
    providers: [
        VoucherTypeService,
        VoucherTypePopupService,
        VoucherTypeResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayVoucherTypeModule {}
