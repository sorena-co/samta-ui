import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    RegionService,
    RegionPopupService,
    RegionComponent,
    RegionDialogComponent,
    RegionPopupComponent,
    RegionDeletePopupComponent,
    RegionDeleteDialogComponent,
    RegionFilePopupComponent,
    RegionFileDialogComponent,
    regionRoute,
    regionPopupRoute,
    RegionResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...regionRoute,
    ...regionPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RegionComponent,
        RegionDialogComponent,
        RegionDeleteDialogComponent,
        RegionFileDialogComponent,
        RegionPopupComponent,
        RegionDeletePopupComponent,
        RegionFilePopupComponent,
    ],
    entryComponents: [
        RegionComponent,
        RegionDialogComponent,
        RegionPopupComponent,
        RegionDeleteDialogComponent,
        RegionDeletePopupComponent,
        RegionFileDialogComponent,
        RegionFilePopupComponent
    ],
    providers: [
        RegionService,
        RegionPopupService,
        RegionResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayRegionModule {}
