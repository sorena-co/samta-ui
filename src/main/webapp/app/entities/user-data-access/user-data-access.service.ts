import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { UserDataAccess } from './user-data-access.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<UserDataAccess>;

@Injectable()
export class UserDataAccessService {

    private resourceUrl =  SERVER_API_URL + '/niopdcbase/api/user-data-accesses';
    private resourceUserManagementUrl = SERVER_API_URL + 'niopdcbase/api/users';

    constructor(private http: HttpClient) { }

    create(userDataAccess: UserDataAccess): Observable<EntityResponseType> {
        const copy = this.convert(userDataAccess);
        return this.http.post<UserDataAccess>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(userDataAccess: UserDataAccess): Observable<EntityResponseType> {
        const copy = this.convert(userDataAccess);
        return this.http.put<UserDataAccess>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<UserDataAccess>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query( userManagementId: any, req?: any): Observable<HttpResponse<UserDataAccess[]>> {
        const options = createRequestOption(req);
        return this.http.get<UserDataAccess[]>(this.resourceUserManagementUrl + '/' + userManagementId + '/user-data-accesses', { params: options, observe: 'response' })
            .map((res: HttpResponse<UserDataAccess[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: UserDataAccess = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<UserDataAccess[]>): HttpResponse<UserDataAccess[]> {
        const jsonResponse: UserDataAccess[] = res.body;
        const body: UserDataAccess[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to UserDataAccess.
     */
    private convertItemFromServer(userDataAccess: UserDataAccess): UserDataAccess {
        const copy: UserDataAccess = Object.assign({}, userDataAccess);
        return copy;
    }

    /**
     * Convert a UserDataAccess to a JSON which can be sent to the server.
     */
    private convert(userDataAccess: UserDataAccess): UserDataAccess {
        const copy: UserDataAccess = Object.assign({}, userDataAccess);
        return copy;
    }
}
