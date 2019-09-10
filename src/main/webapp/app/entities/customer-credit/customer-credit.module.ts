import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    CustomerCreditService,
    CustomerCreditPopupService,
    CustomerCreditComponent,
    CustomerCreditDialogComponent,
    CustomerCreditPopupComponent,
    CustomerCreditDeletePopupComponent,
    CustomerCreditDeleteDialogComponent,
    customerCreditRoute,
    customerCreditPopupRoute,
    CustomerCreditResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...customerCreditRoute,
    ...customerCreditPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CustomerCreditComponent,
        CustomerCreditDialogComponent,
        CustomerCreditDeleteDialogComponent,
        CustomerCreditPopupComponent,
        CustomerCreditDeletePopupComponent,
    ],
    entryComponents: [
        CustomerCreditComponent,
        CustomerCreditDialogComponent,
        CustomerCreditPopupComponent,
        CustomerCreditDeleteDialogComponent,
        CustomerCreditDeletePopupComponent,
    ],
    providers: [
        CustomerCreditService,
        CustomerCreditPopupService,
        CustomerCreditResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayCustomerCreditModule {}
