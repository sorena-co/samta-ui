import { BaseEntity } from './../../shared';

export class OrderPayment implements BaseEntity {
    constructor(
        public id?: number,
        public paymentId?: number,
        public decreasedPrice?: number,
        public orderId?: number,
    ) {
    }
}
