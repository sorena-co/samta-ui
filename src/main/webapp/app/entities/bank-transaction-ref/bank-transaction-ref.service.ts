import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { BankTransactionRef } from './bank-transaction-ref.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<BankTransactionRef>;

@Injectable()
export class BankTransactionRefService {

    private resourceUrl =  SERVER_API_URL + 'niopdcpayment/api/bank-transaction-refs';

    constructor(private http: HttpClient) { }

    create(bankTransactionRef: BankTransactionRef): Observable<EntityResponseType> {
        const copy = this.convert(bankTransactionRef);
        return this.http.post<BankTransactionRef>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(bankTransactionRef: BankTransactionRef): Observable<EntityResponseType> {
        const copy = this.convert(bankTransactionRef);
        return this.http.put<BankTransactionRef>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<BankTransactionRef>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<BankTransactionRef[]>> {
        const options = createRequestOption(req);
        return this.http.get<BankTransactionRef[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<BankTransactionRef[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: BankTransactionRef = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<BankTransactionRef[]>): HttpResponse<BankTransactionRef[]> {
        const jsonResponse: BankTransactionRef[] = res.body;
        const body: BankTransactionRef[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to BankTransactionRef.
     */
    private convertItemFromServer(bankTransactionRef: BankTransactionRef): BankTransactionRef {
        const copy: BankTransactionRef = Object.assign({}, bankTransactionRef);
        return copy;
    }

    /**
     * Convert a BankTransactionRef to a JSON which can be sent to the server.
     */
    private convert(bankTransactionRef: BankTransactionRef): BankTransactionRef {
        const copy: BankTransactionRef = Object.assign({}, bankTransactionRef);
        return copy;
    }
}
