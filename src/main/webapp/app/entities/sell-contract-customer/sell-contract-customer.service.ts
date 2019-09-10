import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { SellContractCustomer } from './sell-contract-customer.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SellContractCustomer>;

@Injectable()
export class SellContractCustomerService {

    private resourceUrl =  SERVER_API_URL + '/niopdcbase/api/sell-contract-customers';
    private resourceSellContractUrl =  SERVER_API_URL + '/niopdcbase/api/sell-contracts';
    constructor(private http: HttpClient) { }

    create(sellContractCustomer: SellContractCustomer): Observable<EntityResponseType> {
        const copy = this.convert(sellContractCustomer);
        return this.http.post<SellContractCustomer>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(sellContractCustomer: SellContractCustomer): Observable<EntityResponseType> {
        const copy = this.convert(sellContractCustomer);
        return this.http.put<SellContractCustomer>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SellContractCustomer>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SellContractCustomer[]>> {
        const options = createRequestOption(req);
        return this.http.get<SellContractCustomer[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SellContractCustomer[]>) => this.convertArrayResponse(res));
    }

    queryBySellContract(sellContractId: number): Observable<HttpResponse<SellContractCustomer[]>> {
        return this.http.get<SellContractCustomer[]>(`${this.resourceSellContractUrl}/${sellContractId}/sell-contract-customers`, {observe: 'response'})
            .map((res: HttpResponse<SellContractCustomer[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SellContractCustomer = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SellContractCustomer[]>): HttpResponse<SellContractCustomer[]> {
        const jsonResponse: SellContractCustomer[] = res.body;
        const body: SellContractCustomer[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SellContractCustomer.
     */
    private convertItemFromServer(sellContractCustomer: SellContractCustomer): SellContractCustomer {
        const copy: SellContractCustomer = Object.assign({}, sellContractCustomer);
        return copy;
    }

    /**
     * Convert a SellContractCustomer to a JSON which can be sent to the server.
     */
    private convert(sellContractCustomer: SellContractCustomer): SellContractCustomer {
        const copy: SellContractCustomer = Object.assign({}, sellContractCustomer);
        return copy;
    }
}
