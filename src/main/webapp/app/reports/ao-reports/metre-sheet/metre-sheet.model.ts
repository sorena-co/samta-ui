import { BaseEntity } from '../../../shared';
import {State} from '@progress/kendo-data-query/dist/npm/state';

export class MetreSheet {
    constructor(
        public oilTank: string,
        public receiptNo: string,
        public dateTime: string,
        public dayDate: string,
        public personName: string,
        public prtoductCode: string,
        public productGroupTitle: string,
        public fuelType: string,
        public type: string,
        public amount: number,
        public agoMetre: number,
        public nextMetre: number,
        public createUser: string,
        public airplaneName: string,
        public airplaneModel: string,
    ) {
    }
}

export class MetreSheetRequest {
    constructor(
        public state?: State,
        public startDate?: any,
        public finishDate?: any,
        public metre?: number,
        public oilTankId?: number,
        public refuelCenterId?: number
    ) {
    }
}
