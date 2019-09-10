import { BaseEntity } from './../../shared';

export class RequestTestResult implements BaseEntity {
    constructor(
    public id?: number,
    public productId?: number,
    public productTitle?: string,
    public date?: any,
    public sampleValue?: number,
    public oilTankInventory?: number,
    public sourceOilTankNumber?: string,
    public isSend?: boolean,
    public oilTankId?: number,
    public oilTankTitle?: string,
    public refuelCenterId?: number,
) {
        this.isSend = false;
    }
}
