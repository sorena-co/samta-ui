import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    RequestTestResultService,
    RequestTestResultPopupService,
    RequestTestResultComponent,
    RequestTestResultDialogComponent,
    RequestTestResultPopupComponent,
    RequestTestResultDeletePopupComponent,
    RequestTestResultDeleteDialogComponent,
    requestTestResultRoute,
    requestTestResultPopupRoute,
    RequestTestResultResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...requestTestResultRoute,
    ...requestTestResultPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RequestTestResultComponent,
        RequestTestResultDialogComponent,
        RequestTestResultDeleteDialogComponent,
        RequestTestResultPopupComponent,
        RequestTestResultDeletePopupComponent,
    ],
    entryComponents: [
        RequestTestResultComponent,
        RequestTestResultDialogComponent,
        RequestTestResultPopupComponent,
        RequestTestResultDeleteDialogComponent,
        RequestTestResultDeletePopupComponent,
    ],
    providers: [
        RequestTestResultService,
        RequestTestResultPopupService,
        RequestTestResultResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayRequestTestResultModule {}
