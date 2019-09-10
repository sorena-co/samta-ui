import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {BankTransaction} from './bank-transaction.model';
import {createRequestOption} from '../../shared';

export type EntityResponseType = HttpResponse<BankTransaction>;

@Injectable()
export class BankTransactionService {

    private resourceUrl = SERVER_API_URL + 'niopdcpayment/api/bank-transactions';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    create(bankTransaction: BankTransaction): Observable<EntityResponseType> {
        const copy = this.convert(bankTransaction);
        return this.http.post<BankTransaction>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    createRequestIdentifier(bankTransaction: BankTransaction): Observable<HttpResponse<string>> {
        const copy = this.convert(bankTransaction);
        return this.http.post<string>(`${this.resourceUrl}/begin`, copy, {observe: 'response'})
            .map((res: HttpResponse<string>) => {
                return res;
            });
    }

    findByIdentifier(identifier: String): Observable<EntityResponseType> {
        return this.http.get(`${this.resourceUrl}/identifier/${identifier}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(bankTransaction: BankTransaction): Observable<EntityResponseType> {
        const copy = this.convert(bankTransaction);
        return this.http.put<BankTransaction>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<BankTransaction>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<BankTransaction[]>> {
        const options = createRequestOption(req);
        return this.http.get<BankTransaction[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<BankTransaction[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: BankTransaction = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<BankTransaction[]>): HttpResponse<BankTransaction[]> {
        const jsonResponse: BankTransaction[] = res.body;
        const body: BankTransaction[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to BankTransaction.
     */
    private convertItemFromServer(bankTransaction: BankTransaction): BankTransaction {
        const copy: BankTransaction = Object.assign({}, bankTransaction);
        copy.requestDate = this.dateUtils
            .convertDateTimeFromServer(bankTransaction.requestDate);
        copy.responseDate = this.dateUtils
            .convertDateTimeFromServer(bankTransaction.responseDate);
        return copy;
    }

    /**
     * Convert a BankTransaction to a JSON which can be sent to the server.
     */
    private convert(bankTransaction: BankTransaction): BankTransaction {
        const copy: BankTransaction = Object.assign({}, bankTransaction);

        return copy;
    }
}
