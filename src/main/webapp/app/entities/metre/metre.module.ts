import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    MetreService,
    MetrePopupService,
    MetreComponent,
    MetreDialogComponent,
    MetrePopupComponent,
    MetreDeletePopupComponent,
    MetreDeleteDialogComponent,
    metreRoute,
    metrePopupRoute,
    MetreResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...metreRoute,
    ...metrePopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MetreComponent,
        MetreDialogComponent,
        MetreDeleteDialogComponent,
        MetrePopupComponent,
        MetreDeletePopupComponent,
    ],
    entryComponents: [
        MetreComponent,
        MetreDialogComponent,
        MetrePopupComponent,
        MetreDeleteDialogComponent,
        MetreDeletePopupComponent,
    ],
    providers: [
        MetreService,
        MetrePopupService,
        MetreResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayMetreModule {}
