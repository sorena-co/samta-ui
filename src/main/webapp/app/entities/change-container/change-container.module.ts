import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    ChangeContainerService,
    ChangeContainerPopupService,
    ChangeContainerComponent,
    ChangeContainerDialogComponent,
    ChangeContainerPopupComponent,
    ChangeContainerDeletePopupComponent,
    ChangeContainerDeleteDialogComponent,
    changeContainerRoute,
    changeContainerPopupRoute,
    ChangeContainerResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...changeContainerRoute,
    ...changeContainerPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ChangeContainerComponent,
        ChangeContainerDialogComponent,
        ChangeContainerDeleteDialogComponent,
        ChangeContainerPopupComponent,
        ChangeContainerDeletePopupComponent,
    ],
    entryComponents: [
        ChangeContainerComponent,
        ChangeContainerDialogComponent,
        ChangeContainerPopupComponent,
        ChangeContainerDeleteDialogComponent,
        ChangeContainerDeletePopupComponent,
    ],
    providers: [
        ChangeContainerService,
        ChangeContainerPopupService,
        ChangeContainerResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayChangeContainerModule {}
