import { BaseEntity } from './../../shared';

export class BillItem implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public productId?: number,
        public litre?: number,
        public costId?: number,
        public price?: number,
        public costRatePrice?: number,
        public costElementId?: number,
        public billId?: number,
    ) {
    }
}
