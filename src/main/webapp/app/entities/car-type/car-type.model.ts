import { BaseEntity } from './../../shared';

export class CarType implements BaseEntity {
    constructor(
    public id?: number,
    public title?: string,
) {
    }
}
