import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    LiteratureVolumeOilTankService,
    LiteratureVolumeOilTankPopupService,
    LiteratureVolumeOilTankComponent,
    LiteratureVolumeOilTankDialogComponent,
    LiteratureVolumeOilTankPopupComponent,
    LiteratureVolumeOilTankDeletePopupComponent,
    LiteratureVolumeOilTankDeleteDialogComponent,
    literatureVolumeOilTankRoute,
    literatureVolumeOilTankPopupRoute,
    LiteratureVolumeOilTankResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...literatureVolumeOilTankRoute,
    ...literatureVolumeOilTankPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LiteratureVolumeOilTankComponent,
        LiteratureVolumeOilTankDialogComponent,
        LiteratureVolumeOilTankDeleteDialogComponent,
        LiteratureVolumeOilTankPopupComponent,
        LiteratureVolumeOilTankDeletePopupComponent,
    ],
    entryComponents: [
        LiteratureVolumeOilTankComponent,
        LiteratureVolumeOilTankDialogComponent,
        LiteratureVolumeOilTankPopupComponent,
        LiteratureVolumeOilTankDeleteDialogComponent,
        LiteratureVolumeOilTankDeletePopupComponent,
    ],
    providers: [
        LiteratureVolumeOilTankService,
        LiteratureVolumeOilTankPopupService,
        LiteratureVolumeOilTankResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayLiteratureVolumeOilTankModule {}
