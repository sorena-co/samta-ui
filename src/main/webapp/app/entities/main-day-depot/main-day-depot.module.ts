import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    MainDayDepotService,
    MainDayDepotPopupService,
    MainDayDepotComponent,
    MainDayDepotDialogComponent,
    MainDayDepotPopupComponent,
    MainDayDepotDeletePopupComponent,
    MainDayDepotDeleteDialogComponent,
    MainDayDepotClosePopupComponent,
    MainDayDepotCloseDialogComponent,
    MainDayDepotUpdatePopupComponent,
    MainDayDepotUpdateDialogComponent,
    mainDayDepotRoute,
    mainDayDepotPopupRoute,
    MainDayDepotResolvePagingParams,
} from './';
import {MainDayDepotOpenDialogComponent, MainDayDepotOpenPopupComponent} from "./main-day-depot-open-dialog.component";

const ENTITY_STATES = [
    ...mainDayDepotRoute,
    ...mainDayDepotPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MainDayDepotComponent,
        MainDayDepotDialogComponent,
        MainDayDepotDeleteDialogComponent,
        MainDayDepotPopupComponent,
        MainDayDepotDeletePopupComponent,
        MainDayDepotClosePopupComponent,
        MainDayDepotCloseDialogComponent,
        MainDayDepotUpdatePopupComponent,
        MainDayDepotUpdateDialogComponent,
        MainDayDepotOpenDialogComponent,
        MainDayDepotOpenPopupComponent
    ],
    entryComponents: [
        MainDayDepotComponent,
        MainDayDepotDialogComponent,
        MainDayDepotPopupComponent,
        MainDayDepotDeleteDialogComponent,
        MainDayDepotDeletePopupComponent,
        MainDayDepotClosePopupComponent,
        MainDayDepotCloseDialogComponent,
        MainDayDepotUpdatePopupComponent,
        MainDayDepotUpdateDialogComponent,
        MainDayDepotOpenDialogComponent,
        MainDayDepotOpenPopupComponent
    ],
    providers: [
        MainDayDepotService,
        MainDayDepotPopupService,
        MainDayDepotResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayMainDayDepotModule {}
