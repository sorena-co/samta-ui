import { BaseEntity } from '../../../shared';
import {State} from '@progress/kendo-data-query/dist/npm/state';

export class Consumption {
    constructor(
        public orderNoFrom: string,
        public orderNoTo: string,
        public count: number,
        public customerName: string,
        public locationTitle: string,
        public amount: number,
        public productTitle: string,
        public ratePrice: number,
        public totalPrice: number,
        public basePrice: number,
        public buyGroup: string,
        public issueType: string
    ) {
    }
}

export class ConsumptionRequest {
    constructor(
        public state?: State,
        public timeByOrderCreate?: boolean,
        public startDate?: any,
        public finishDate?: any,
        public locations?: number[],
        public products?: number[]
    ) {
        this.timeByOrderCreate = true;
    }
}
