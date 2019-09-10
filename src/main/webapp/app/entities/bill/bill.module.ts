import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    BillService,
    BillPopupService,
    BillComponent,
    BillDialogComponent,
    BillPopupComponent,
    BillDeletePopupComponent,
    BillDeleteDialogComponent,
    billRoute,
    billPopupRoute,
    BillResolvePagingParams,
} from './';
import {BillReportComponent} from './bill-report.component';

const ENTITY_STATES = [
    ...billRoute,
    ...billPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        BillComponent,
        BillDialogComponent,
        BillDeleteDialogComponent,
        BillPopupComponent,
        BillDeletePopupComponent,
        BillReportComponent
    ],
    entryComponents: [
        BillComponent,
        BillDialogComponent,
        BillPopupComponent,
        BillDeleteDialogComponent,
        BillDeletePopupComponent,
        BillReportComponent
    ],
    providers: [
        BillService,
        BillPopupService,
        BillResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayBillModule {}
