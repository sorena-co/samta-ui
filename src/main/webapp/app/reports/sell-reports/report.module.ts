import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {NiopdcgatewayDailySalesModule} from './daily-sales/daily-sales.module';
import {NiopdcgatewayDailySalesSummaryModule} from './daily-sales-summary/daily-sales-summary.module';
import {NiopdcgatewayDailySalesStatisticalModule} from './daily-sales-statistical/daily-sales-statistical.module';
import {NiopdcgatewayConsumptionModule} from './consumption/consumption.module';
import {NiopdcgatewayDetailsBuyModule} from './details-buy/details-buy.module';
import {NiopdcgatewayCustomerReportModule} from './customer/customer.module';
import {NiopdcgatewayPersonReportModule} from "./person/person.module";

/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewayDailySalesModule,
        NiopdcgatewayDailySalesSummaryModule,
        NiopdcgatewayDailySalesStatisticalModule,
        NiopdcgatewayConsumptionModule,
        NiopdcgatewayDetailsBuyModule,
        NiopdcgatewayCustomerReportModule,
        NiopdcgatewayPersonReportModule
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewaySellReportModule {}
