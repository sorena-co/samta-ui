import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {NiopdcgatewaySharedModule} from '../../shared';
import {
    ConnectDepotService,
    OrderComponent,
    OrderConfirmDialogComponent,
    OrderRevertConfirmDialogComponent,
    OrderConfirmPopupComponent,
    OrderRevertConfirmPopupComponent,
    OrderDeleteDialogComponent,
    OrderDeletePopupComponent,
    OrderRevocationPopupComponent,
    OrderRevocationDialogComponent,
    OrderDialogComponent,
    OrderPopupComponent,
    orderPopupRoute,
    OrderPopupService,
    OrderReportComponent,
    OrderResolvePagingParams,
    orderRoute,
    OrderService
} from './';
import {OrderCreditNotDepositedComponent} from './order-credit-not-deposited-component';
import {ConnectDepotComponent} from './connect-depot.component';
import {BoundarySellDialogComponent} from './boundary-sell-dialog.component';
import {BoundaryComponent} from './boundary.component';

const ENTITY_STATES = [
    ...orderRoute,
    ...orderPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        OrderComponent,
        OrderCreditNotDepositedComponent,
        OrderDialogComponent,
        BoundarySellDialogComponent,
        OrderDeleteDialogComponent,
        OrderPopupComponent,
        OrderDeletePopupComponent,
        OrderConfirmDialogComponent,
        OrderRevertConfirmDialogComponent,
        OrderConfirmPopupComponent,
        OrderRevertConfirmPopupComponent,
        ConnectDepotComponent,
        OrderReportComponent,
        OrderRevocationPopupComponent,
        OrderRevocationDialogComponent,
        BoundaryComponent
    ],
    entryComponents: [
        OrderComponent,
        OrderCreditNotDepositedComponent,
        OrderDialogComponent,
        BoundarySellDialogComponent,
        OrderPopupComponent,
        OrderDeleteDialogComponent,
        OrderDeletePopupComponent,
        OrderConfirmDialogComponent,
        OrderRevertConfirmDialogComponent,
        OrderConfirmPopupComponent,
        OrderRevertConfirmPopupComponent,
        ConnectDepotComponent,
        OrderReportComponent,
        OrderRevocationPopupComponent,
        OrderRevocationDialogComponent,
        BoundaryComponent
    ],
    providers: [
        OrderService,
        ConnectDepotService,
        OrderPopupService,
        OrderResolvePagingParams
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayOrderModule {
}
