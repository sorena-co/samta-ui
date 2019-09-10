import { BaseEntity } from './../../shared';
import {VoucherTypeGroup} from "../voucher-type-group/voucher-type-group.model";

export enum Referrer {
    'BILL',
    'ORDER',
    'NORMAL',
    'VOUCHER_PAYMENT'
}
export class VoucherTemplate implements BaseEntity {
    constructor(
    public id?: number,
    public voucherMappings?: BaseEntity[],
    public voucherTypeId?: number,
    public voucherTypeGroupId?: number,
    public referrer?: any,
    public voucherTypeTitle?: string,
    public voucherTypeGroupTitle?: string
) {
    }
}
