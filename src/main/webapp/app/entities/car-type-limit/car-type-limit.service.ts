import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {CarTypeLimit} from './car-type-limit.model';
import {createRequestOption} from '../../shared';

export type EntityResponseType = HttpResponse<CarTypeLimit>;

@Injectable()
export class CarTypeLimitService {

    private resourceUrl = SERVER_API_URL + 'niopdcbase/api/car-type-limits';
    private resourceCustomerTypeUrl = SERVER_API_URL + 'niopdcbase/api/customer-types';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    create(carTypeLimit: CarTypeLimit): Observable<EntityResponseType> {
        const copy = this.convert(carTypeLimit);
        return this.http.post<CarTypeLimit>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(carTypeLimit: CarTypeLimit): Observable<EntityResponseType> {
        const copy = this.convert(carTypeLimit);
        return this.http.put<CarTypeLimit>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CarTypeLimit>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(carTypeId: any, req?: any): Observable<HttpResponse<CarTypeLimit[]>> {
        const options = createRequestOption(req);
        return this.http.get<CarTypeLimit[]>(this.resourceCustomerTypeUrl + '/' + carTypeId + '/car-type-limits', {params: options, observe: 'response'})
            .map((res: HttpResponse<CarTypeLimit[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CarTypeLimit = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CarTypeLimit[]>): HttpResponse<CarTypeLimit[]> {
        const jsonResponse: CarTypeLimit[] = res.body;
        const body: CarTypeLimit[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CarTypeLimit.
     */
    private convertItemFromServer(carTypeLimit: CarTypeLimit): CarTypeLimit {
        const copy: CarTypeLimit = Object.assign({}, carTypeLimit);
        copy.fromDate = this.dateUtils
            .convertDateTimeFromServer(carTypeLimit.fromDate);
        copy.toDate = this.dateUtils
            .convertDateTimeFromServer(carTypeLimit.toDate);
        return copy;
    }

    /**
     * Convert a CarTypeLimit to a JSON which can be sent to the server.
     */
    private convert(carTypeLimit: CarTypeLimit): CarTypeLimit {
        const copy: CarTypeLimit = Object.assign({}, carTypeLimit);
        return copy;
    }
}
