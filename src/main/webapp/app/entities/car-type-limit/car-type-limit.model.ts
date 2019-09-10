import { BaseEntity } from './../../shared';

export class CarTypeLimit implements BaseEntity {
    constructor(
        public id?: number,
        public hour?: number,
        public fromDate?: any,
        public toDate?: any,
        public customerTypeId?: number,
        public customerTypeTitle?: any,
        public locationId?: number,
        public locationTitle?: number,

    ) {
    }
}
