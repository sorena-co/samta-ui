import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {NiopdcgatewaySellReportModule} from './sell-reports/report.module';
import {NiopdcgatewayAoReportModule} from './ao-reports/report.module';

/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewaySellReportModule,
        NiopdcgatewayAoReportModule
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayReportModule {}
