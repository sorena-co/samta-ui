import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CarType } from './car-type.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CarType>;

@Injectable()
export class CarTypeService {

    private resourceUrl =  SERVER_API_URL + 'niopdcbase/api/car-types';

    constructor(private http: HttpClient) { }

    create(carType: CarType): Observable<EntityResponseType> {
        const copy = this.convert(carType);
        return this.http.post<CarType>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(carType: CarType): Observable<EntityResponseType> {
        const copy = this.convert(carType);
        return this.http.put<CarType>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CarType>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CarType[]>> {
        const options = createRequestOption(req);
        return this.http.get<CarType[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CarType[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CarType = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CarType[]>): HttpResponse<CarType[]> {
        const jsonResponse: CarType[] = res.body;
        const body: CarType[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CarType.
     */
    private convertItemFromServer(carType: CarType): CarType {
        const copy: CarType = Object.assign({}, carType);
        return copy;
    }

    /**
     * Convert a CarType to a JSON which can be sent to the server.
     */
    private convert(carType: CarType): CarType {
        const copy: CarType = Object.assign({}, carType);
        return copy;
    }
}
