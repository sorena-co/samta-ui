import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    StakeholderService,
    StakeholderPopupService,
    StakeholderComponent,
    StakeholderDetailComponent,
    StakeholderDialogComponent,
    StakeholderPopupComponent,
    StakeholderDeletePopupComponent,
    StakeholderDeleteDialogComponent,
    stakeholderRoute,
    stakeholderPopupRoute,
    StakeholderResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...stakeholderRoute,
    ...stakeholderPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        StakeholderComponent,
        StakeholderDetailComponent,
        StakeholderDialogComponent,
        StakeholderDeleteDialogComponent,
        StakeholderPopupComponent,
        StakeholderDeletePopupComponent,
    ],
    entryComponents: [
        StakeholderComponent,
        StakeholderDialogComponent,
        StakeholderPopupComponent,
        StakeholderDeleteDialogComponent,
        StakeholderDeletePopupComponent,
    ],
    providers: [
        StakeholderService,
        StakeholderPopupService,
        StakeholderResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayStakeholderModule {}
