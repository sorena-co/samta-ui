import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {Order, DepotFile} from './order.model';
import {createRequestOption} from '../../shared';
import {EntityResponseType} from '../location/location.service';
import {catchError} from 'rxjs/operators';
import {Location} from '../location/location.model';

@Injectable()
export class ConnectDepotService {

    private resourceUrl = SERVER_API_URL + 'niopdcorder/api/connect-depot';
    private resourceTtmsUrl = SERVER_API_URL + 'niopdcreport/api/ttms';

    constructor(private http: HttpClient,
                private dateUtils: JhiDateUtils) {
    }

    download(depotFile: DepotFile): Observable<HttpResponse<any>> {
        const copy = this.convert(depotFile);
        return this.http.put(this.resourceUrl + '/download', copy,
            {responseType: 'blob', observe: 'response'}).pipe(catchError(this.parseErrorBlob));
    }

    search(depotFile: DepotFile): Observable<HttpResponse<DepotFile[]>> {
        const copy = this.convert(depotFile);
        return this.http.post<DepotFile[]>(this.resourceUrl + '/search',copy , {observe: 'response'})
            .map((res: HttpResponse<DepotFile[]>) => this.convertArrayResponse(res));
    }

    downloadTtms(req = {finishDate: new Date()}): Observable<HttpResponse<any>> {
        const copy = this.convertTtms(req);
        return this.http.put(this.resourceTtmsUrl, copy,
            {responseType: 'blob', observe: 'response'}).pipe(catchError(this.parseErrorBlob));
    }

    upload(id: number): Observable<HttpResponse<any>> {
        return this.http.put<any>(`${this.resourceUrl}/upload/${id}`, {observe: 'response'});
    }

    parseErrorBlob(err: HttpErrorResponse): Observable<any> {
        const reader: FileReader = new FileReader();

        const obs = Observable.create((observer: any) => {
            reader.onloadend = (e) => {
                observer.error(JSON.parse(reader.result));
                observer.complete();
            };
        });
        reader.readAsText(err.error);
        return obs;
    }

    query(depotId?: any): Observable<HttpResponse<DepotFile[]>> {
        return this.http.get<DepotFile[]>(this.resourceUrl + '/depot/' + depotId + '/depot-files', {observe: 'response'})
            .map((res: HttpResponse<DepotFile[]>) => this.convertArrayResponse(res));
    }


    private convertResponse(res: HttpResponse<DepotFile>): HttpResponse<DepotFile> {
        const body: DepotFile = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertResponseString(res: HttpResponse<string>): HttpResponse<string> {
        const body: string = this.convertItemStringFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<DepotFile[]>): HttpResponse<Order[]> {
        const jsonResponse: DepotFile[] = res.body;
        const body: DepotFile[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Order.
     */
    private convertStringFromServer(result: string): string {
        const copy: string = Object.assign({}, result);
        return result;
    }

    private convertItemFromServer(depotFile: DepotFile): DepotFile {
        const copy: DepotFile = Object.assign({}, depotFile);
        // copy.depotSendDate = this.dateUtils
        //     .convertDateTimeFromServer(depotFile.depotSendDate);
        return copy;
    }

    private convertItemStringFromServer(depotFile: string): string {
        const copy: string = Object.assign({}, depotFile);
        return copy;
    }

    /**
     * Convert a Order to a JSON which can be sent to the server.
     */
    private convert(depotFile: DepotFile): DepotFile {
        const copy: DepotFile = Object.assign({}, depotFile);

        return copy;
    }

    private convertTtms(data): any {
        const copy: any = Object.assign({}, data);

        return copy;
    }
}
