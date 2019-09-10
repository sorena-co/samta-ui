import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    LogBookService,
    LogBookPopupService,
    LogBookComponent,
    LogBookDialogComponent,
    LogBookPopupComponent,
    LogBookDeletePopupComponent,
    LogBookDeleteDialogComponent,
    logBookRoute,
    logBookPopupRoute,
    LogBookResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...logBookRoute,
    ...logBookPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        LogBookComponent,
        LogBookDialogComponent,
        LogBookDeleteDialogComponent,
        LogBookPopupComponent,
        LogBookDeletePopupComponent,
    ],
    entryComponents: [
        LogBookComponent,
        LogBookDialogComponent,
        LogBookPopupComponent,
        LogBookDeleteDialogComponent,
        LogBookDeletePopupComponent,
    ],
    providers: [
        LogBookService,
        LogBookPopupService,
        LogBookResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayLogBookModule {}
