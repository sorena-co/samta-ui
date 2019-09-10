import { BaseEntity } from './../../shared';

export class LiteratureVolumeOilTank implements BaseEntity {
    constructor(
        public id?: number,
        public millimeter?: number,
        public liter?: number,
        public oilTankId?: number,
        public serviceOilTankId?: number,
        public measureType?: any,
        public oilTankMeasureType?: any,
    ) {
    }
}
