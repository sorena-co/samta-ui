import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {NiopdcgatewayMomentSheetModule} from './moment-sheet/moment-sheet.module';
import {NiopdcgatewayMetreSheetModule} from './metre-sheet/metre-sheet.module';
import {NiopdcgatewayAircraftRefuelingRecordModule} from "./aircraft-refueling-record/aircraft-refueling-record.module";
import {NiopdcgatewayAirplaneModule} from "./airplane/airplane.module";
import {NiopdcgatewayBillWithoutContainerModule} from "./bill-without-container/bill-without-container.module";
import {NiopdcgatewayAirlineModule} from "./airline/airline.module";
import {NiopdcgatewayTotalSellModule} from "./total-sell/total-sell.module";
import {NiopdcgatewayUnitModule} from "./unit/unit.module";
import {NiopdcgatewayMetreModule} from "./metre/metre.module";
import {NiopdcgatewayAmountReportModule} from "./amount-report/amount-report.module";
import {NiopdcgatewayTwentyFourAoModule} from "./twenty-four-ao/twenty-four-ao.module";
import {NiopdcgatewaySellReportByProductModule} from "./sell-report-by-product/sell-report-by-product.module";
import {NiopdcgatewayReceiptNoDetailModule} from "./receipt-no-detail/receipt-no-detail.module";
import {NiopdcgatewayAirportModule} from "./airport/airport.module";
import {NiopdcgatewayTotalSellGroundModule} from "./total-sell-ground/total-sell-ground.module";
import {NiopdcgatewayAoMountReportModule} from "./ao-mount-report/ao-mount-report.module";

/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewayMomentSheetModule,
        NiopdcgatewayMetreSheetModule,
        NiopdcgatewayAircraftRefuelingRecordModule,
        NiopdcgatewayAirplaneModule,
        NiopdcgatewayBillWithoutContainerModule,
        NiopdcgatewayAirlineModule,
        NiopdcgatewayTotalSellModule,
        NiopdcgatewayUnitModule,
        NiopdcgatewayMetreModule,
        NiopdcgatewayAmountReportModule,
        NiopdcgatewayTwentyFourAoModule,
        NiopdcgatewaySellReportByProductModule,
        NiopdcgatewayReceiptNoDetailModule,
        NiopdcgatewayAirportModule,
        NiopdcgatewayTotalSellGroundModule,
        NiopdcgatewayAoMountReportModule,
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayAoReportModule {
}
