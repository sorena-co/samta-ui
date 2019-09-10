import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    BaseQueryService,
    BaseQueryPopupService,
    BaseQueryComponent,
    BaseQueryDialogComponent,
    BaseQueryPopupComponent,
    BaseQueryDeletePopupComponent,
    BaseQueryDeleteDialogComponent,
    baseQueryRoute,
    baseQueryPopupRoute,
    BaseQueryResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...baseQueryRoute,
    ...baseQueryPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        BaseQueryComponent,
        BaseQueryDialogComponent,
        BaseQueryDeleteDialogComponent,
        BaseQueryPopupComponent,
        BaseQueryDeletePopupComponent,
    ],
    entryComponents: [
        BaseQueryComponent,
        BaseQueryDialogComponent,
        BaseQueryPopupComponent,
        BaseQueryDeleteDialogComponent,
        BaseQueryDeletePopupComponent,
    ],
    providers: [
        BaseQueryService,
        BaseQueryPopupService,
        BaseQueryResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayBaseQueryModule {}
