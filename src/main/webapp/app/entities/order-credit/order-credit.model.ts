import { BaseEntity } from './../../shared';
import {BuyGroup} from '../buy-type';

export const enum BuyTypeUsage {
    'COST',
    'PRODUCT',
    'BOTH'
}

export class OrderCredit implements BaseEntity {
    constructor(
        public id?: number,
        public customerCreditId?: number,
        public decreasedCredit?: number,
        public decreasedAmount?: number,
        public decreasedCost?: number,
        public creditNumber?: number,
        public buyTypeUsage?: BuyTypeUsage,
        public settled?: boolean,
        public buyGroup?: BuyGroup,
        public orderId?: number,
        public orderProductId?: number,
    ) {
        this.settled = false;
    }
}
