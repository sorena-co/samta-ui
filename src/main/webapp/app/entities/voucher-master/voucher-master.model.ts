import { BaseEntity } from './../../shared';

export enum VoucherMasterStatus {
    'CONFIRM',
    'PENDING'
}

export class VoucherMaster implements BaseEntity {
    constructor(
        public id?: number,
        public locationId?: number,
        public locationTitle?: string,
        public confirmDate?: any,
        public userConfirm?: string,
        public docNumber?: string,
        public description?: string,
        public status?: any,
        public voucherItems?: BaseEntity[],
        public voucherTypeId?: number,
        public voucherTypeTitle?: number
    ) {
    }
}
