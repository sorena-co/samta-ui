import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    VoucherItemService,
    VoucherItemPopupService,
    VoucherItemComponent,
    VoucherItemDetailComponent,
    VoucherItemDialogComponent,
    VoucherItemPopupComponent,
    VoucherItemDeletePopupComponent,
    VoucherItemDeleteDialogComponent,
    voucherItemRoute,
    voucherItemPopupRoute,
    VoucherItemResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...voucherItemRoute,
    ...voucherItemPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        VoucherItemComponent,
        VoucherItemDetailComponent,
        VoucherItemDialogComponent,
        VoucherItemDeleteDialogComponent,
        VoucherItemPopupComponent,
        VoucherItemDeletePopupComponent,
    ],
    entryComponents: [
        VoucherItemComponent,
        VoucherItemDialogComponent,
        VoucherItemPopupComponent,
        VoucherItemDeleteDialogComponent,
        VoucherItemDeletePopupComponent,
    ],
    providers: [
        VoucherItemService,
        VoucherItemPopupService,
        VoucherItemResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayVoucherItemModule {}
