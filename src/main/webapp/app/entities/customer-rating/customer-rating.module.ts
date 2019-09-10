import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    CustomerRatingService,
    CustomerRatingPopupService,
    CustomerRatingComponent,
    CustomerRatingDialogComponent,
    CustomerRatingPopupComponent,
    CustomerRatingDeletePopupComponent,
    CustomerRatingDeleteDialogComponent,
    customerRatingRoute,
    customerRatingPopupRoute,
    CustomerRatingResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...customerRatingRoute,
    ...customerRatingPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CustomerRatingComponent,
        CustomerRatingDialogComponent,
        CustomerRatingDeleteDialogComponent,
        CustomerRatingPopupComponent,
        CustomerRatingDeletePopupComponent,
    ],
    entryComponents: [
        CustomerRatingComponent,
        CustomerRatingDialogComponent,
        CustomerRatingPopupComponent,
        CustomerRatingDeleteDialogComponent,
        CustomerRatingDeletePopupComponent,
    ],
    providers: [
        CustomerRatingService,
        CustomerRatingPopupService,
        CustomerRatingResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayCustomerRatingModule {}
