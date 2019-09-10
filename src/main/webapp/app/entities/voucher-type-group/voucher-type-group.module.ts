import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    VoucherTypeGroupService,
    VoucherTypeGroupPopupService,
    VoucherTypeGroupComponent,
    VoucherTypeGroupDialogComponent,
    VoucherTypeGroupPopupComponent,
    VoucherTypeGroupDeletePopupComponent,
    VoucherTypeGroupDeleteDialogComponent,
    voucherTypeGroupRoute,
    voucherTypeGroupPopupRoute,
    VoucherTypeGroupResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...voucherTypeGroupRoute,
    ...voucherTypeGroupPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        VoucherTypeGroupComponent,
        VoucherTypeGroupDialogComponent,
        VoucherTypeGroupDeleteDialogComponent,
        VoucherTypeGroupPopupComponent,
        VoucherTypeGroupDeletePopupComponent,
    ],
    entryComponents: [
        VoucherTypeGroupComponent,
        VoucherTypeGroupDialogComponent,
        VoucherTypeGroupPopupComponent,
        VoucherTypeGroupDeleteDialogComponent,
        VoucherTypeGroupDeletePopupComponent,
    ],
    providers: [
        VoucherTypeGroupService,
        VoucherTypeGroupPopupService,
        VoucherTypeGroupResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayVoucherTypeGroupModule {}
