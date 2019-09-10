import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    ManufactureService,
    ManufacturePopupService,
    ManufactureComponent,
    ManufactureDialogComponent,
    ManufacturePopupComponent,
    ManufactureDeletePopupComponent,
    ManufactureDeleteDialogComponent,
    manufactureRoute,
    manufacturePopupRoute,
    ManufactureResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...manufactureRoute,
    ...manufacturePopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ManufactureComponent,
        ManufactureDialogComponent,
        ManufactureDeleteDialogComponent,
        ManufacturePopupComponent,
        ManufactureDeletePopupComponent,
    ],
    entryComponents: [
        ManufactureComponent,
        ManufactureDialogComponent,
        ManufacturePopupComponent,
        ManufactureDeleteDialogComponent,
        ManufactureDeletePopupComponent,
    ],
    providers: [
        ManufactureService,
        ManufacturePopupService,
        ManufactureResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayManufactureModule {}
