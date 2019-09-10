import { BaseEntity } from './../../shared';

    export const enum FilterLocation {
            'DRAIN_TANKER',
            'BETWEEN_MAIN_AND_SERVICE',
            'LADING_UNIT',
            'OIL_DEPOT',
            'UNIT'
    }

    export const enum ElementRequestReason {
            'MAX_DIFF',
            'MAX_TIME_ELAPSED',
            'UNACCEPTABLE_DROP',
            'UNACCEPTABLE_RESULT',
            'ABNORMAL_RESULT',
            'TEARING_ELEMENT',
            'SUDDEN_DROP'
    }

export class RequestFilterElement implements BaseEntity {
    constructor(
    public id?: number,
    public filterNumber?: string,
    public lastChangeDate?: any,
    public microFilter?: string,
    public coalescer?: string,
    public separator?: string,
    public monitor?: string,
    public clay?: string,
    public productId?: number,
    public productTitle?: string,
    public filterLocation?: FilterLocation,
    public psi?: number,
    public microFilterModel?: string,
    public microFilterModelCount?: number,
    public coalesceModel?: string,
    public coalesceModelCount?: number,
    public monitorModel?: string,
    public monitorModelCount?: number,
    public separatorModel?: string,
    public separatorModelCount?: number,
    public clayModel?: string,
    public clayModelCount?: number,
    public elementRequestReason?: ElementRequestReason,
    public amountFuelPassed?: number,
    public description?: string,
    public isSend?: boolean,
    public oilTankId?: number,
    public oilTankTitle?: string,
    public refuelCenterId?: number,
) {
        this.isSend = false;
    }
}
