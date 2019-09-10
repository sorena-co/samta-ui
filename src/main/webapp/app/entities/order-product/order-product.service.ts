import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { OrderProduct } from './order-product.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<OrderProduct>;

@Injectable()
export class OrderProductService {

    private resourceUrl =  SERVER_API_URL + 'niopdcorder/api/order-products';

    constructor(private http: HttpClient) { }

    create(orderProduct: OrderProduct): Observable<EntityResponseType> {
        const copy = this.convert(orderProduct);
        return this.http.post<OrderProduct>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(orderProduct: OrderProduct): Observable<EntityResponseType> {
        const copy = this.convert(orderProduct);
        return this.http.put<OrderProduct>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<OrderProduct>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<OrderProduct[]>> {
        const options = createRequestOption(req);
        return this.http.get<OrderProduct[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<OrderProduct[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: OrderProduct = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<OrderProduct[]>): HttpResponse<OrderProduct[]> {
        const jsonResponse: OrderProduct[] = res.body;
        const body: OrderProduct[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to OrderProduct.
     */
    private convertItemFromServer(orderProduct: OrderProduct): OrderProduct {
        const copy: OrderProduct = Object.assign({}, orderProduct);
        return copy;
    }

    /**
     * Convert a OrderProduct to a JSON which can be sent to the server.
     */
    private convert(orderProduct: OrderProduct): OrderProduct {
        const copy: OrderProduct = Object.assign({}, orderProduct);
        return copy;
    }
}
