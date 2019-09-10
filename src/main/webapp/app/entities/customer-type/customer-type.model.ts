import { BaseEntity } from '../../shared';

export enum LocationType {
    'FIXED',
    'MOVABLE'
}

export enum CustomerGroup {
    'STATION',
    'SELLER',
    'MAJOR_CONSUMER',
    'CONSUMER',
    'AIRPLANE',
    'EXPORT',
    'LIQUID_GAS',
    'BOUNDARY'
}

export class CustomerType implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public code?: string,
        public locationType?: any,
        public customerGroup?: any | CustomerGroup,
        public taxExempt?: boolean,
        public hasGsId?: boolean,
        public active?: boolean,
        public customerCodeTitle?: string,
        public customerTypeIgnores?: BaseEntity[],
        public customerDeactiveRules?: BaseEntity[],
    ) {
        this.taxExempt = false;
        this.hasGsId = false;
    }
}
