import {BaseEntity} from './../../shared';
import {CustomerType} from '../customer-type';
import {Product} from '../product';

export  enum CostGroupType {
    'CASH',
    'LADDER',
    'ENCOURAGEMENT',
    'SUPPLEMENT'
}

export enum CostMethod {
    'NORMAL_SALES',
    'DEFUEL'
}

export enum Forced {
    'FORCE',
    'OPTIONAL'
}

export enum CostGroupAccessType {
    'PRODUCT',
    'CUSTOMER'
}

export enum PaymentPeriod {
    'DAY',
    'MONTH',
    'SEASON',
    'YEAR'
}

export  enum CostType {
    'WITH_ORDER',
    'BILL'
}

export class CostGroup implements BaseEntity {
    constructor(public id?: number,
                public title?: string,
                public code?: string,
                public costGroupType?: any,
                public costMethod?: any,
                public costGroupAccessType?: any,
                public contractTypes?: any[],
                public selectiveContractTypes?: boolean,
                public productIds?: number[],
                public locationIds?: number[],
                public paymentPeriod?: any,
                public customerTypeIds?: number[],
                public customerTypes?: CustomerType[],
                public products?: Product[],
                public canSetCustomerTypeIds?: boolean,
                public canSetProductIds?: boolean,
                public forced?: any,
                public costType?: CostType
    ) {
    }
}
