import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { PaymentBill } from './payment-bill.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PaymentBill>;

@Injectable()
export class PaymentBillService {

    private resourceUrl =  SERVER_API_URL + 'niopdcpayment/api/payment-bills';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(paymentBill: PaymentBill): Observable<EntityResponseType> {
        const copy = this.convert(paymentBill);
        return this.http.post<PaymentBill>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(paymentBill: PaymentBill): Observable<EntityResponseType> {
        const copy = this.convert(paymentBill);
        return this.http.put<PaymentBill>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PaymentBill>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PaymentBill[]>> {
        const options = createRequestOption(req);
        return this.http.get<PaymentBill[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PaymentBill[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PaymentBill = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PaymentBill[]>): HttpResponse<PaymentBill[]> {
        const jsonResponse: PaymentBill[] = res.body;
        const body: PaymentBill[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PaymentBill.
     */
    private convertItemFromServer(paymentBill: PaymentBill): PaymentBill {
        const copy: PaymentBill = Object.assign({}, paymentBill);
        copy.spentDate = this.dateUtils
            .convertDateTimeFromServer(paymentBill.spentDate);
        return copy;
    }

    /**
     * Convert a PaymentBill to a JSON which can be sent to the server.
     */
    private convert(paymentBill: PaymentBill): PaymentBill {
        const copy: PaymentBill = Object.assign({}, paymentBill);

        return copy;
    }
}
