import {BaseEntity} from './../../shared';
import {CustomerType} from "../customer-type";
import {Product} from "../product";

export enum RateType {
    'PERCENT',
    'CONST',
    'PER_LITRE',
    'PER_LITRE_SCORE'
}

export enum Effect {
    'BASE',
    'TOTAL',
    'PARENT_COST'
}

export enum CostAction {
    'REDUCER',
    'MULTIPLIER'
}

export enum CostType {
    'WITH_ORDER',
    'SEPARATE_RECEIPT',
    'BILL'
}

export enum CostRelated {
    'TAX',
    'COMPLICATION',
    'RENOVATION',
    'POLLUTION'
}

export class Cost implements BaseEntity {
    constructor(public id?: number,
                public rateType?: any,
                public effect?: any,
                public code?: string,
                public costAction?: any,
                public costType?: CostType,
                public startLitre?: number,
                public endLitre?: number,
                public costRelated?: CostRelated,
                public costGroupId?: number,
                public parentId?: number,
                public productIds?: number[],
                public locationIds?: number[],
                public customerTypeIds?: number[],
                public canSetProductIds?: boolean,
                public selectiveContractTypes?: boolean,
                public contractTypes?: any[],
                public customerTypes?: CustomerType[],
                public products?: Product[],
                public canSetCustomerTypeIds?: boolean) {
    }
}
