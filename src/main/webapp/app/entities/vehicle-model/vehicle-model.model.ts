import { BaseEntity } from './../../shared';

    export const enum CustomerGroup {
            'STATION',
            'SELLER',
            'MAJOR_CONSUMER',
            'CONSUMER',
            'AIRPLANE',
            'EXPORT',
            'LIQUID_GAS',
            'BOUNDARY'
    }

export class VehicleModel implements BaseEntity {
    constructor(
    public id?: number,
    public title?: string,
    public customerGroup?: CustomerGroup,
    public havePrimitiveMeasure?: boolean,
    public vehicleCapacities?: BaseEntity[],
) {
    }
}
