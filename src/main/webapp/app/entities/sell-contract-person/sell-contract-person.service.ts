import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {SellContractPerson} from './sell-contract-person.model';
import {createRequestOption} from '../../shared';

export type EntityResponseType = HttpResponse<SellContractPerson>;

@Injectable()
export class SellContractPersonService {

    private resourceUrl = SERVER_API_URL + 'niopdcbase/api/sell-contract-people';
    private resourceSellContractUrl = SERVER_API_URL + 'niopdcbase/api/sell-contracts';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    create(sellContractPerson: SellContractPerson): Observable<EntityResponseType> {
        const copy = this.convert(sellContractPerson);
        return this.http.post<SellContractPerson>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(sellContractPerson: SellContractPerson): Observable<EntityResponseType> {
        const copy = this.convert(sellContractPerson);
        return this.http.put<SellContractPerson>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SellContractPerson>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(sellContractId, req?: any): Observable<HttpResponse<SellContractPerson[]>> {
        const options = createRequestOption(req);
        return this.http.get<SellContractPerson[]>(this.resourceSellContractUrl + '/' + sellContractId + '/sell-contract-people', {params: options, observe: 'response'})
            .map((res: HttpResponse<SellContractPerson[]>) => this.convertArrayResponse(res));
    }

    queryByTime(startDate: any, finishDate): Observable<HttpResponse<SellContractPerson[]>> {
        const options = new HttpParams().set('startDate', startDate.toISOString())
            .set('finishDate', finishDate.toISOString());

        return this.http.get<SellContractPerson[]>(this.resourceUrl + '/get-by-date', {params: options, observe: 'response'})
            .map((res: HttpResponse<SellContractPerson[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SellContractPerson = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SellContractPerson[]>): HttpResponse<SellContractPerson[]> {
        const jsonResponse: SellContractPerson[] = res.body;
        const body: SellContractPerson[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SellContractPerson.
     */
    private convertItemFromServer(sellContractPerson: SellContractPerson): SellContractPerson {
        const copy: SellContractPerson = Object.assign({}, sellContractPerson);
        copy.startDate = this.dateUtils
            .convertDateTimeFromServer(sellContractPerson.startDate);
        return copy;
    }

    /**
     * Convert a SellContractPerson to a JSON which can be sent to the server.
     */
    private convert(sellContractPerson: SellContractPerson): SellContractPerson {
        const copy: SellContractPerson = Object.assign({}, sellContractPerson);

        copy.startDate = this.dateUtils.toDate(sellContractPerson.startDate);
        return copy;
    }
}
