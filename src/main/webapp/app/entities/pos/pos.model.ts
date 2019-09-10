import {BaseEntity} from './../../shared';

export class Pos implements BaseEntity {
    constructor(
        public id?: number,
        public serial?: string,
        public airportId?: number,
    ) {
    }
}
