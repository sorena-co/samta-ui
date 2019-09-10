import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {BillItem} from './bill-item.model';
import {createRequestOption} from '../../shared';

export type EntityResponseType = HttpResponse<BillItem>;

@Injectable()
export class BillItemService {

    private resourceUrl = SERVER_API_URL + 'niopdcaccounting/api/bill-items';
    private resourceBillUrl = SERVER_API_URL + 'niopdcaccounting/api/bills';

    constructor(private http: HttpClient) {
    }

    create(billItem: BillItem): Observable<EntityResponseType> {
        const copy = this.convert(billItem);
        return this.http.post<BillItem>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(billItem: BillItem): Observable<EntityResponseType> {
        const copy = this.convert(billItem);
        return this.http.put<BillItem>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<BillItem>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<BillItem[]>> {
        const options = createRequestOption(req);
        return this.http.get<BillItem[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<BillItem[]>) => this.convertArrayResponse(res));
    }

    queryForReport(id: any): Observable<HttpResponse<BillItem[]>> {
        return this.http.get<BillItem[]>(`${this.resourceBillUrl}/${id}/bill-item-report`, {observe: 'response'})
            .map((res: HttpResponse<BillItem[]>) => this.convertArrayResponse(res));
    }


    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: BillItem = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<BillItem[]>): HttpResponse<BillItem[]> {
        const jsonResponse: BillItem[] = res.body;
        const body: BillItem[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to BillItem.
     */
    private convertItemFromServer(billItem: BillItem): BillItem {
        const copy: BillItem = Object.assign({}, billItem);
        return copy;
    }

    /**
     * Convert a BillItem to a JSON which can be sent to the server.
     */
    private convert(billItem: BillItem): BillItem {
        const copy: BillItem = Object.assign({}, billItem);
        return copy;
    }
}
