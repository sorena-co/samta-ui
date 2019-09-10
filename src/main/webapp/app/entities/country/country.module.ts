import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    CountryService,
    CountryPopupService,
    CountryComponent,
    CountryDialogComponent,
    CountryPopupComponent,
    CountryDeletePopupComponent,
    CountryDeleteDialogComponent,
    countryRoute,
    countryPopupRoute,
    CountryResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...countryRoute,
    ...countryPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CountryComponent,
        CountryDialogComponent,
        CountryDeleteDialogComponent,
        CountryPopupComponent,
        CountryDeletePopupComponent,
    ],
    entryComponents: [
        CountryComponent,
        CountryDialogComponent,
        CountryPopupComponent,
        CountryDeleteDialogComponent,
        CountryDeletePopupComponent,
    ],
    providers: [
        CountryService,
        CountryPopupService,
        CountryResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayCountryModule {}
