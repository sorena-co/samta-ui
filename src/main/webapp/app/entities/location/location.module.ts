import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    LocationService,
    LocationPopupService,
    LocationComponent,
    LocationDialogComponent,
    LocationPopupComponent,
    LocationDeletePopupComponent,
    LocationOpenPopupComponent,
    LocationClosePopupComponent,
    LocationDeleteDialogComponent,
    LocationOpenDialogComponent,
    LocationCloseDialogComponent,
    locationRoute,
    locationPopupRoute,
    LocationResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...locationRoute,
    ...locationPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LocationComponent,
        LocationDialogComponent,
        LocationDeleteDialogComponent,
        LocationOpenDialogComponent,
        LocationCloseDialogComponent,
        LocationPopupComponent,
        LocationDeletePopupComponent,
        LocationOpenPopupComponent,
        LocationClosePopupComponent,
    ],
    entryComponents: [
        LocationComponent,
        LocationDialogComponent,
        LocationPopupComponent,
        LocationDeleteDialogComponent,
        LocationOpenDialogComponent,
        LocationCloseDialogComponent,
        LocationDeletePopupComponent,
        LocationOpenPopupComponent,
        LocationClosePopupComponent,
    ],
    providers: [
        LocationService,
        LocationPopupService,
        LocationResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayLocationModule {}
