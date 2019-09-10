import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { VoucherMaster } from './voucher-master.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<VoucherMaster>;

@Injectable()
export class VoucherMasterService {

    private resourceUrl =  SERVER_API_URL + 'niopdcaccounting/api/voucher-masters';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(voucherMaster: VoucherMaster): Observable<EntityResponseType> {
        const copy = this.convert(voucherMaster);
        return this.http.post<VoucherMaster>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(voucherMaster: VoucherMaster): Observable<EntityResponseType> {
        const copy = this.convert(voucherMaster);
        return this.http.put<VoucherMaster>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<VoucherMaster>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }
    findForReport(id: number): Observable<EntityResponseType> {
        return this.http.get<VoucherMaster>(`${this.resourceUrl}/report/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }


    query(req?: any): Observable<HttpResponse<VoucherMaster[]>> {
        const options = createRequestOption(req);
        return this.http.get<VoucherMaster[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<VoucherMaster[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    confirm(id: number): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceUrl}/${id}/confirm`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: VoucherMaster = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<VoucherMaster[]>): HttpResponse<VoucherMaster[]> {
        const jsonResponse: VoucherMaster[] = res.body;
        const body: VoucherMaster[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to VoucherMaster.
     */
    private convertItemFromServer(voucherMaster: VoucherMaster): VoucherMaster {
        const copy: VoucherMaster = Object.assign({}, voucherMaster);
        copy.confirmDate = this.dateUtils
            .convertDateTimeFromServer(voucherMaster.confirmDate);
        return copy;
    }

    /**
     * Convert a VoucherMaster to a JSON which can be sent to the server.
     */
    private convert(voucherMaster: VoucherMaster): VoucherMaster {
        const copy: VoucherMaster = Object.assign({}, voucherMaster);
        return copy;
    }
}
