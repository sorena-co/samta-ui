import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {NiopdcgatewaySharedModule} from '../../shared';
import {
    VoucherMasterComponent,
    VoucherMasterConfirmDialogComponent,
    VoucherMasterConfirmPopupComponent,
    VoucherMasterDeleteDialogComponent,
    VoucherMasterDeletePopupComponent,
    VoucherMasterDialogComponent,
    VoucherMasterPopupComponent,
    voucherMasterPopupRoute,
    VoucherMasterPopupService,
    VoucherMasterResolvePagingParams,
    voucherMasterRoute,
    VoucherMasterService,
} from './';
import {VoucherReportComponent} from './voucher-report.component';

const ENTITY_STATES = [
    ...voucherMasterRoute,
    ...voucherMasterPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, {useHash: true})
    ],
    declarations: [
        VoucherMasterComponent,
        VoucherMasterDialogComponent,
        VoucherMasterDeleteDialogComponent,
        VoucherMasterConfirmDialogComponent,
        VoucherMasterConfirmPopupComponent,
        VoucherMasterPopupComponent,
        VoucherMasterDeletePopupComponent,
        VoucherReportComponent
    ],
    entryComponents: [
        VoucherMasterComponent,
        VoucherMasterDialogComponent,
        VoucherMasterConfirmDialogComponent,
        VoucherMasterConfirmPopupComponent,
        VoucherMasterPopupComponent,
        VoucherMasterDeleteDialogComponent,
        VoucherMasterDeletePopupComponent,
        VoucherReportComponent
    ],
    providers: [
        VoucherMasterService,
        VoucherMasterPopupService,
        VoucherMasterResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayVoucherMasterModule {
}
