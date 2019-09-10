import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    WaterMethanolMixerService,
    WaterMethanolMixerPopupService,
    WaterMethanolMixerComponent,
    WaterMethanolMixerDialogComponent,
    WaterMethanolMixerPopupComponent,
    WaterMethanolMixerDeletePopupComponent,
    WaterMethanolMixerDeleteDialogComponent,
    waterMethanolMixerRoute,
    waterMethanolMixerPopupRoute,
    WaterMethanolMixerResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...waterMethanolMixerRoute,
    ...waterMethanolMixerPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        WaterMethanolMixerComponent,
        WaterMethanolMixerDialogComponent,
        WaterMethanolMixerDeleteDialogComponent,
        WaterMethanolMixerPopupComponent,
        WaterMethanolMixerDeletePopupComponent,
    ],
    entryComponents: [
        WaterMethanolMixerComponent,
        WaterMethanolMixerDialogComponent,
        WaterMethanolMixerPopupComponent,
        WaterMethanolMixerDeleteDialogComponent,
        WaterMethanolMixerDeletePopupComponent,
    ],
    providers: [
        WaterMethanolMixerService,
        WaterMethanolMixerPopupService,
        WaterMethanolMixerResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayWaterMethanolMixerModule {}
