import {BaseEntity} from './../../shared';

export class CarRfId implements BaseEntity {
    constructor(
    public id?: number,
    public code?: string,
    public active?: boolean,
    public price?: number,
    public buyDate?: any,
    public customerId?: number,
    public customerName?: string,
    public tagRateId?: number,
    public tagRateSellPrice?: number,
) {
        this.active = false;
    }
}
