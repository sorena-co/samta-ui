import { BaseEntity } from './../../shared';

    export const enum PaymentPeriod {
            'DAY',
            'MONTH',
            'SEASON',
            'YEAR'
    }


export class Bill implements BaseEntity {
    constructor(
    public id?: number,
    public customerId?: number,
    public name?: string,
    public sellContractId?: number,
    public locationId?: number,
    public customerScore?: number,
    public paymentPeriod?: any,
    public day?: number,
    public month?: number,
    public year?: number,
    public totalPrice?: number,
    public billItems?: BaseEntity[],
) {
    }
}
