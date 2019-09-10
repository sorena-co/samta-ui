import { BaseEntity } from './../../shared';

export class BoundaryDiscount implements BaseEntity {
    constructor(
    public id?: number,
    public liter?: number,
    public kilometer?: number,
    public productId?: number,
    public productTitle?: string,
    public locationId?: number,
    public locationName?: string,
    public countryId?: number,
    public countryName?: string,
    public vehicleModelId?: number,
    public vehicleModelTitle?: string,
) {
    }
}
