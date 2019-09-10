import { BaseEntity } from './../../shared';
import {CustomerGroup} from "../cost-element";



export enum RateGroupType {
    'SUBSIDY',
    'NON_SUBSIDY'
}

export class RateGroup implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public type?: string | RateGroupType,
        public locationIds?: any[],
        public customerTypeIds?: number[],
        public contractTypes?: string[],
        public selectiveCustomerTypes?: boolean,
        public customerGroup?:  string | CustomerGroup,
        public selectiveContractTypes?: boolean,
        public regionIds?: number[]
    ) {
    }
}
