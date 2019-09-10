import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    MilliPoorService,
    MilliPoorPopupService,
    MilliPoorComponent,
    MilliPoorDialogComponent,
    MilliPoorPopupComponent,
    MilliPoorDeletePopupComponent,
    MilliPoorDeleteDialogComponent,
    milliPoorRoute,
    milliPoorPopupRoute,
    MilliPoorResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...milliPoorRoute,
    ...milliPoorPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MilliPoorComponent,
        MilliPoorDialogComponent,
        MilliPoorDeleteDialogComponent,
        MilliPoorPopupComponent,
        MilliPoorDeletePopupComponent,
    ],
    entryComponents: [
        MilliPoorComponent,
        MilliPoorDialogComponent,
        MilliPoorPopupComponent,
        MilliPoorDeleteDialogComponent,
        MilliPoorDeletePopupComponent,
    ],
    providers: [
        MilliPoorService,
        MilliPoorPopupService,
        MilliPoorResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayMilliPoorModule {}
