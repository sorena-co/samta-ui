import {BaseEntity} from './../../shared';

export enum DeactiveReason {
    'DEBTOR'

}

export class CustomerDeactiveRule implements BaseEntity {
    constructor(
        public id?: number,
        public sellContractCode?: string,
        public customerName?: string,
        public customerId?: number,
        public startDate?: any,
        public finishDate?: any,
        public description?: string,
        public locations?: BaseEntity[],
        public customerTypes?: BaseEntity[],
        public deactiveReasons?: any[]
    ) {
    }
}
