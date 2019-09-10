import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import {TabViewModule} from 'primeng/primeng';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    VoucherTemplateService,
    VoucherTemplatePopupService,
    VoucherTemplateComponent,
    VoucherTemplateDialogComponent,
    VoucherTemplateDeletePopupComponent,
    VoucherTemplateDeleteDialogComponent,
    VoucherTemplateExecuteQueryPopupComponent,
    VoucherTemplateExecuteQueryDialogComponent,
    voucherTemplateRoute,
    voucherTemplatePopupRoute,
    VoucherTemplateResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...voucherTemplateRoute,
    ...voucherTemplatePopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        TabViewModule,
            RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        VoucherTemplateComponent,
        VoucherTemplateDialogComponent,
        VoucherTemplateDeleteDialogComponent,
        VoucherTemplateExecuteQueryDialogComponent,
        VoucherTemplateDeletePopupComponent,
        VoucherTemplateExecuteQueryPopupComponent,
    ],
    entryComponents: [
        VoucherTemplateComponent,
        VoucherTemplateDialogComponent,
        VoucherTemplateDeleteDialogComponent,
        VoucherTemplateDeletePopupComponent,
        VoucherTemplateExecuteQueryPopupComponent,
        VoucherTemplateExecuteQueryDialogComponent,
    ],
    providers: [
        VoucherTemplateService,
        VoucherTemplatePopupService,
        VoucherTemplateResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayVoucherTemplateModule {}
