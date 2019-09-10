import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {DayDepot} from './day-depot.model';
import {createRequestOption} from '../../shared';
import {LocationDate} from "../location/location.model";
import {EntityResponseDateLocationType} from "../location/location.service";

export type EntityResponseType = HttpResponse<DayDepot>;

@Injectable()
export class DayDepotService {

    private resourceUrl = SERVER_API_URL + 'niopdcao/api/day-depots';
    private resourceMainDayDepotUrl = 'niopdcao/api/main-day-depots';
    private resourceMainDayOperationUrl = 'niopdcao/api/main-day-operations';
    private resourceRefuelCenterUrl = SERVER_API_URL + 'niopdcao/api/refuel-centers';


    constructor(private http: HttpClient) {
    }

    create(dayDepot: DayDepot): Observable<EntityResponseType> {
        const copy = this.convert(dayDepot);
        return this.http.post<DayDepot>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(dayDepot: DayDepot): Observable<EntityResponseType> {
        const copy = this.convert(dayDepot);
        return this.http.put<DayDepot>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<DayDepot>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    getWaybillNumber(dayDepotId: number): Observable<HttpResponse<string>> {
        return this.http.get<string>(`${this.resourceUrl}/way-bill/${dayDepotId}`, {observe: 'response'})
            .map((res: HttpResponse<string>) => {
                return res;
            });
    }


    getCountOfOilTankIdUsage(oilTankId: number): Observable<Number> {
        return this.http.get<Number>(`${this.resourceUrl}/oil-tank/${oilTankId}/count`).map((res) => {
            return res;
        });
    }

    isHaveOldDayDepot(dayDepotId: number): Observable<boolean> {
        return this.http.get<boolean>(`${this.resourceUrl}/have-old/${dayDepotId}`).map((res) => {
            return res;
        });
    }


    query(req?: any): Observable<HttpResponse<DayDepot[]>> {
        const options = createRequestOption(req);
        return this.http.get<DayDepot[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<DayDepot[]>) => this.convertArrayResponse(res));
    }

    queryByProductAndOilTankType(productId: number, oilTankTypes: any[], refuelCenterId: number, dateTime: any): Observable<HttpResponse<DayDepot[]>> {
        let options = new HttpParams();
        if (dateTime == null) {
            options = new HttpParams()
                .set("oilTankTypes", oilTankTypes.toString());
        } else {
            options = new HttpParams()
                .set('dateTime', dateTime.toISOString())
                .set("oilTankTypes", oilTankTypes.toString());
        }
        return this.http.post<DayDepot[]>(`${this.resourceUrl}/product/${productId}/refuel-center/${refuelCenterId}`, {
            params: options,
            observe: 'response'
        }, {params: options, observe: 'response'})
            .map((res: HttpResponse<DayDepot[]>) => this.convertArrayResponse(res));
    }

    queryMainDayDepotId(mainDayDepotId: any, req?: any): Observable<HttpResponse<DayDepot[]>> {
        const options = createRequestOption(req);

        return this.http.get<DayDepot[]>(this.resourceMainDayDepotUrl + '/' + mainDayDepotId + '/day-depots', {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<DayDepot[]>) => this.convertArrayResponse(res));
    }


    getOpenDate(refuelCenterId: number, data: any): Observable<any> {
        let options = new HttpParams()
                .set("typeOfFuelReceipt", data.toString());
        return this.http.get<any>(`${this.resourceUrl}/open/${refuelCenterId}/`, { params: options,observe: 'response'})
            .map((res: any) => res);
    }

    queryMainDayOperationId(mainDayOperationId: any, req?: any): Observable<HttpResponse<DayDepot[]>> {
        const options = createRequestOption(req);

        return this.http.get<DayDepot[]>(this.resourceMainDayOperationUrl + '/' + mainDayOperationId + '/day-depots', {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<DayDepot[]>) => this.convertArrayResponse(res));
    }

    queryByOilTankType(oilTankType: any,dayDepotId, req?: any): Observable<HttpResponse<DayDepot[]>> {
        const options = createRequestOption(req);

        return this.http.get<DayDepot[]>(`${this.resourceUrl}/oil-tank-type/${oilTankType}/from-day-depot/${dayDepotId}`, {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<DayDepot[]>) => this.convertArrayResponse(res));
    }

    queryByRefuelCenterAndOilTank(refuelCenterId?: number, oilTankType?: any, req?: any): Observable<HttpResponse<DayDepot[]>> {
        const options = createRequestOption(req);
        return this.http.get<DayDepot[]>(`${this.resourceRefuelCenterUrl}/${refuelCenterId}/oil-tanks/${oilTankType}`, {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<DayDepot[]>) => this.convertArrayResponse(res));
    }


    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    fullEndMeasurement(id: number): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceUrl}/full-end-measurement/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: DayDepot = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<DayDepot[]>): HttpResponse<DayDepot[]> {
        const jsonResponse: DayDepot[] = res.body;
        const body: DayDepot[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to DayDepot.
     */
    private convertItemFromServer(dayDepot: DayDepot): DayDepot {
        const copy: DayDepot = Object.assign({}, dayDepot);
        return copy;
    }

    /**
     * Convert a DayDepot to a JSON which can be sent to the server.
     */
    private convert(dayDepot: DayDepot): DayDepot {
        const copy: DayDepot = Object.assign({}, dayDepot);
        return copy;
    }


}
