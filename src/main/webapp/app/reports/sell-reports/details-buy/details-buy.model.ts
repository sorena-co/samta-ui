import { BaseEntity } from '../../../shared';
import {State} from '@progress/kendo-data-query/dist/npm/state';

export class DetailsBuyRequest {
    constructor(
        public state?: State,
        public timeByOrderCreate?: boolean,
        public startDate?: any,
        public finishDate?: any,
        public locations?: number[],
        public customerTypes?: number[]
    ) {
        this.timeByOrderCreate = true;
    }
}
