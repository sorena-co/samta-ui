import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    ChangeFilterElementService,
    ChangeFilterElementPopupService,
    ChangeFilterElementComponent,
    ChangeFilterElementDialogComponent,
    ChangeFilterElementPopupComponent,
    ChangeFilterElementDeletePopupComponent,
    ChangeFilterElementDeleteDialogComponent,
    changeFilterElementRoute,
    changeFilterElementPopupRoute,
    ChangeFilterElementResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...changeFilterElementRoute,
    ...changeFilterElementPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ChangeFilterElementComponent,
        ChangeFilterElementDialogComponent,
        ChangeFilterElementDeleteDialogComponent,
        ChangeFilterElementPopupComponent,
        ChangeFilterElementDeletePopupComponent,
    ],
    entryComponents: [
        ChangeFilterElementComponent,
        ChangeFilterElementDialogComponent,
        ChangeFilterElementPopupComponent,
        ChangeFilterElementDeleteDialogComponent,
        ChangeFilterElementDeletePopupComponent,
    ],
    providers: [
        ChangeFilterElementService,
        ChangeFilterElementPopupService,
        ChangeFilterElementResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayChangeFilterElementModule {}
