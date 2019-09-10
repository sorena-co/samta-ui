import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    FactorService,
    FactorPopupService,
    FactorComponent,
    FactorDialogComponent,
    FactorPopupComponent,
    FactorDeletePopupComponent,
    FactorDeleteDialogComponent,
    factorRoute,
    factorPopupRoute,
    FactorResolvePagingParams,
} from './';
import {FactorReportComponent} from './factor-report.component';
import {FactorReportAggregateComponent} from './factor-report-aggregate.component';

const ENTITY_STATES = [
    ...factorRoute,
    ...factorPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        FactorComponent,
        FactorReportComponent,
        FactorReportAggregateComponent,
        FactorDialogComponent,
        FactorDeleteDialogComponent,
        FactorPopupComponent,
        FactorDeletePopupComponent,
    ],
    entryComponents: [
        FactorComponent,
        FactorReportComponent,
        FactorReportAggregateComponent,
        FactorDialogComponent,
        FactorPopupComponent,
        FactorDeleteDialogComponent,
        FactorDeletePopupComponent,
    ],
    providers: [
        FactorService,
        FactorPopupService,
        FactorResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayFactorModule {}
