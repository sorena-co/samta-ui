import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {SERVER_API_URL} from '../../app.constants';
import {PosDevice, PosInfo, PosSale, PosSaleResponse} from './pos.model';
import {Observable} from 'rxjs/Rx';
import {CookieService} from 'ngx-cookie';

@Injectable()
export class PosService {
    constructor(private http: HttpClient,
                private cookieService: CookieService,
    ) {
    }

    getInfo(url): Observable<PosInfo> {
        return Observable.fromPromise(new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            if (xhr) {
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            resolve(JSON.parse(xhr.response));
                        } else {
                            reject(xhr.response);
                        }
                    }
                };
            }
            xhr.open('GET', url + '/api/GetInfo', true);
            xhr.send();
        }));
    }
 /*
    getInfo(ip): Observable<HttpResponse<PosInfo>> {
        return this.http.get<PosInfo>(ip + '/api/GetInfo', {observe: 'response'});
    }
*/
    getDevices(ip): Observable<HttpResponse<PosDevice[]>> {
        return this.http.get<PosDevice[]>(ip + '/api/GetDevices/0/0', {observe: 'response'});
    }

    /*    sale(ip, posSale: PosSale): Observable<any> {
            return this.http.post<any>(ip + '/api/Sale', posSale, {observe: 'body'});
        }

        create(ip, posSale: PosSale) {
            const copy = this.convert(posSale);
            this.callOtherDomain(ip + '/api/Sale', copy);
        }*/

    sale(url, posSale: PosSale): Observable<PosSaleResponse> {
        return Observable.fromPromise(new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            const bodyJ = JSON.stringify(posSale);
            if (xhr) {
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            resolve(JSON.parse(xhr.response));
                        } else {
                            reject(xhr.response);
                        }
                    }
                };
            }
            xhr.open('POST', url + '/api/Sale', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(bodyJ);
        }));
    }


    save(account: any): Observable<HttpResponse<any>> {
        return this.http.post(SERVER_API_URL + 'niopdcuaa/api/account', account, {observe: 'response'});
    }

    private convertResponse(res: HttpResponse<PosSaleResponse>): HttpResponse<PosSaleResponse> {
        const body: PosSale = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PosSale.
     */
    private convertItemFromServer(posSaleResponse: PosSaleResponse): PosSaleResponse {
        const copy: PosSaleResponse = Object.assign({}, posSaleResponse);
        return copy;
    }

    /**
     * Convert a PosSale to a JSON which can be sent to the server.
     */
    private convert(posSale: PosSale): PosSale {
        const copy: PosSale = Object.assign({}, posSale);
        return copy;
    }
}
