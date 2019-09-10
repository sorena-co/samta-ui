import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {CustomPerson, Person} from './person.model';
import {createRequestOption} from '../../shared';

export type EntityResponseType = HttpResponse<Person>;

@Injectable()
export class PersonService {

    private resourceUrl = SERVER_API_URL + 'niopdcbase/api/people';
    private resourceLocationUrl = SERVER_API_URL + 'niopdcbase/api/locations';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    create(person: Person): Observable<EntityResponseType> {
        const copy = this.convert(person);
        return this.http.post<Person>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    register(person: Person): Observable<EntityResponseType> {
        const copy = this.convert(person);
        return this.http.post<Person>(this.resourceUrl+'/register', copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    createUser(person: Person): Observable<EntityResponseType> {
        const copy = this.convert(person);
        return this.http.post<Person>(this.resourceUrl + '/create-user', copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(person: Person): Observable<EntityResponseType> {
        const copy = this.convert(person);
        return this.http.put<Person>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number, companyId?: number): Observable<EntityResponseType> {
        const params = companyId ? {'companyId': companyId.toString()} : {};
        return this.http.get<Person>(`${this.resourceUrl}/${id}`, {params, observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findForFactor(id: number): Observable<HttpResponse<CustomPerson>> {
        return this.http.get<CustomPerson>(`${this.resourceUrl}/factor/${id}`, { observe: 'response'})
            .map((res: HttpResponse<CustomPerson>) => this.convertResponseForCustomPerson(res));
    }

    findByCode(nationalCode: string): Observable<HttpResponse<Person>> {
        return this.http.get<Person>(`${this.resourceUrl}/national-code/${nationalCode}`, {observe: 'response'})
            .map((res: HttpResponse<Person>) => this.convertResponse(res));
    }

    findByBaseInfo(person): Observable<HttpResponse<Person>> {
        return this.http.post<Person>(`${this.resourceUrl}/base-info/`, person, {observe: 'response'})
            .map((res: HttpResponse<Person>) => this.convertResponse(res));
    }

    existByCode( nationalCode: string): Observable<HttpResponse<boolean>> {
        return this.http.get<boolean>(`${this.resourceUrl}/exist-national-code/${nationalCode}`, {observe: 'response'})
            .map((res: HttpResponse<boolean>) => res);
    }

    query(companyId?: number, req?: any): Observable<HttpResponse<Person[]>> {
        const options = createRequestOption(req);
        return this.http.get<Person[]>(this.resourceUrl + ((companyId) ? '/' + companyId + '/stakeholders' : ''), {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<Person[]>) => this.convertArrayResponse(res));
    }

    querySelector(req?: any): Observable<HttpResponse<Person[]>> {
        const options = createRequestOption(req);
        return this.http.get<Person[]>(this.resourceUrl + '/selector', {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<Person[]>) => this.convertArrayResponse(res));
    }

    findByLocation(locationId: number, customerId: number): Observable<HttpResponse<Person[]>> {
        return this.http.get<Person[]>(`${this.resourceLocationUrl}/${locationId}/${customerId}/people`, {observe: 'response'})
            .map((res: HttpResponse<Person[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    active(id: number): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceUrl}/active/${id}`, {observe: 'response'});
    }

    deActive(id: number): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceUrl}/de-active/${id}`, {observe: 'response'});
    }

    reject(id: number): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceUrl}/reject/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Person = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertResponseForCustomPerson(res: HttpResponse<CustomPerson>): HttpResponse<CustomPerson> {
        const body: CustomPerson = this.convertItemFromServerCustomPerson   (res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Person[]>): HttpResponse<Person[]> {
        const jsonResponse: Person[] = res.body;
        const body: Person[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Person.
     */
    private convertItemFromServer(person: Person): Person {
        const copy: Person = Object.assign({}, person);
        copy.birthday = this.dateUtils
            .convertDateTimeFromServer(person.birthday);
        return copy;
    }

    private convertItemFromServerCustomPerson(person: CustomPerson): CustomPerson {
        const copy: CustomPerson = Object.assign({}, person);
        return copy;
    }

    /**
     * Convert a Person to a JSON which can be sent to the server.
     */
    private convert(person: Person): Person {
        const copy: Person = Object.assign({}, person);

        return copy;
    }

}
