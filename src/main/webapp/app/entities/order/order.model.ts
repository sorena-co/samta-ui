import { BaseEntity } from './../../shared';
import { OrderProduct } from '../order-product/order-product.model';
import { CostType } from '../cost/cost.model';
import { OrderCredit } from '../order-credit/order-credit.model';

export enum OrderStatus {
    'DRAFT',
    'PENDING',
    'PAID',
    'CONFIRM',
    'SEND_TO_DEPOT',
    'EXIT_FROM_DEPOT',
    'BACK_FROM_SALE',
    'REVOCATION',
    'BACK_FROM_DEPOT'
}

export enum FlightConditions {
    'VIP',
    'EMERGENCY',
    'NORMAL'
}

export enum TypeOfFuelReceipt {
    'TANKER_SALES',
    'PIPE_LINE_SALES',
    'UNIT_TO_AIRPLANE',
    'UNIT_TO_CUSTOMERS'
}

export enum CreditNotDepositedInTime {
    'SELL_LIMIT',
    'SELL_ALARM',
    'OK'
}

export enum OrderType {
    'AIRPLANE',
    'ORDER',
    'BOUNDARY_TRANSIT',
    'BOUNDARY_TRANSHIP'
}

export class Order implements BaseEntity {
    constructor(public id?: number,
        public customerId?: number,
        public customerTitle?: string,
        public customerName?: string,
        public customerCode?: string,
        public personId?: number,
        public sellContractId?: number,
        public personTitle?: string,
        public personName?: string,
        public locationId?: number,
        public locationTitle?: string,
        public locationName?: string,
        public orderNo?: string,
        public registerDate?: any,
        public lastModifiedDate?: any,
        public price?: number,
        public productPrice?: number,
        public containerPrice?: number,
        public costPrice?: number,
        public expires?: number,
        public status?: OrderStatus | string,
        public currencyId?: number,
        public currencyTitle?: string,
        public CurrencyRateGroupTitle?: string,
        public modifyStatusDate?: any,
        public depotId?: number,
        public depotTitle?: string,
        public sellContractProductIds?: number[],
        public orderProducts?: OrderProduct[],
        public orderCredits?: OrderCredit[],
        public productIds?: number[],
        public productId?: number,
        public currencyRateGroupId?: number,
        public TypeId?: number,
        public buyGroup?: any,
        public flightConditions?: any,
        public sourceAirport?: number,
        public targetAirport?: number,
        public targetCountryId?: number,
        public cmr?: number,
        public carnet?: number,
        public orderType?: string,
        public pumpNozzleAmount?: number,
        public shiftWorkId?: number,
        public typeOfFuelReceipt?: any,
        public vehicleModelId?: number,
        public printCount?: number,
        public description?: string,
        public fuelType?: any) {
    }
}

export class CostRateFilter {
    constructor(
        public currencyId?: number,
        public currencyRateGroupId?: number,
        public sellProductAmount?: SellProductAmount) {
    }
}

export class SellProductAmount {
    constructor(public sellContractProductId?: number,
        public amount?: number) {
    }
}

export class RateResponse {
    constructor(public productId?: number,
        public amount?: number,
        public basePrice?: number,
        public productRateContainer?: number,
        public productRate?: number,
        public productRateRial?: number,
        public basePriceRial?: number,
        public currencyRatePrice?: number,
        public costResponses?: CostResponse[], ) {
    }
}

export class CostResponse {
    constructor(public costGroupTitle?: String,
        public price?: number,
        public priceRial?: number,
        public costType?: CostType) {
    }
}

export class DepotFile {
    constructor(
        public id?: number,
        public depotId?: number,
        public depotSendDate?: any,
        public depotTitle?: string,
        public type?: string,
        public depotSendCode?: string,
        public productId?: number,
        public startOrderNo?: number,
        public endOrderNo?: number,
        public endDate?: any,
        public startDate?: any,
    ) {
    }
}

export class OrderReport {
    constructor(public area?: string,
        public zone?: string,
        public exportDate?: any,
        public productCode?: string,
        public productTitle?: string,
        public orderNo?: string,
        public amount?: number,
        public depot?: string,
        public buyerNo?: string,
        public buyerCode?: string,
        public buyerTitle?: string,
        public overHeadCost?: number,
        public wage?: number,
        public evaporation?: number,
        public productRate?: number,
        public productPrice?: number,
        public totalPrice?: number,
        public address?: string,
        public sellContractNo?: string,
        public sellerUser?: string,
        public expireDate?: number,
        public transportContractor?: string) {
    }
}
