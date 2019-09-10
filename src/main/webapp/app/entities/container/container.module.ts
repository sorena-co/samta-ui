import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    ContainerService,
    ContainerPopupService,
    ContainerComponent,
    ContainerDialogComponent,
    ContainerPopupComponent,
    ContainerDeletePopupComponent,
    ContainerDeleteDialogComponent,
    containerRoute,
    containerPopupRoute,
    ContainerResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...containerRoute,
    ...containerPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ContainerComponent,
        ContainerDialogComponent,
        ContainerDeleteDialogComponent,
        ContainerPopupComponent,
        ContainerDeletePopupComponent,
    ],
    entryComponents: [
        ContainerComponent,
        ContainerDialogComponent,
        ContainerPopupComponent,
        ContainerDeleteDialogComponent,
        ContainerDeletePopupComponent,
    ],
    providers: [
        ContainerService,
        ContainerPopupService,
        ContainerResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayContainerModule {}
