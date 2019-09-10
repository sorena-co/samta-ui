import {BaseEntity} from './../../shared';

export enum DepotType {
    'DEPOT',
    'REFUELING_UNIT'
}

export class Depot implements BaseEntity {
    constructor(public id?: number,
                public title?: string,
                public code?: string,
                public accCode?: string,
                public depotType?: any,
                public refuelCenterId?: number,
                public locationId?: number,
                public locationName?: string,
                public products?: BaseEntity[],
                public locations?: BaseEntity[],
                public sellContractProducts?: BaseEntity[]) {
    }
}
