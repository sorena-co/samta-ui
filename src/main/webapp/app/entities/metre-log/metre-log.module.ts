import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    MetreLogService,
    MetreLogPopupService,
    MetreLogComponent,
    MetreLogDialogComponent,
    MetreLogPopupComponent,
    MetreLogDeletePopupComponent,
    MetreLogDeleteDialogComponent,
    metreLogRoute,
    metreLogPopupRoute,
    MetreLogResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...metreLogRoute,
    ...metreLogPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MetreLogComponent,
        MetreLogDialogComponent,
        MetreLogDeleteDialogComponent,
        MetreLogPopupComponent,
        MetreLogDeletePopupComponent,
    ],
    entryComponents: [
        MetreLogComponent,
        MetreLogDialogComponent,
        MetreLogPopupComponent,
        MetreLogDeleteDialogComponent,
        MetreLogDeletePopupComponent,
    ],
    providers: [
        MetreLogService,
        MetreLogPopupService,
        MetreLogResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayMetreLogModule {}
