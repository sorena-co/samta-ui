import {Role} from "../../entities/role";

export enum UserType {
    'HEAD',
    'AREA',
    'ZONE',
    'PERSON',
    'REFUEL_CENTER'
}

export class User {
    public id?: any;
    public login?: string;
    public firstName?: string;
    public lastName?: string;
    public fullName?: string;
    public locationName?: string;
    public email?: string;
    public activated?: any;
    public langKey?: string;
    public authorities?: any[];
    public denyAuthorities?: any[];
    public createdBy?: string;
    public createdDate?: Date;
    public lastModifiedBy?: string;
    public lastModifiedDate?: Date;
    public password?: string;
    public roles?: Role[];
    public locationIds?: number[];
    public userType?: any;

    constructor(
        id?: any,
        login?: string,
        firstName?: string,
        lastName?: string,
        email?: string,
        activated?: Boolean,
        langKey?: string,
        authorities?: any[],
        createdBy?: string,
        createdDate?: Date,
        lastModifiedBy?: string,
        lastModifiedDate?: Date,
        password?: string
    ) {
        this.id = id ? id : null;
        this.login = login ? login : null;
        this.firstName = firstName ? firstName : null;
        this.lastName = lastName ? lastName : null;
        this.email = email ? email : null;
        this.activated = activated ? activated : false;
        this.langKey = langKey ? langKey : null;
        this.authorities = authorities ? authorities : null;
        this.createdBy = createdBy ? createdBy : null;
        this.createdDate = createdDate ? createdDate : null;
        this.lastModifiedBy = lastModifiedBy ? lastModifiedBy : null;
        this.lastModifiedDate = lastModifiedDate ? lastModifiedDate : null;
        this.password = password ? password : null;
    }
}
