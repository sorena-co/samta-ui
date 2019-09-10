import {BaseEntity} from './../../shared';
import {Location} from '../location/location.model';
import {SellContractPerson} from '../sell-contract-person/sell-contract-person.model';
import {SellContractCustomer} from '../sell-contract-customer/sell-contract-customer.model';

export enum ContractType {
    'SUPPLY_CHANNEL',
    'EXPORT',
    'EXCHANGE',
    'CONSUMER',
    'LIQUID_GAS',
    'MILITARY',
    'AIRPLANE',
    'BRAND'
}

export class SellContract implements BaseEntity {
    constructor(
        public id?: number,
        public customerDeactiveRuleId?: number,
        public startDate?: any,
        public finishDate?: any,
        public exportationDate?: any,
        public contractNo?: string,
        public description?: string,
        public contractType?: ContractType | any,
        public active?: boolean,
        public customers?: string,
        public people?: string,
        public sellContractCustomers?: SellContractCustomer[],
        public locations?: Location[],
        public sellContractPeople?: SellContractPerson[],
        public calculateTax?: boolean,
        public finishDateServer?: any,
    ) {
    }
}

export class CustomerPerson {
    constructor(
        public id?: string,
        public customerName?: string,
        public customerCode?: string,
        public customerId?: number,
        public personName?: string,
        public personId?: number,
        public contractNo?: string,
        public sellContractId?: number,
    ) {
    }
}

export class CustomerSellContract {
    constructor(
        public id?: string,
        public customerName?: string,
        public customerCode?: string,
        public sellContractId?: number,
        public locationId?: number,
        public customerId?: number,
        public contractNo?: string,
    ) {
    }
}
