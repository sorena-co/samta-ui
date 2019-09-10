import {BaseEntity} from './../../shared';

export class Product implements BaseEntity {
    constructor(
        public id?: number,
        public code?: string,
        public title?: string,
        public hasContainer?: boolean,
        public calculateContainerPrice?: boolean,
        public productGroupId?: number,
        public productGroupTitle?: string,
        public productUnitId?: number,
        public containerId?: number,
        public containerTitle?: string,
        public sellContractProducts?: BaseEntity[],
        public productColor?: string,
    ) {
        this.hasContainer = false;
        this.calculateContainerPrice = false;
    }
}
