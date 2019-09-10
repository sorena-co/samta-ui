import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {RateGroup} from './rate-group.model';
import {createRequestOption} from '../../shared';

export type EntityResponseType = HttpResponse<RateGroup>;

@Injectable()
export class RateGroupService {

    private resourceUrl = SERVER_API_URL + 'niopdcrate/api/rate-groups';
    private resourceSellContractProductUrl = SERVER_API_URL + 'niopdcbase/api/sell-contract-products';

    constructor(private http: HttpClient) {
    }

    create(rateGroup: RateGroup): Observable<EntityResponseType> {
        const copy = this.convert(rateGroup);
        return this.http.post<RateGroup>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(rateGroup: RateGroup): Observable<EntityResponseType> {
        const copy = this.convert(rateGroup);
        return this.http.put<RateGroup>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<RateGroup>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<RateGroup[]>> {
        const options = createRequestOption(req);
        return this.http.get<RateGroup[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<RateGroup[]>) => this.convertArrayResponse(res));
    }

    useBySellContractProduct(rateGroupId: any, currencyRateGroupId: any): Observable<HttpResponse<boolean>> {
        let params;
        if (rateGroupId) {
            params = new HttpParams().set('rateGroupId', rateGroupId.toString());
        } else if (currencyRateGroupId) {
            params = new HttpParams().set('currencyRateGroupId', currencyRateGroupId.toString());
        }
        return this.http.get<boolean>(`${this.resourceSellContractProductUrl}/used-by-sell-contract-product`, {params, observe: 'response'});
    }

    queryByContractTypeAndCustomer(contractType, customerId, locations): Observable<HttpResponse<RateGroup[]>> {
        if (!customerId) {
            customerId = -1;
        }
        let params = new HttpParams();
        if (locations) {
            params = params.set('locations', locations);
        }
        return this.http.get<RateGroup[]>(this.resourceUrl + '/contract-type/' + contractType +
            '/customer/' + customerId, {
            params,
            observe: 'response'
        })
            .map((res: HttpResponse<RateGroup[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: RateGroup = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<RateGroup[]>): HttpResponse<RateGroup[]> {
        const jsonResponse: RateGroup[] = res.body;
        const body: RateGroup[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to RateGroup.
     */
    private convertItemFromServer(rateGroup: RateGroup): RateGroup {
        const copy: RateGroup = Object.assign({}, rateGroup);
        return copy;
    }

    /**
     * Convert a RateGroup to a JSON which can be sent to the server.
     */
    private convert(rateGroup: RateGroup): RateGroup {
        const copy: RateGroup = Object.assign({}, rateGroup);

        return copy;
    }
}
