import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    BoundaryDiscountService,
    BoundaryDiscountPopupService,
    BoundaryDiscountComponent,
    BoundaryDiscountDialogComponent,
    BoundaryDiscountPopupComponent,
    BoundaryDiscountDeletePopupComponent,
    BoundaryDiscountDeleteDialogComponent,
    boundaryDiscountRoute,
    boundaryDiscountPopupRoute,
    BoundaryDiscountResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...boundaryDiscountRoute,
    ...boundaryDiscountPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        BoundaryDiscountComponent,
        BoundaryDiscountDialogComponent,
        BoundaryDiscountDeleteDialogComponent,
        BoundaryDiscountPopupComponent,
        BoundaryDiscountDeletePopupComponent,
    ],
    entryComponents: [
        BoundaryDiscountComponent,
        BoundaryDiscountDialogComponent,
        BoundaryDiscountPopupComponent,
        BoundaryDiscountDeleteDialogComponent,
        BoundaryDiscountDeletePopupComponent,
    ],
    providers: [
        BoundaryDiscountService,
        BoundaryDiscountPopupService,
        BoundaryDiscountResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayBoundaryDiscountModule {}
