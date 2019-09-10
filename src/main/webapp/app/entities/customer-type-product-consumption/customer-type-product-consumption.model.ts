import { BaseEntity } from './../../shared';

export class CustomerTypeProductConsumption implements BaseEntity {
    constructor(
        public id?: number,
        public customerTypeId?: number,
        public productId?: number,
        public consumptionId?: number,
    ) {
    }
}
