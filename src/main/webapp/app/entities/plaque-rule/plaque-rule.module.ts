import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    PlaqueRuleService,
    PlaqueRulePopupService,
    PlaqueRuleComponent,
    PlaqueRuleDialogComponent,
    PlaqueRulePopupComponent,
    PlaqueRuleDeletePopupComponent,
    PlaqueRuleDeleteDialogComponent,
    plaqueRuleRoute,
    plaqueRulePopupRoute,
    PlaqueRuleResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...plaqueRuleRoute,
    ...plaqueRulePopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PlaqueRuleComponent,
        PlaqueRuleDialogComponent,
        PlaqueRuleDeleteDialogComponent,
        PlaqueRulePopupComponent,
        PlaqueRuleDeletePopupComponent,
    ],
    entryComponents: [
        PlaqueRuleComponent,
        PlaqueRuleDialogComponent,
        PlaqueRulePopupComponent,
        PlaqueRuleDeleteDialogComponent,
        PlaqueRuleDeletePopupComponent,
    ],
    providers: [
        PlaqueRuleService,
        PlaqueRulePopupService,
        PlaqueRuleResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayPlaqueRuleModule {}
