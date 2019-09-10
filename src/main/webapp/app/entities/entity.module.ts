import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {NiopdcgatewayLocationModule} from './location/location.module';
import {NiopdcgatewayDepotModule} from './depot/depot.module';
import {NiopdcgatewayProductModule} from './product/product.module';
import {NiopdcgatewayProductGroupModule} from './product-group/product-group.module';
import {NiopdcgatewayCustomerTypeModule} from './customer-type/customer-type.module';
import {NiopdcgatewayStakeholderModule} from './stakeholder/stakeholder.module';
import {NiopdcgatewayCountryModule} from './country/country.module';
import {NiopdcgatewayPersonModule} from './person/person.module';
import {NiopdcgatewayTransportContractModule} from './transport-contract/transport-contract.module';
import {NiopdcgatewayCustomerModule} from './customer/customer.module';
import {NiopdcgatewayRegionModule} from './region/region.module';
import {NiopdcgatewayConsumptionModule} from './consumption/consumption.module';
import {NiopdcgatewayProductUnitModule} from './product-unit/product-unit.module';
import {NiopdcgatewayContainerModule} from './container/container.module';
import {NiopdcgatewayCustomerCreditModule} from './customer-credit/customer-credit.module';
import {NiopdcgatewaySellContractModule} from './sell-contract/sell-contract.module';
import {NiopdcgatewayCustomerTypeProductConsumptionModule} from './customer-type-product-consumption/customer-type-product-consumption.module';
import {NiopdcgatewayUserDataAccessModule} from './user-data-access/user-data-access.module';
import {NiopdcgatewayIpFilterModule} from './ip-filter/ip-filter.module';
import {NiopdcgatewayUserTokenModule} from './user-token/user-token.module';
import {NiopdcgatewaySellContractCustomerModule} from './sell-contract-customer/sell-contract-customer.module';
import {NiopdcgatewaySellContractPersonModule} from './sell-contract-person/sell-contract-person.module';
import {NiopdcgatewaySellContractProductModule} from './sell-contract-product/sell-contract-product.module';
import {NiopdcgatewayMetreModule} from './metre/metre.module';
import {NiopdcgatewayMetreLogModule} from './metre-log/metre-log.module';
import {NiopdcgatewayOilTankModule} from './oil-tank/oil-tank.module';
import {NiopdcgatewayServiceOilTankModule} from './service-oil-tank/service-oil-tank.module';
import {NiopdcgatewayMeasurementOilTankModule} from './measurement-oil-tank/measurement-oil-tank.module';
import {NiopdcgatewaySendProductModule} from './send-product/send-product.module';
import {NiopdcgatewaySendContainerProductModule} from './send-container-product/send-container-product.module';
import {NiopdcgatewayTransferTypeModule} from './transfer-type/transfer-type.module';
import {NiopdcgatewayTransferModule} from './transfer/transfer.module';
import {NiopdcgatewayTransferPlatformToUnitModule} from './transfer-platform-to-unit/transfer-platform-to-unit.module';
import {NiopdcgatewayReceivedProductModule} from './received-product/received-product.module';
import {NiopdcgatewayReceivedProductContainerModule} from './received-product-container/received-product-container.module';
import {NiopdcgatewayLogBookModule} from './log-book/log-book.module';
import {NiopdcgatewayMainDayDepotModule} from './main-day-depot/main-day-depot.module';
import {NiopdcgatewayMainDayOperationModule} from './main-day-operation/main-day-operation.module';
import {NiopdcgatewayDayDepotModule} from './day-depot/day-depot.module';
import {NiopdcgatewayDayDepotServiceOilTankModule} from './day-depot-service-oil-tank/day-depot-service-oil-tank.module';
import {NiopdcgatewayDayDepotContainerModule} from './day-depot-container/day-depot-container.module';
import {NiopdcgatewaySellGroundFuelModule} from './sell-ground-fuel/sell-ground-fuel.module';
import {NiopdcgatewayLiteratureVolumeOilTankModule} from './literature-volume-oil-tank/literature-volume-oil-tank.module';
import {NiopdcgatewayOilTankContainerModule} from './oil-tank-container/oil-tank-container.module';
import {NiopdcgatewayChangeContainerModule} from './change-container/change-container.module';
import {NiopdcgatewayWaterMethanolMixerModule} from './water-methanol-mixer/water-methanol-mixer.module';
import {NiopdcgatewayCleaningReportOilTankModule} from './cleaning-report-oil-tank/cleaning-report-oil-tank.module';
import {NiopdcgatewayMilliPoorModule} from './milli-poor/milli-poor.module';
import {NiopdcgatewayRequestTestResultModule} from './request-test-result/request-test-result.module';
import {NiopdcgatewayTestResultModule} from './test-result/test-result.module';
import {NiopdcgatewayRequestFilterElementModule} from './request-filter-element/request-filter-element.module';
import {NiopdcgatewayChangeFilterElementModule} from './change-filter-element/change-filter-element.module';
import {NiopdcgatewayManufactureModule} from './manufacture/manufacture.module';
import {NiopdcgatewayMomentSheetModule} from './moment-sheet/moment-sheet.module';
import {NiopdcgatewayRequestPlungingModule} from './request-plunging/request-plunging.module';
import {NiopdcgatewayResponsePlungingModule} from './response-plunging/response-plunging.module';
import {NiopdcgatewayPaymentModule} from './payment/payment.module';
import {NiopdcgatewayPaymentBillModule} from './payment-bill/payment-bill.module';
import {NiopdcgatewayWalletModule} from './wallet/wallet.module';
import {NiopdcgatewayBankTransactionModule} from './bank-transaction/bank-transaction.module';
import {NiopdcgatewayBankTransactionRefModule} from './bank-transaction-ref/bank-transaction-ref.module';
import {NiopdcgatewayCurrencyModule} from './currency/currency.module';
import {NiopdcgatewayCurrencyRateModule} from './currency-rate/currency-rate.module';
import {NiopdcgatewayCurrencyRateGroupModule} from './currency-rate-group/currency-rate-group.module';
import {NiopdcgatewayProductRateModule} from './product-rate/product-rate.module';
import {NiopdcgatewayRateGroupModule} from './rate-group/rate-group.module';
import {NiopdcgatewayCostGroupModule} from './cost-group/cost-group.module';
import {NiopdcgatewayCostModule} from './cost/cost.module';
import {NiopdcgatewayCostRateModule} from './cost-rate/cost-rate.module';
import {NiopdcgatewayOrderModule} from './order/order.module';
import {NiopdcgatewayOrderProductModule} from './order-product/order-product.module';
import {NiopdcgatewayOrderPaymentModule} from './order-payment/order-payment.module';
import {NiopdcgatewayOrderCreditModule} from './order-credit/order-credit.module';
import {NiopdcgatewayOrderCostModule} from './order-cost/order-cost.module';
import {NiopdcgatewayNewsModule} from './news/news.module';
import {NiopdcgatewayVoucherMasterModule} from './voucher-master/voucher-master.module';
import {NiopdcgatewayVoucherTypeGroupModule} from './voucher-type-group/voucher-type-group.module';
import {NiopdcgatewayVoucherTypeModule} from './voucher-type/voucher-type.module';
import {NiopdcgatewayBaseQueryModule} from './base-query/base-query.module';
import {NiopdcgatewayVoucherTemplateModule} from './voucher-template/voucher-template.module';
import {NiopdcgatewayVoucherMappingModule} from './voucher-mapping/voucher-mapping.module';
import {NiopdcgatewayBuyTypeModule} from './buy-type/buy-type.module';
import {NiopdcgatewayVoucherItemModule} from './voucher-item/voucher-item.module';
import {NiopdcgatewayRefuelCenterModule} from './refuel-center/refuel-center.module';
import {NiopdcgatewayUserRefuelCenterModule} from './user-refuel-center/user-refuel-center.module';
import {NiopdcgatewayPosModule} from './pos/pos.module';
import {NiopdcgatewaySalesCodeModule} from './sales-code/sales-code.module';
import {NiopdcgatewayCostElementModule} from './cost-element/cost-element.module';
import {NiopdcgatewayCustomerScoreModule} from './customer-score/customer-score.module';
import {NiopdcgatewayCustomerRatingModule} from './customer-rating/customer-rating.module';
import {NiopdcgatewayBillModule} from './bill/bill.module';
import {NiopdcgatewayBillItemModule} from './bill-item/bill-item.module';
import {NiopdcgatewayFactorModule} from './factor/factor.module';
import {NiopdcgatewayFactorItemModule} from './factor-item/factor-item.module';
import {NiopdcgatewayAirplaneModelModule} from './airplane-model/airplane-model.module';
import {NiopdcgatewayVoucherPaymentModule} from './voucher-payment/voucher-payment.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */
import {NiopdcgatewayParentAuthorityModule} from './parent-authority/parent-authority.module';
import {NiopdcgatewayMainAuthorityModule} from './main-authority/main-authority.module';
import {NiopdcgatewayRoleModule} from './role/role.module';
import {NiopdcgatewayAirportModule} from './airport/airport.module';
import {NiopdcgatewayCarTypeLimitModule} from './car-type-limit/car-type-limit.module';
import {NiopdcgatewayShiftWorkModule} from './shift-work/shift-work.module';
import {NiopdcgatewayCarTypeModule} from './car-type/car-type.module';
import {NiopdcgatewayCarTankModule} from './car-tank/car-tank.module';
import {NiopdcgatewayCarRfIdModule} from './car-rf-id/car-rf-id.module';
import {NiopdcgatewayNiopdcConfigModule} from './niopdc-config/niopdc-config.module';
import {NiopdcgatewayVehicleCapacityModule} from './vehicle-capacity/vehicle-capacity.module';
import {NiopdcgatewayVehicleModelModule} from './vehicle-model/vehicle-model.module';
import {NiopdcgatewayCustomerDeactiveRuleModule} from './customer-deactive-rule/customer-deactive-rule.module';
import {NiopdcgatewayBoundaryDiscountModule} from './boundary-discount/boundary-discount.module';
import { NiopdcgatewayBoundaryTagModule } from './boundary-tag/boundary-tag.module';
import { NiopdcgatewayTagRateModule } from './tag-rate/tag-rate.module';
import { NiopdcgatewayPlaqueModule } from "./plaque/plaque.module";
import { NiopdcgatewayPlaqueRuleModule } from "./plaque-rule/plaque-rule.module";
import { NiopdcgatewayLoanTypeModule } from './loan-type/loan-type.module';
import { NiopdcgatewayLoanModule } from './loan/loan.module';
import { NiopdcgatewayLoanPaymentModule } from './loan-payment/loan-payment.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewayLocationModule,
        NiopdcgatewayDepotModule,
        NiopdcgatewayProductModule,
        NiopdcgatewayProductGroupModule,
        NiopdcgatewayCustomerTypeModule,
        NiopdcgatewayStakeholderModule,
        NiopdcgatewayCountryModule,
        NiopdcgatewayPersonModule,
        NiopdcgatewayTransportContractModule,
        NiopdcgatewayCustomerModule,
        NiopdcgatewayRegionModule,
        NiopdcgatewayConsumptionModule,
        NiopdcgatewayProductUnitModule,
        NiopdcgatewayContainerModule,
        NiopdcgatewayCustomerCreditModule,
        NiopdcgatewaySellContractModule,
        NiopdcgatewayCustomerTypeProductConsumptionModule,
        NiopdcgatewayUserDataAccessModule,
        NiopdcgatewayIpFilterModule,
        NiopdcgatewayUserTokenModule,
        NiopdcgatewaySellContractCustomerModule,
        NiopdcgatewaySellContractPersonModule,
        NiopdcgatewaySellContractProductModule,
        NiopdcgatewayRefuelCenterModule,
        NiopdcgatewayMomentSheetModule,
        NiopdcgatewayMetreModule,
        NiopdcgatewayMetreLogModule,
        NiopdcgatewayOilTankModule,
        NiopdcgatewayServiceOilTankModule,
        NiopdcgatewayMeasurementOilTankModule,
        NiopdcgatewaySendProductModule,
        NiopdcgatewaySendContainerProductModule,
        NiopdcgatewayTransferTypeModule,
        NiopdcgatewayTransferModule,
        NiopdcgatewayTransferPlatformToUnitModule,
        NiopdcgatewayReceivedProductModule,
        NiopdcgatewayReceivedProductContainerModule,
        NiopdcgatewayLogBookModule,
        NiopdcgatewayMainDayDepotModule,
        NiopdcgatewayMainDayOperationModule,
        NiopdcgatewayDayDepotModule,
        NiopdcgatewayDayDepotServiceOilTankModule,
        NiopdcgatewayDayDepotContainerModule,
        NiopdcgatewaySellGroundFuelModule,
        NiopdcgatewayLiteratureVolumeOilTankModule,
        NiopdcgatewayOilTankContainerModule,
        NiopdcgatewayChangeContainerModule,
        NiopdcgatewayWaterMethanolMixerModule,
        NiopdcgatewayUserRefuelCenterModule,
        NiopdcgatewayCleaningReportOilTankModule,
        NiopdcgatewayMilliPoorModule,
        NiopdcgatewayRequestTestResultModule,
        NiopdcgatewayTestResultModule,
        NiopdcgatewayRequestFilterElementModule,
        NiopdcgatewayChangeFilterElementModule,
        NiopdcgatewayManufactureModule,
        NiopdcgatewayRequestPlungingModule,
        NiopdcgatewayResponsePlungingModule,
        NiopdcgatewayPaymentModule,
        NiopdcgatewayPaymentBillModule,
        NiopdcgatewayWalletModule,
        NiopdcgatewayBankTransactionModule,
        NiopdcgatewayBankTransactionRefModule,
        NiopdcgatewayCurrencyModule,
        NiopdcgatewayCurrencyRateModule,
        NiopdcgatewayCurrencyRateGroupModule,
        NiopdcgatewayProductRateModule,
        NiopdcgatewayRateGroupModule,
        NiopdcgatewayCostGroupModule,
        NiopdcgatewayCostModule,
        NiopdcgatewayCostRateModule,
        NiopdcgatewayOrderModule,
        NiopdcgatewayNiopdcConfigModule,
        NiopdcgatewayOrderProductModule,
        NiopdcgatewayOrderPaymentModule,
        NiopdcgatewayOrderCreditModule,
        NiopdcgatewayOrderCostModule,
        NiopdcgatewayNewsModule,
        NiopdcgatewayVoucherMasterModule,
        NiopdcgatewayVoucherTypeGroupModule,
        NiopdcgatewayVoucherTypeModule,
        NiopdcgatewayBaseQueryModule,
        NiopdcgatewayVoucherTemplateModule,
        NiopdcgatewayVoucherMappingModule,
        NiopdcgatewayBuyTypeModule,
        NiopdcgatewayBoundaryDiscountModule,
        NiopdcgatewayVoucherItemModule,
        NiopdcgatewayRefuelCenterModule,
        NiopdcgatewayUserRefuelCenterModule,
        NiopdcgatewayPosModule,
        NiopdcgatewaySalesCodeModule,
        NiopdcgatewayCostElementModule,
        NiopdcgatewayCustomerScoreModule,
        NiopdcgatewayCustomerRatingModule,
        NiopdcgatewayBillModule,
        NiopdcgatewayBillItemModule,
        NiopdcgatewayFactorModule,
        NiopdcgatewayFactorItemModule,
        NiopdcgatewayAirplaneModelModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
        NiopdcgatewayParentAuthorityModule,
        NiopdcgatewayMainAuthorityModule,
        NiopdcgatewayRoleModule,
        NiopdcgatewayAirportModule,
        NiopdcgatewayCarTypeModule,
        NiopdcgatewayCarTypeLimitModule,
        NiopdcgatewayShiftWorkModule,
        NiopdcgatewayCarRfIdModule,
        NiopdcgatewayCarTankModule,
        NiopdcgatewayVoucherPaymentModule,
        NiopdcgatewayCustomerDeactiveRuleModule,
        NiopdcgatewayVehicleModelModule,
        NiopdcgatewayVehicleCapacityModule,
        NiopdcgatewayBoundaryDiscountModule,
        NiopdcgatewayBoundaryTagModule,
        NiopdcgatewayTagRateModule,
        NiopdcgatewayPlaqueModule,
        NiopdcgatewayPlaqueRuleModule,
        NiopdcgatewayLoanTypeModule,
        NiopdcgatewayLoanModule,
        NiopdcgatewayLoanPaymentModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayEntityModule {
}
