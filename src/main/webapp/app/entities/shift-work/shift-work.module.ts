import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    ShiftWorkService,
    ShiftWorkPopupService,
    ShiftWorkComponent,
    ShiftWorkDialogComponent,
    ShiftWorkPopupComponent,
    ShiftWorkDeletePopupComponent,
    ShiftWorkDeleteDialogComponent,
    shiftWorkRoute,
    shiftWorkPopupRoute,
    ShiftWorkResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...shiftWorkRoute,
    ...shiftWorkPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ShiftWorkComponent,
        ShiftWorkDialogComponent,
        ShiftWorkDeleteDialogComponent,
        ShiftWorkPopupComponent,
        ShiftWorkDeletePopupComponent,
    ],
    entryComponents: [
        ShiftWorkComponent,
        ShiftWorkDialogComponent,
        ShiftWorkPopupComponent,
        ShiftWorkDeleteDialogComponent,
        ShiftWorkDeletePopupComponent,
    ],
    providers: [
        ShiftWorkService,
        ShiftWorkPopupService,
        ShiftWorkResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayShiftWorkModule {}
