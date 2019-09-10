import { BaseEntity } from './../../shared';

export class Consumption implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public code?: string,
        public sellContractProducts?: BaseEntity[],
    ) {
    }
}
