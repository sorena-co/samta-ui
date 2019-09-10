import { BaseEntity } from './../../shared';

export enum SpentType {
    'CASH', 'CREDIT', 'WALLET'
}

export class PaymentBill implements BaseEntity {
    constructor(
        public id?: number,
        public spentDate?: any,
        public amount?: number,
        public customerId?: number,
        public personId?: number,
        public type?: SpentType,
        public billId?: number,
        public paymentId?: number,
    ) {
    }
}
