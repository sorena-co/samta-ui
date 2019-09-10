import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ShiftWork } from './shift-work.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ShiftWork>;

@Injectable()
export class ShiftWorkService {

    private resourceUrl =  SERVER_API_URL + 'niopdcbase/api/shift-works';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }
    private resourceLocationUrl = 'niopdcbase/api/locations';
    create(shiftWork: ShiftWork): Observable<EntityResponseType> {
        const copy = this.convert(shiftWork);
        return this.http.post<ShiftWork>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(shiftWork: ShiftWork): Observable<EntityResponseType> {
        const copy = this.convert(shiftWork);
        return this.http.put<ShiftWork>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ShiftWork>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query( locationId : any, req?: any): Observable<HttpResponse<ShiftWork[]>> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceLocationUrl + '/' + locationId + '/shift-works' , { params: options, observe: 'response' })
            .map((res:  HttpResponse<ShiftWork[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ShiftWork = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ShiftWork[]>): HttpResponse<ShiftWork[]> {
        const jsonResponse: ShiftWork[] = res.body;
        const body: ShiftWork[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ShiftWork.
     */
    private convertItemFromServer(shiftWork: ShiftWork): ShiftWork {
        const copy: ShiftWork = Object.assign({}, shiftWork);
        copy.fromDate = this.dateUtils
            .convertDateTimeFromServer(shiftWork.fromDate);
        copy.toDate = this.dateUtils
            .convertDateTimeFromServer(shiftWork.toDate);
        return copy;
    }

    /**
     * Convert a ShiftWork to a JSON which can be sent to the server.
     */
    private convert(shiftWork: ShiftWork): ShiftWork {
        const copy: ShiftWork = Object.assign({}, shiftWork);
        return copy;
    }
}
