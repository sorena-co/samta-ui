import {BaseEntity} from './../../shared';
import {CarTank} from "../car-tank";

export class ProductRate implements BaseEntity {
    constructor(
        public id?: number,
        public productId?: number,
        public containerId?: number,
        public src?: string,
        public price?: number,
        public startDate?: any,
        public finishDate?: any,
        public currencyId?: number,
        public rateGroupId?: number
    ) {
    }
}

export class OrderDiscountDTO {
    constructor(
        public id?: number,
        public boundaryDiscountId?: number,
        public price?: number,
        public orderId?: number
    ) {
    }
}

export class BoundaryDTO {
    constructor(
        public orderId?: number,
        public customerId?: number,
        public totalPrice?: number,
        public currencyRateGroupId?: number,
        public currencyId?: number,
        public locationId?: number,
        public targetCountryId?: number,
        public vehicleModelId?: number,
        public currencyTitle?: string,
        public cmr?: string,
        public carnet?: string,
        public boundaryItems?: BoundaryItemDTO[],
        public orderType?: string,
        public orderNo?: string,
        public status?: string,
        public carTank4Amount?: number,
        public orderDiscount?: OrderDiscountDTO
    ) {
        this.orderDiscount = new OrderDiscountDTO();
    }
}

export class BoundaryItemDTO {
    constructor(
        public orderProductId?: number,
        public price?: number,
        public amount?: number,
        public primitiveAmount?: number,
        public height?: number,
        public primitiveHeight?: number,
        public radius?: number,
        public latitude?: number,
        public longitude?: number,
        public productRateId?: number,
        public productRatePrice?: number,
        public carTankId?: number,
        public carTank?: CarTank,
        public productId?: number,
        public productTitle?: string,
        public amountType?: string,
        public tankNo?: string,
        public maxAmount?: number // for no primitive measurement
    ) {
    }
}

export enum AmountType {
    'NORMAL',
    'PUMP_NOZZLE_AMOUNT',
    'CAR_TANK_4_AMOUNT'
}
