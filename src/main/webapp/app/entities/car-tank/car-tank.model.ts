import { BaseEntity } from './../../shared';

    export  enum TankType {
            'CUBE',
            'CONE'
    }

export class CarTank implements BaseEntity {
    constructor(
    public id?: number,
    public longitude?: number,
    public latitude?: number,
    public height?: number,
    public radius?: number,
    public tankType?: any,
    public tankNo?: string,
    public title?: string,
    public customerId?: number,
) {
    }
}
