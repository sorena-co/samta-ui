import { BaseEntity } from './../../shared';

export class SellContractPerson implements BaseEntity {
    constructor(
        public id?: number,
        public sharePercent?: number,
        public startDate?: any,
        public active?: boolean,
        public sellContractId?: number,
        public sellContractContractNo?: number,
        public personId?: number,
        public personFullName?: string,
        public creditAccount?: string,
        public costAccount?: string
    ) {
        this.active = false;
    }
}
