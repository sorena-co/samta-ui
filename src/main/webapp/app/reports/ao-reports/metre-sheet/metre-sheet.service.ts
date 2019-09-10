import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../app.constants';

import {MetreSheet, MetreSheetRequest} from './metre-sheet.model';

export type EntityResponseType = HttpResponse<MetreSheet>;

@Injectable()
export class MetreSheetService {

    private resourceUrl =  SERVER_API_URL + 'niopdcreport/api/metre-sheets';

    constructor(private http: HttpClient) { }

    query(req?: MetreSheetRequest): Observable<HttpResponse<MetreSheet[]>> {
        return this.http.post<MetreSheet[]>(this.resourceUrl, req, { observe: 'response' })
            .map((res: HttpResponse<MetreSheet[]>) => this.convertArrayResponse(res));
    }

    private convertArrayResponse(res: HttpResponse<MetreSheet[]>): HttpResponse<MetreSheet[]> {
        const jsonResponse: MetreSheet[] = res.body;
        const body: MetreSheet[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to MetreSheet.
     */
    private convertItemFromServer(metreSheet: MetreSheet): MetreSheet {
        const copy: MetreSheet = Object.assign({}, metreSheet);
        return copy;
    }
}
