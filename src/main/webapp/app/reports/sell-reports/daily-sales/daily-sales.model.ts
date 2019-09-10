import { BaseEntity } from '../../../shared';
import {State} from '@progress/kendo-data-query/dist/npm/state';

export class DailySales {
    constructor(
        public depotTitle: string,
        public productTitle: string,
        public locationTitle: string,
        public ratePrice: string,
        public amount: string,
        public totalPrice: number,
        public basePrice: string,
        public customerName: string,
        public personName: string,
        public buyGroup: string,
        public status: string,
        public costPrice: string,
        public currency: string
    ) {
    }
}

export class DailySalesRequest {
    constructor(
        public state?: State,
        public timeByOrderCreate?: boolean,
        public startDate?: any,
        public finishDate?: any,
        public locations?: number[],
        public products?: number[],
        public depots?: number[],
        public buyGroups?: number[],
        public customers?: number[],
        public currencies?: number[]
    ) {
        this.timeByOrderCreate = true;
    }
}
