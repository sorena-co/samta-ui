import { BaseEntity } from './../../shared';

export class SellContractCustomer implements BaseEntity {
    constructor(
        public id?: number,
        public hasTransport?: boolean,
        public sellContractId?: number,
        public customerId?: number,
        public customerName?: string,
        public customerRegCode?: string,
        public locationId?: number,
        public locationName?: number,
        public sellContractProducts?: BaseEntity[],
        public customerGroup?: any,
        public customerTypeId?: number,
        public active?: any,
        public startDate?: any,
        public finishDate?: any,
        public creditAccount?: string,
        public costAccount?: string
    ) {
        this.hasTransport = false;
        this.active = false;
    }
}
