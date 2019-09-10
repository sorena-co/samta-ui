import { BaseEntity } from './../../shared';

export class ShiftWork implements BaseEntity {
    constructor(
    public id?: number,
    public fromDate?: any,
    public toDate?: any,
    public locationId?: number,
) {
    }
}
