import { BaseEntity } from './../../shared';

export class OrderCost implements BaseEntity {
    constructor(
        public id?: number,
        public costId?: number,
        public rate?: number,
        public productId?: number,
        public orderId?: number,
        public orderProductId?: number,
    ) {
    }
}
