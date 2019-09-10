import {BaseEntity} from './../../shared';
import {BuyGroup, BuyTypeUsage, TypeEffect} from '../buy-type';

export class CustomerCredit implements BaseEntity {
    constructor(public id?: number,
                public startDate?: any,
                public finishDate?: any,
                public exportationDate?: any,
                public creditNumber?: number,
                public currentCredit?: number,
                public credit?: number,
                public currentAmount?: number,
                public amount?: number,
                public currencyId?: number,
                public currencyRateGroupId?: number,
                public customerId?: number,
                public parentBuyTypeId?: number,
                public parentBuyTypeTitle?: string,
                public parentBuyGroup?: string | BuyGroup,
                public parentTypeEffect?: string | TypeEffect,
                public parentBuyType?: string | TypeEffect,
                public parentBuyTypeUsage?: string | BuyTypeUsage,
                public personId?: number,
                public minCredit?: number,
                public minAmount?: number,
                //public parentBuyType?: BuyType,
                public productId?: number) {
    }
}
