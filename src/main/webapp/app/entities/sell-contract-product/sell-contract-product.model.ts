import {BaseEntity} from '../../shared';
import {CostResponse} from '../order';

export enum TypeOfFuelReceipt {
    'TANKER_SALES',
    'PIPE_LINE_SALES',
    'UNIT_TO_AIRPLANE',
    'UNIT_TO_CUSTOMERS'
}

export class SellContractProduct implements BaseEntity {
    constructor(
        public id?: number,
        public rateGroupId?: number,
        public rateGroupTitle?: string,
        public currencyRateGroupId?: number,
        public currencyRateGroupTitle?: string,
        public consumptionId?: number,
        public productTitle?: string,
        public productColer?: string,
        public productId?: number,
        public productColor?: string,
        public sellContractCustomerId?: number,
        public depots?: BaseEntity[],
        public buyTypes?: BaseEntity[],
        public costGroupIds?: number[],
        public currencyIds?: number[],
        public sellContractId?: number,
        public sellContractNumber?: string,
        public costResponses?: CostResponse[],
        public startDate?: any,
        public finishDate?: any,
        public typeOfFuelReceipts?: any[]
    ) {
        currencyRateGroupId = null;
    }
}
