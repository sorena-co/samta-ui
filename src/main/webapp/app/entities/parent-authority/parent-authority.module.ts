import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    ParentAuthorityService,
    ParentAuthorityPopupService,
    ParentAuthorityComponent,
    ParentAuthorityDialogComponent,
    ParentAuthorityPopupComponent,
    ParentAuthorityDeletePopupComponent,
    ParentAuthorityDeleteDialogComponent,
    parentAuthorityRoute,
    parentAuthorityPopupRoute,
    ParentAuthorityResolvePagingParams,
} from '.';

const ENTITY_STATES = [
    ...parentAuthorityRoute,
    ...parentAuthorityPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ParentAuthorityComponent,
        ParentAuthorityDialogComponent,
        ParentAuthorityDeleteDialogComponent,
        ParentAuthorityPopupComponent,
        ParentAuthorityDeletePopupComponent,
    ],
    entryComponents: [
        ParentAuthorityComponent,
        ParentAuthorityDialogComponent,
        ParentAuthorityPopupComponent,
        ParentAuthorityDeleteDialogComponent,
        ParentAuthorityDeletePopupComponent,
    ],
    providers: [
        ParentAuthorityService,
        ParentAuthorityPopupService,
        ParentAuthorityResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayParentAuthorityModule {}
