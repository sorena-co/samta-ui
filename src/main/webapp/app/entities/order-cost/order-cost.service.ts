import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { OrderCost } from './order-cost.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<OrderCost>;

@Injectable()
export class OrderCostService {

    private resourceUrl =  SERVER_API_URL + 'niopdcorder/api/order-costs';

    constructor(private http: HttpClient) { }

    create(orderCost: OrderCost): Observable<EntityResponseType> {
        const copy = this.convert(orderCost);
        return this.http.post<OrderCost>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(orderCost: OrderCost): Observable<EntityResponseType> {
        const copy = this.convert(orderCost);
        return this.http.put<OrderCost>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<OrderCost>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<OrderCost[]>> {
        const options = createRequestOption(req);
        return this.http.get<OrderCost[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<OrderCost[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: OrderCost = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<OrderCost[]>): HttpResponse<OrderCost[]> {
        const jsonResponse: OrderCost[] = res.body;
        const body: OrderCost[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to OrderCost.
     */
    private convertItemFromServer(orderCost: OrderCost): OrderCost {
        const copy: OrderCost = Object.assign({}, orderCost);
        return copy;
    }

    /**
     * Convert a OrderCost to a JSON which can be sent to the server.
     */
    private convert(orderCost: OrderCost): OrderCost {
        const copy: OrderCost = Object.assign({}, orderCost);
        return copy;
    }
}
