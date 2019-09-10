import {BaseEntity} from '../../../shared';
import {State} from '@progress/kendo-data-query/dist/npm/state';

export class DailySalesSummary {
    constructor(
        public count: number,
        public customerName: string,
        public personName: string,
        public locationTitle: string,
        public amount: number,
        public productTitle: string,
        public ratePrice: number,
        public totalPrice: number,
        public basePrice: number,
        public buyGroup: string
    ) {
    }
}

export class DailySalesSummaryRequest {
    constructor(
        public state?: State,
        public timeByOrderCreate?: boolean,
        public date?: any,
        public locations?: number[],
        public products?: number[],
        public buyGroups?: number[]
    ) {
        this.timeByOrderCreate = true;
    }
}
