import {BaseEntity} from './../../shared';

export enum OilTankType {
    'MAIN',
    'CONTAMINATED',
    'SERVICE_TANK',
    'UNIT',
    'PLATFORM',
    'WATER_METHANOL',
    'BASE_PRODUCT',
    'EARTH',
    'RECYCLE'
}

export  enum OilTankStatus {
    'UNDER_REPAIR',
    'STAGNANT',
    'ACTIVE'
}

export enum MeasureType {
    'NORMAL',
    'RATIO'
}

export class OilTank implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public code?: string,
        public virtualCapacity?: number,
        public capacity?: number,
        public measureType?: any,
        public productId?: number,
        public productTitle?: string,
        public oilTankType?: any,
        public oilTankStatus?: any,
        public refuelCenterId?: number,
        public refuelCenterPersianTitle?: string
    ) {
    }
}
