import { BaseEntity } from './../../shared';

    export const enum LoanReason {
            'REPAIRS'
    }

export class Loan implements BaseEntity {
    constructor(
    public id?: number,
    public customerId?: number,
    public amount?: number,
    public reason?: LoanReason,
    public description?: string,
    public installmentCount?: number,
    public firstPaymentDate?: any,
    public completed?: boolean,
    public payByBill?: boolean,
    public penaltyDay?: number,
    public loanTypeId?: number,
) {
        this.completed = false;
        this.payByBill = false;
    }
}
