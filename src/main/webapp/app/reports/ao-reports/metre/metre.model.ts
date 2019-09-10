import {BaseEntity} from '../../../shared';
import {State} from '@progress/kendo-data-query/dist/npm/state';

export class Metre {
    constructor(
        public unitName: string,
        public metreName: string,
        public productCode: string,
        public productName: string,
        public amount: number,
        public refuelCenter: string,


    ) {
    }
}


export class MetreRequest {
    constructor(
        public state?: State,
        public startDate?: any,
        public finishDate?: any,
        public refuelCenterId?: number
    ) {
    }
}
