import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    CustomerService,
    CustomerPopupService,
    CustomerComponent,
    CustomerDialogComponent,
    CustomerPopupComponent,
    CustomerDeletePopupComponent,
    CustomerDeleteDialogComponent,
    customerRoute,
    customerPopupRoute,
    CustomerResolvePagingParams, BoundaryDialogComponent,
} from './';
import {BoundaryCustomerComponent} from "./boundary-customer.component";
import {BoundaryPopupComponent} from "./boundary-dialog.component";

const ENTITY_STATES = [
    ...customerRoute,
    ...customerPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CustomerComponent,
        CustomerDialogComponent,
        CustomerDeleteDialogComponent,
        CustomerPopupComponent,
        BoundaryPopupComponent,
        CustomerDeletePopupComponent,
        BoundaryCustomerComponent,
        BoundaryDialogComponent
    ],
    entryComponents: [
        CustomerComponent,
        CustomerDialogComponent,
        CustomerPopupComponent,
        BoundaryPopupComponent,
        CustomerDeleteDialogComponent,
        CustomerDeletePopupComponent,
        BoundaryCustomerComponent,
        BoundaryDialogComponent
    ],
    providers: [
        CustomerService,
        CustomerPopupService,
        CustomerResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayCustomerModule {}
