import { BaseEntity } from './../../shared';

export class SellGroundFuel implements BaseEntity {
    constructor(
        public id?: number,
        public amount?: number,
        public sellToDifferent?: boolean,
        public rate?: number,
        public totalPrice?: number,
        public dayDepotId?: number,
        public dayDepotTitle?: string,
    ) {
    }
}
