import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {BaseQuery, BaseQueryResult} from './base-query.model';
import {createRequestOption} from '../../shared';

export type EntityResponseType = HttpResponse<BaseQuery>;
export type EntityResponseTypeBaseQueryResult = HttpResponse<BaseQueryResult>;

@Injectable()
export class BaseQueryService {

    private resourceUrl = SERVER_API_URL + 'niopdcaccounting/api/base-queries';

    constructor(private http: HttpClient) {
    }

    create(baseQuery: BaseQuery): Observable<EntityResponseType> {
        const copy = this.convert(baseQuery);
        return this.http.post<BaseQuery>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(baseQuery: BaseQuery): Observable<EntityResponseType> {
        const copy = this.convert(baseQuery);
        return this.http.put<BaseQuery>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<BaseQuery>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    resultList(id: number, dateTime: any, locationId: number): Observable<EntityResponseTypeBaseQueryResult> {
        let params = new HttpParams();
        if (locationId != null && dateTime != null)
            params = new HttpParams()
                .set('locationId', locationId.toString())
                .set('dateTime', dateTime.toISOString());

        return this.http.get<BaseQueryResult>(`${this.resourceUrl}/result-list/${id}`, {
            params: params,
            observe: 'response'
        }).map((res: EntityResponseTypeBaseQueryResult) => this.convertResponseBaseQueryResult(res));
    }

    resultListByTempQuery(baseQuery: BaseQuery, dateTime: any, locationId: number): Observable<EntityResponseTypeBaseQueryResult> {
        const copy = this.convert(baseQuery);
        let params = new HttpParams();
        if (locationId != null && dateTime != null)
            params = new HttpParams()
                .set('locationId', locationId.toString())
                .set('dateTime', dateTime.toISOString());

        return this.http.post<BaseQueryResult>(`${this.resourceUrl}/result-list`, copy, {
            params: params,
            observe: 'response'
        }).map((res: EntityResponseTypeBaseQueryResult) => this.convertResponseBaseQueryResult(res));
    }

    query(req?: any): Observable<HttpResponse<BaseQuery[]>> {
        const options = createRequestOption(req);
        return this.http.get<BaseQuery[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<BaseQuery[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: BaseQuery = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertResponseBaseQueryResult(res: EntityResponseTypeBaseQueryResult): EntityResponseTypeBaseQueryResult {
        const body: BaseQueryResult = this.convertItemFromServerBaseQueryResult(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<BaseQuery[]>): HttpResponse<BaseQuery[]> {
        const jsonResponse: BaseQuery[] = res.body;
        const body: BaseQuery[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to BaseQuery.
     */
    private convertItemFromServer(baseQuery: BaseQuery): BaseQuery {
        const copy: BaseQuery = Object.assign({}, baseQuery);
        return copy;
    }

    private convertItemFromServerBaseQueryResult(baseQueryResult: BaseQueryResult): BaseQueryResult {
        const copy: BaseQueryResult = Object.assign({}, baseQueryResult);
        return copy;
    }

    /**
     * Convert a BaseQuery to a JSON which can be sent to the server.
     */
    private convert(baseQuery: BaseQuery): BaseQuery {
        const copy: BaseQuery = Object.assign({}, baseQuery);
        return copy;
    }
}
