import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {Location, LocationDate} from './location.model';
import {createRequestOption} from '../../shared';

export type EntityResponseType = HttpResponse<Location>;
export type EntityResponseDateLocationType = HttpResponse<LocationDate>;

@Injectable()
export class LocationService {

    private resourceUrl = SERVER_API_URL + 'niopdcbase/api/locations';
    private resourceCustomerUrl = SERVER_API_URL + 'niopdcbase/api/customers';
    private resourceUserManagementUrl = SERVER_API_URL + 'niopdcbase/api/users';

    constructor(private http: HttpClient) {
    }

    create(location: Location): Observable<EntityResponseType> {
        const copy = this.convert(location);
        return this.http.post<Location>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(location: Location): Observable<EntityResponseType> {
        const copy = this.convert(location);
        return this.http.put<Location>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Location>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    isDay(id: number): Observable<EntityResponseDateLocationType> {
        return this.http.get<LocationDate>(`${this.resourceUrl}/${id}/is-day`, {observe: 'response'})
            .map((res: EntityResponseDateLocationType) => this.convertLocationDateResponse(res));
    }

    query(locationId?: number, req?: any): Observable<HttpResponse<Location[]>> {
        const options = createRequestOption(req);
        if (!locationId) {
            locationId = -1;
        }
        return this.http.get<Location[]>(this.resourceUrl + '/' + locationId + '/locations', {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<Location[]>) => this.convertArrayResponse(res));
    }

    querySelector(locationId?: number, req?: any): Observable<HttpResponse<Location[]>> {
        let options = new HttpParams();
        if (req && req.customerIds) {
            options = options.set('customerIds', req.customerIds);
        }
        if (req && req.dataAccess !== undefined) {
            options = options.set('dataAccess', req.dataAccess);
        }
        if (!locationId) {
            locationId = -1;
        }
        return this.http.get<Location[]>(this.resourceUrl + '/selector/' + locationId, {
            observe: 'response',
            params: options,
        })
            .map((res: HttpResponse<Location[]>) => this.convertArrayResponse(res));
    }

    querySubLocation(level: number): Observable<HttpResponse<Location[]>> {
        return this.http.get<Location[]>(`${this.resourceUrl}/level/${level}`, {observe: 'response'})
            .map((res: HttpResponse<Location[]>) => this.convertArrayResponse(res));
    }

    queryForRegion(req?: any): Observable<HttpResponse<Location[]>> {
        const options = createRequestOption(req);
        return this.http.get<Location[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<Location[]>) => this.convertArrayResponse(res));
    }

    queryBySubLocationsAndLevel(ids, level): Observable<HttpResponse<Location[]>> {
        const options = new HttpParams().set('ids', ids);
        return this.http.post<Location[]>(this.resourceUrl + '/sub-location-by-level/' + level,
            {params: options, observe: 'response'}, {params: options, observe: 'response'})
            .map((res: HttpResponse<Location[]>) => this.convertArrayResponse(res));
    }

    queryByRecursiveToUp(id?: any): Observable<HttpResponse<Location[]>> {
        return this.http.get<Location[]>(`${this.resourceUrl}/${id}/up-recursive`,
            {observe: 'response'})
            .map((res: HttpResponse<Location[]>) => this.convertArrayResponse(res));
    }

    queryByCustomer(customerId?: any): Observable<HttpResponse<Location[]>> {
        return this.http.get<Location[]>(`${this.resourceCustomerUrl}/${customerId}/locations`,
            {observe: 'response'})
            .map((res: HttpResponse<Location[]>) => this.convertArrayResponse(res));
    }

    queryByLevel(level: number): Observable<HttpResponse<Location[]>> {
        return this.http.get<Location[]>(`${this.resourceUrl}/${level}/level`,
            {observe: 'response'})
            .map((res: HttpResponse<Location[]>) => this.convertArrayResponse(res));
    }

    queryByLevelAndCountryId(level: number, countryId): Observable<HttpResponse<Location[]>> {
        return this.http.get<Location[]>(`${this.resourceUrl}/${level}/level/${countryId}/country`,
            {observe: 'response'})
            .map((res: HttpResponse<Location[]>) => this.convertArrayResponse(res));
    }


    queryByOrder(): Observable<HttpResponse<Location[]>> {
        return this.http.get<Location[]>(`${this.resourceUrl}/order`,
            {observe: 'response'})
            .map((res: HttpResponse<Location[]>) => this.convertArrayResponse(res));
    }
    findAllLocationForUserTree(username :string): Observable<HttpResponse<Location[]>> {
        return this.http.get<Location[]>(`${this.resourceUserManagementUrl}/${username}/user-data-accesses/location`,
            {observe: 'response'})
            .map((res: HttpResponse<Location[]>) => this.convertArrayResponse(res));
    }

    findAllParent(ids): Observable<HttpResponse<Location[]>> {
        const options = new HttpParams().set('ids', ids);
        return this.http.post<Location[]>(this.resourceUrl + '/selector',
            {params: options, observe: 'response'}, {params: options, observe: 'response'})
            .map((res: HttpResponse<Location[]>) => this.convertArrayResponse(res));
    }

    findAllRecursiveParent(childs, req?: any): Observable<HttpResponse<any[][]>> {
        let options = new HttpParams();
        if (req && req.customerIds)
            options = options.set('customerIds', req.customerIds);
        const params = new HttpParams().set('ids', childs);
        return this.http.post<any>(`${this.resourceUrl}/recursive-to-up-ids`, params,
            {
                observe: 'response',
                params: options,
            });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    open(id: number): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceUrl}/${id}/open`, {observe: 'response'});
    }

    close(id: number): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceUrl}/${id}/close`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Location = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertLocationDateResponse(res: EntityResponseDateLocationType): EntityResponseDateLocationType {
        const body: LocationDate = this.convertItemLocationDateFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Location[]>): HttpResponse<Location[]> {
        const jsonResponse: Location[] = res.body;
        const body: Location[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Location.
     */
    private convertItemFromServer(location: Location): Location {
        const copy: Location = Object.assign({}, location);
        return copy;
    }

    private convertItemLocationDateFromServer(locationDate: LocationDate): LocationDate {
        const copy: LocationDate = Object.assign({}, locationDate);
        return copy;
    }

    /**
     * Convert a Location to a JSON which can be sent to the server.
     */
    private convert(location: Location): Location {
        const copy: Location = Object.assign({}, location);
        return copy;
    }
}
