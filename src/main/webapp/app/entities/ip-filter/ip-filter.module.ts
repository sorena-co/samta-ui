import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    IpFilterService,
    IpFilterPopupService,
    IpFilterComponent,
    IpFilterDialogComponent,
    IpFilterPopupComponent,
    IpFilterDeletePopupComponent,
    IpFilterDeleteDialogComponent,
    ipFilterRoute,
    ipFilterPopupRoute,
    IpFilterResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...ipFilterRoute,
    ...ipFilterPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        IpFilterComponent,
        IpFilterDialogComponent,
        IpFilterDeleteDialogComponent,
        IpFilterPopupComponent,
        IpFilterDeletePopupComponent,
    ],
    entryComponents: [
        IpFilterComponent,
        IpFilterDialogComponent,
        IpFilterPopupComponent,
        IpFilterDeleteDialogComponent,
        IpFilterDeletePopupComponent,
    ],
    providers: [
        IpFilterService,
        IpFilterPopupService,
        IpFilterResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayIpFilterModule {}
