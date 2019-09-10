import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {VoucherTemplate} from './voucher-template.model';
import {createRequestOption} from '../../shared';
import {EntityResponseTypeBaseQueryResult} from "../base-query/base-query.service";
import {BaseQueryResult} from "../base-query/base-query.model";
import {VoucherMapping} from "../voucher-mapping/voucher-mapping.model";

export type EntityResponseType = HttpResponse<VoucherTemplate>;

@Injectable()
export class VoucherTemplateService {

    private resourceUrl = SERVER_API_URL + 'niopdcaccounting/api/voucher-templates';

    constructor(private http: HttpClient) {
    }

    create(voucherTemplate: VoucherTemplate): Observable<EntityResponseType> {
        const copy = this.convert(voucherTemplate);
        return this.http.post<VoucherTemplate>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(voucherTemplate: VoucherTemplate): Observable<EntityResponseType> {
        const copy = this.convert(voucherTemplate);
        return this.http.put<VoucherTemplate>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<VoucherTemplate>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<VoucherTemplate[]>> {
        const options = createRequestOption(req);
        return this.http.get<VoucherTemplate[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<VoucherTemplate[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    executeQuery(id: number,date: any,locationId: number): Observable<HttpResponse<any>> {
        let params = new HttpParams();
        if (locationId != null && date!= null)
            params = new HttpParams()
                .set('locationId', locationId.toString())
                .set('dateTime', date.toISOString());
        return this.http.get<any>(`${this.resourceUrl}/execute-query/${id}`, {params: params,observe: 'response'});
    }

    showQuery(voucherMapping: VoucherMapping, dateTime: any, locationId: number): Observable<EntityResponseTypeBaseQueryResult> {
        let params = new HttpParams();
        if (locationId != null && dateTime != null)
            params = new HttpParams()
                .set('locationId', locationId.toString())
                .set('dateTime', dateTime.toISOString());

        const copy = this.convert(voucherMapping);
        return this.http.post<BaseQueryResult>(`${this.resourceUrl}/show-query`, copy, {
            params: params,
            observe: 'response'
        })
            .map((res: EntityResponseTypeBaseQueryResult) => this.convertResponseBaseQueryResult(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: VoucherTemplate = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<VoucherTemplate[]>): HttpResponse<VoucherTemplate[]> {
        const jsonResponse: VoucherTemplate[] = res.body;
        const body: VoucherTemplate[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    private convertResponseBaseQueryResult(res: EntityResponseTypeBaseQueryResult): EntityResponseTypeBaseQueryResult {
        const body: BaseQueryResult = this.convertItemFromServerBaseQueryResult(res.body);
        return res.clone({body});
    }

    private convertItemFromServerBaseQueryResult(baseQueryResult: BaseQueryResult): BaseQueryResult {
        const copy: BaseQueryResult = Object.assign({}, baseQueryResult);
        return copy;
    }

    /**
     * Convert a returned JSON object to VoucherTemplate.
     */
    private convertItemFromServer(voucherTemplate: VoucherTemplate): VoucherTemplate {
        const copy: VoucherTemplate = Object.assign({}, voucherTemplate);
        return copy;
    }

    /**
     * Convert a VoucherTemplate to a JSON which can be sent to the server.
     */
    private convert(voucherTemplate: VoucherTemplate): VoucherTemplate {
        const copy: VoucherTemplate = Object.assign({}, voucherTemplate);
        return copy;
    }
}
