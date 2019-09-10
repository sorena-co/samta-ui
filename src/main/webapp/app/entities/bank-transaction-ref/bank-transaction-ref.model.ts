import { BaseEntity } from './../../shared';

export class BankTransactionRef implements BaseEntity {
    constructor(
        public id?: number,
        public orderId?: number,
        public personId?: number,
        public customerId?: number,
        public amount?: number,
        public bankTransactionId?: number,
    ) {
    }
}
