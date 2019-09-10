import {BaseEntity} from './../../shared';

export enum ReceiptMethod {
    'BRANCH',
    'EPAYMENT'
}

export const enum Bank {
    'MARKAZI'
}

export class Payment implements BaseEntity {
    constructor(
        public id?: number,
        public currencyId?: number,
        public bankAccountNumber?: string,
        public customerId?: number,
        public customerName?: string,
        public personId?: number,
        public personName?: string,
        public receiptNo?: string,
        public receiptDateTime?: any,
        public amount?: number,
        public currentAmount?: number,
        public registerMethod?: ReceiptMethod | any,
        public verified?: boolean,
        public bank?: Bank,
    ) {
    }
}
