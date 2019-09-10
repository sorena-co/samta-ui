import { BaseEntity } from './../../shared';

export enum BankTransactionState {
    'BEGIN',
    'SYS_ERROR',
    'CANCEL',
    'BANK_ERROR',
    'COMPLETE',
    'COMPLETE_PAY',
    'FAILED',
    'INVALIDATE',
    'PENDING'
}
export enum SpentType {
    'CASH', 'CREDIT', 'WALLET'
}

export class BankTransaction implements BaseEntity {
    constructor(
        public id?: number,
        public identifier?: string,
        public username?: string,
        public requestDate?: any,
        public bankTransactionState?: BankTransactionState,
        public type?: SpentType,
        public amount?: number,
        public responseBody?: string,
        public responseDate?: any,
        public error?: string,
        public redirectUrl?: string,
        public bankTransactionRefs?: BaseEntity[],
    ) {
    }
}
