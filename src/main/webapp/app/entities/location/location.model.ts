import {BaseEntity} from './../../shared';
import {Country} from "../country";

export enum TranshipType {
    'INSIDE_TO_OUT',
    'OUT_TO_INSIDE_WHIT_PRIMITIVE',
    'OUT_TO_INSIDE_WHIT_OUT_PRIMITIVE',
    'ONLY_PUMP_NOZZLE'
}


export class Location implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public code?: string,
        public financialCode?: string,
        public costAccount?: string,
        public startOrderNumber?: string,
        public endOrderNumber?: string,
        public currentOrderNumber?: string,
        public level?: number,
        public locationId?: number,
        public parentLocationId?: number,
        public depots?: BaseEntity[],
        public regions?: BaseEntity[],
        public sellContractCustomers?: BaseEntity[],
        public people?: BaseEntity[],
        public customers?: BaseEntity[],
        public news?: BaseEntity[],
        public sellContracts?: BaseEntity[],
        public transhipType?: string,
        public beforeControl?: boolean,
        public customerDeactiveRules?: BaseEntity[],
        public country?: BaseEntity,
        public canOpen?: Boolean,
        public canClose?: Boolean,
        public subLocations?: Location[],
    ) {
        this.country = new Country();
    }
}

export class LocationDate {
    constructor(
        public serverDate?: any,
        public locationDay?: any,
        public day?: boolean,
    ) {
    }
}
