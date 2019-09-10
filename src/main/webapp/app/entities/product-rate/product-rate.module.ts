import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    ProductRateService,
    ProductRatePopupService,
    ProductRateComponent,
    ProductRateDialogComponent,
    ProductRatePopupComponent,
    ProductRateDeletePopupComponent,
    ProductRateDeleteDialogComponent,
    productRateRoute,
    productRatePopupRoute,
    ProductRateResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...productRateRoute,
    ...productRatePopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ProductRateComponent,
        ProductRateDialogComponent,
        ProductRateDeleteDialogComponent,
        ProductRatePopupComponent,
        ProductRateDeletePopupComponent,
    ],
    entryComponents: [
        ProductRateComponent,
        ProductRateDialogComponent,
        ProductRatePopupComponent,
        ProductRateDeleteDialogComponent,
        ProductRateDeletePopupComponent,
    ],
    providers: [
        ProductRateService,
        ProductRatePopupService,
        ProductRateResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayProductRateModule {}
