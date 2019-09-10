import {BaseEntity} from './../../shared';

export enum ConfigType {
    'BOUNDARY_SELL',
    'NORMAL_SELL',
    'NIOPDC_AO'
}

export class NiopdcConfig implements BaseEntity {
    constructor(
        public id?: number,
        public startDate?: any,
        public finishDate?: any,
        public boundaryCurrencyRateGroupId?: number,
        public transferTypeId?: number,
        public boundaryCurrencies?: number[],
        public configType?: string
    ) {
    }
}
