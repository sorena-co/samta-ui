import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    PlaqueService,
    PlaquePopupService,
    PlaqueComponent,
    PlaqueDialogComponent,
    PlaquePopupComponent,
    PlaqueDeletePopupComponent,
    PlaqueDeleteDialogComponent,
    plaqueRoute,
    plaquePopupRoute,
    PlaqueResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...plaqueRoute,
    ...plaquePopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PlaqueComponent,
        PlaqueDialogComponent,
        PlaqueDeleteDialogComponent,
        PlaquePopupComponent,
        PlaqueDeletePopupComponent,
    ],
    entryComponents: [
        PlaqueComponent,
        PlaqueDialogComponent,
        PlaquePopupComponent,
        PlaqueDeleteDialogComponent,
        PlaqueDeletePopupComponent,
    ],
    providers: [
        PlaqueService,
        PlaquePopupService,
        PlaqueResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayPlaqueModule {}
