import { BaseEntity } from './../../shared';

export class BaseQuery implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public tempQuery?: string,
    ) {
    }
}
export class BaseQueryResult {
    constructor(
        public header?: string[],
        public resultList?: any,
    ) {
    }
}
