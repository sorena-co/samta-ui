import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    ProductGroupService,
    ProductGroupPopupService,
    ProductGroupComponent,
    ProductGroupDialogComponent,
    ProductGroupPopupComponent,
    ProductGroupDeletePopupComponent,
    ProductGroupDeleteDialogComponent,
    productGroupRoute,
    productGroupPopupRoute,
    ProductGroupResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...productGroupRoute,
    ...productGroupPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ProductGroupComponent,
        ProductGroupDialogComponent,
        ProductGroupDeleteDialogComponent,
        ProductGroupPopupComponent,
        ProductGroupDeletePopupComponent,
    ],
    entryComponents: [
        ProductGroupComponent,
        ProductGroupDialogComponent,
        ProductGroupPopupComponent,
        ProductGroupDeleteDialogComponent,
        ProductGroupDeletePopupComponent,
    ],
    providers: [
        ProductGroupService,
        ProductGroupPopupService,
        ProductGroupResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayProductGroupModule {}
