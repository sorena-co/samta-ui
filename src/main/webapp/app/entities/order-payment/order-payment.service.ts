import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { OrderPayment } from './order-payment.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<OrderPayment>;

@Injectable()
export class OrderPaymentService {

    private resourceUrl =  SERVER_API_URL + 'niopdcorder/api/order-payments';

    constructor(private http: HttpClient) { }

    create(orderPayment: OrderPayment): Observable<EntityResponseType> {
        const copy = this.convert(orderPayment);
        return this.http.post<OrderPayment>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(orderPayment: OrderPayment): Observable<EntityResponseType> {
        const copy = this.convert(orderPayment);
        return this.http.put<OrderPayment>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<OrderPayment>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<OrderPayment[]>> {
        const options = createRequestOption(req);
        return this.http.get<OrderPayment[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<OrderPayment[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: OrderPayment = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<OrderPayment[]>): HttpResponse<OrderPayment[]> {
        const jsonResponse: OrderPayment[] = res.body;
        const body: OrderPayment[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to OrderPayment.
     */
    private convertItemFromServer(orderPayment: OrderPayment): OrderPayment {
        const copy: OrderPayment = Object.assign({}, orderPayment);
        return copy;
    }

    /**
     * Convert a OrderPayment to a JSON which can be sent to the server.
     */
    private convert(orderPayment: OrderPayment): OrderPayment {
        const copy: OrderPayment = Object.assign({}, orderPayment);
        return copy;
    }
}
