import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../../app.constants';

import {MomentSheetAo, MomentSheetDepot, MomentSheetRequest} from './moment-sheet.model';

export type EntityResponseType = HttpResponse<MomentSheetAo>;

@Injectable()
export class MomentSheetService {

    private resourceUrl = SERVER_API_URL + 'niopdcreport/api/moment-sheets';

    constructor(private http: HttpClient) {
    }

    queryAo(req?: MomentSheetRequest): Observable<HttpResponse<MomentSheetAo[]>> {
        return this.http.post<MomentSheetAo[]>(`${this.resourceUrl}/ao`, req, {observe: 'response'})
            .map((res: HttpResponse<MomentSheetAo[]>) => this.convertArrayResponseAo(res));
    }

    queryDepot(req?: MomentSheetRequest): Observable<HttpResponse<MomentSheetDepot[]>> {
        return this.http.post<MomentSheetDepot[]>(`${this.resourceUrl}/depot`, req, {observe: 'response'})
            .map((res: HttpResponse<MomentSheetDepot[]>) => this.convertArrayResponseDepot(res));
    }

    private convertArrayResponseAo(res: HttpResponse<MomentSheetAo[]>): HttpResponse<MomentSheetAo[]> {
        const jsonResponse: MomentSheetAo[] = res.body;
        const body: MomentSheetAo[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServerAo(jsonResponse[i]));
        }
        return res.clone({body});
    }

    private convertArrayResponseDepot(res: HttpResponse<MomentSheetDepot[]>): HttpResponse<MomentSheetDepot[]> {
        const jsonResponse: MomentSheetDepot[] = res.body;
        const body: MomentSheetDepot[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServerDepot(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to momentSheet.
     */
    private convertItemFromServerAo(momentSheet: MomentSheetAo): MomentSheetAo {
        const copy: MomentSheetAo = Object.assign({}, momentSheet);
        return copy;
    }

    private convertItemFromServerDepot(momentSheet: MomentSheetDepot): MomentSheetDepot {
        const copy: MomentSheetDepot = Object.assign({}, momentSheet);
        return copy;
    }
}
