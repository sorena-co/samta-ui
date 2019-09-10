import {BaseEntity} from './../../shared';

export class RefuelCenter implements BaseEntity {
    constructor(
        public id?: number,
        public persianTitle?: string,
        public englishTitle?: string,
        public code?: string,
        public locationId?: number,
        public fuelReceiptStartNumber?: number,
        public fuelReceiptEndNumber?: number,
        public fuelReceiptCurrentNumber?: number,
        public wayBillStartNumber?: number,
        public wayBillEndNumber?: number,
        public wayBillCurrentNumber?: number,
        public regionId?: number,
        public depotIds?: number[],
        public locationTitle?: string,
        public transferTypes?: BaseEntity[],
        public targetRefuelCenters?: BaseEntity[],
        public airports?: BaseEntity[],
    ) {
    }
}
