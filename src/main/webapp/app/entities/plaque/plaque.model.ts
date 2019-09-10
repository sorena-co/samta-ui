import { BaseEntity } from './../../shared';

export class Plaque implements BaseEntity {
    constructor(
    public id?: number,
    public title?: string,
) {
    }
}
