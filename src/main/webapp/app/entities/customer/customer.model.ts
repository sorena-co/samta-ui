import {BaseEntity} from './../../shared';
import {CarRfId} from '../car-rf-id';
import {CarTank} from '../car-tank';
import {Location} from "../location";

export class Customer implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public code?: string,
        public postalCode?: string,
        public registerCode?: string,
        public movableCode?: string,
        public registerDate?: any,
        public startDate?: any,
        public finishDate?: any,
        public telephone?: string,
        public address?: string,
        public buyOneToMany?: boolean,
        public salesPermit?: boolean,
        public identifyCode?: string,
        public gsId?: string,
        public typeId?: number,
        public typeTitle?: string,
        public carRfId?: string,
        public regionId?: number,
        public airplaneModelId?: number,
        public locations?: Location[],
        public carRfIds?: CarRfId[],
        public carTanks?: CarTank[],
        public sellContractCustomers?: BaseEntity[],
        public customerGroupTitle?: any,
        public selfCode?: string,
        public plaque?: string,
        public transitPlaque?: string,
        public creditAccount?: string,
        public capacity?: number,
        public productId?: number,
        public productTitle?: string,
        public vehicleModelId?: number,
        public plaqueTemplateTitle?: string,
        public plaqueTemplateId?: number,
        public vehicleModelTitle?: string,
        public regionName?: string,
        public locationName?: string,
        public locationNames?: string,
        public vehicleModelHavePrimitiveMeasure?: boolean,
        public refuelCenterIds?: number[]
    ) {
        this.buyOneToMany = false;
        this.salesPermit = false;
    }
}

export class OldCuctomer implements BaseEntity {
    constructor(
        public id?: number,
        public customerName?: string,
        public code?: string,
    ) {

    }
}
