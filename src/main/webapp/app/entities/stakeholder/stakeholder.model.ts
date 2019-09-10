import { BaseEntity } from './../../shared';

export enum StakeholderType {
    'CEO',
    'OTHER'
}

export class Stakeholder implements BaseEntity {
    constructor(
        public id?: number,
        public sharePercent?: number,
        public stakeholderType?: StakeholderType,
        public companyId?: number,
        public personId?: number,
    ) {
    }
}
