import { BaseEntity } from './../../shared';
import {ContractType} from '../sell-contract';

export class UserDataAccess implements BaseEntity {
    constructor(
        public id?: number,
        public username?: string,
        public contractType?: ContractType,
        public locationId?: number,
        public regionId?: number,
        public personId?: number,
        public customerId?: number,
        public customerTypeId?: number,
    ) {
    }
}
