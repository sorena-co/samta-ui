import {MainAuthority} from '../main-authority/main-authority.model';

export class Role {
    constructor(
        public id?: number,
        public name?: string,
        public activated?: boolean,
        public authoritiesId?: number,
        public denyAuthoritiesId?: number,
        public authorities?: MainAuthority[],
        public denyAuthorities?: MainAuthority[],
        public roleType?: any,
        public userType?: any
    ) {
        this.activated = true;
    }
}
