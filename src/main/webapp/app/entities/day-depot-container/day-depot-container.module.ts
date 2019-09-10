import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    DayDepotContainerService,
    DayDepotContainerPopupService,
    DayDepotContainerComponent,
    DayDepotContainerDialogComponent,
    DayDepotContainerPopupComponent,
    DayDepotContainerDeletePopupComponent,
    DayDepotContainerDeleteDialogComponent,
    dayDepotContainerRoute,
    dayDepotContainerPopupRoute,
    DayDepotContainerResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...dayDepotContainerRoute,
    ...dayDepotContainerPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DayDepotContainerComponent,
        DayDepotContainerDialogComponent,
        DayDepotContainerDeleteDialogComponent,
        DayDepotContainerPopupComponent,
        DayDepotContainerDeletePopupComponent,
    ],
    entryComponents: [
        DayDepotContainerComponent,
        DayDepotContainerDialogComponent,
        DayDepotContainerPopupComponent,
        DayDepotContainerDeleteDialogComponent,
        DayDepotContainerDeletePopupComponent,
    ],
    providers: [
        DayDepotContainerService,
        DayDepotContainerPopupService,
        DayDepotContainerResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayDayDepotContainerModule {}
