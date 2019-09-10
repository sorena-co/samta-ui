import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    ProductUnitService,
    ProductUnitPopupService,
    ProductUnitComponent,
    ProductUnitDialogComponent,
    ProductUnitPopupComponent,
    ProductUnitDeletePopupComponent,
    ProductUnitDeleteDialogComponent,
    productUnitRoute,
    productUnitPopupRoute,
    ProductUnitResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...productUnitRoute,
    ...productUnitPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ProductUnitComponent,
        ProductUnitDialogComponent,
        ProductUnitDeleteDialogComponent,
        ProductUnitPopupComponent,
        ProductUnitDeletePopupComponent,
    ],
    entryComponents: [
        ProductUnitComponent,
        ProductUnitDialogComponent,
        ProductUnitPopupComponent,
        ProductUnitDeleteDialogComponent,
        ProductUnitDeletePopupComponent,
    ],
    providers: [
        ProductUnitService,
        ProductUnitPopupService,
        ProductUnitResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayProductUnitModule {}
