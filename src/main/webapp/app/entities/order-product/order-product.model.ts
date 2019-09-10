import {BaseEntity} from './../../shared';
import {OrderCost} from '../order-cost/order-cost.model';
import {LogBook} from '../log-book/log-book.model';
import {BuyGroup} from '../buy-type';
import {CarTank} from '../car-tank';

export class OrderProduct implements BaseEntity {
    constructor(
        public id?: number,
        public sellContractProductId?: number,
        public productId?: number,
        public productTitle?: string,
        public productColor?: string,
        public rateGroupId?: number,
        public totalPrice?: number,
        public basePrice?: number,
        public sellContractProductTitle?: String,
        public rateGroupTitle?: String,
        public buyGroups?: BuyGroup[],
        public price?: number,
        public ratePrice?: number,
        public currentPrice?: number,
        public productCost?: number,
        public currentProductCost?: number,
        public productRatePrice?: number,
        public productRateId?: number,
        public containerRateId?: number,
        public containerRatePrice?: number,
        public costPrice?: number,
        public amount?: number,
        public currentAmount?: number,
        public orderId?: number,
        public measureHeight?: number,
        public height?: number,
        public primitiveHeight?: number,
        public pumpNozzleAmount?: number,
        public carTankId?: number,
        public carTank?: CarTank,
        public costResponses?: any,
        public orderCosts?: OrderCost[],
        public logBook?: LogBook,
        public primitiveAmount?: number
    ) {
    }
}
