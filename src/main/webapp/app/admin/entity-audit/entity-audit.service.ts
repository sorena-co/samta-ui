import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {EntityAuditEvent} from './entity-audit-event.model';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {SERVER_API_URL} from '../../app.constants';

export type EntityResponseType = HttpResponse<EntityAuditEvent>;

@Injectable()
export class EntityAuditService {
    private resourceUrl = SERVER_API_URL;

    constructor(private http: HttpClient) {
    }

    getAllAudited(microServiceName: any): Observable<string[]> {
        const url = this.resourceUrl + microServiceName + '/api/audits/entity/all';
        return this.http.get<string[]>(url, {observe: 'response'})
            .map((res: HttpResponse<string[]>) => res.body);
    }

    findByEntity(microServiceName: any, entity: string, username: string, limit: number, startTime: any, endTime: any): Observable<HttpResponse<EntityAuditEvent[]>> {
        const url = this.resourceUrl + microServiceName + '/api/audits/entity/changes';
        let params = new HttpParams()
            .set('entityType', entity)
            .set('limit', limit.toString())
            .set('startTime', startTime.toISOString())
            .set('endTime', endTime.toISOString());
        if (username) {
            params = params.set('username', username);
        }

        return this.http.get<EntityAuditEvent[]>(url, {params, observe: 'response'})
            .map((response: HttpResponse<EntityAuditEvent[]>) => response);
    }

    getPrevVersion(microServiceName: any, qualifiedName: string, entityId: string, commitVersion: number) {
        const url = this.resourceUrl + microServiceName + '/api/audits/entity/changes/version/previous';
        const params = new HttpParams().set('qualifiedName', qualifiedName)
            .set('entityId', entityId)
            .set('commitVersion', commitVersion.toString());

        return this.http
            .get(url, {params})
            .map((response) => response);
    }
}
