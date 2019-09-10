import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {CreditNotDepositedInTime, Order, OrderReport} from './order.model';
import {createRequestOption} from '../../shared';
import {SellContractProductService} from '../sell-contract-product';
import {RateGroupService} from '../rate-group';
import {LocationService} from '../location/location.service';
import {CustomerService} from '../customer/customer.service';
import {PersonService} from '../person/person.service';
import {DepotService} from '../depot/depot.service';
import {BoundaryDTO} from "../product-rate";

export type EntityResponseType = HttpResponse<Order>;
export type BoundaryResponseType = HttpResponse<BoundaryDTO>;
export type StringResponseType = HttpResponse<string>;

@Injectable()
export class OrderService {

    private resourceUrl = SERVER_API_URL + 'niopdcorder/api/orders';


    constructor(private http: HttpClient,
                private depotService: DepotService,
                private personService: PersonService,
                private customerService: CustomerService,
                private locationService: LocationService,
                private sellContractProductService: SellContractProductService,
                private rateGroupService: RateGroupService,
                private dateUtils: JhiDateUtils) {
    }

    create(order: Order): Observable<EntityResponseType> {
        const copy = this.convert(order);
        return this.http.post<Order>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    createBoundary(boundary: BoundaryDTO): Observable<BoundaryResponseType> {
        const copy = this.convertBoundary(boundary);
        return this.http.post<BoundaryDTO>(`${this.resourceUrl}/boundaries`, copy, {observe: 'response'})
            .map((res: BoundaryResponseType) => this.convertBoundaryResponse(res));
    }

    createBoundaryForPayment(boundary: BoundaryDTO): Observable<StringResponseType> {
        const copy = this.convertBoundary(boundary);
        return this.http.post<string>(`${this.resourceUrl}/boundaries/e-payment`, copy, {observe: 'response'})
            .map((res: StringResponseType) => this.convertStringResponse(res));
    }

    reserve(order: Order): Observable<EntityResponseType> {
        const copy = this.convert(order);
        return this.http.post<Order>(`${this.resourceUrl}/reserve`, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(order: Order): Observable<EntityResponseType> {
        const copy = this.convert(order);
        return this.http.put<Order>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    createOrderForEPayment(order: Order): Observable<StringResponseType> {
        const copy = this.convert(order);
        return this.http.post<string>(`${this.resourceUrl}/e-payment`, copy, {observe: 'response'})
            .map((res: StringResponseType) => this.convertStringResponse(res));
    }

    updateOrderForEPayment(order: Order): Observable<StringResponseType> {
        const copy = this.convert(order);
        return this.http.put<string>(`${this.resourceUrl}/e-payment`, copy, {observe: 'response'})
            .map((res: StringResponseType) => this.convertStringResponse(res));
    }

    payment(order: Order): Observable<EntityResponseType> {
        const copy = this.convert(order);
        return this.http.put<Order>(`${this.resourceUrl}/payment`, copy, {observe: 'response'}).map((res: EntityResponseType) => {
            return this.convertResponse(res);
        });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Order>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findForBoundary(id: number): Observable<BoundaryResponseType> {
        return this.http.get<BoundaryDTO>(`${this.resourceUrl}/boundary/${id}`, {observe: 'response'})
            .map((res: BoundaryResponseType) => this.convertBoundaryResponse(res));
    }

    queryByMode(mode: any, req?: any): Observable<HttpResponse<Order[]>> {
        const options = createRequestOption(req);
        return this.http.get<Order[]>(`${this.resourceUrl}/get-all/${mode}`, {params: options, observe: 'response'})
            .map((res: HttpResponse<Order[]>) => this.convertArrayResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Order[]>> {
        const options = createRequestOption(req);
        return this.http.get<Order[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<Order[]>) => this.convertArrayResponse(res));
    }

    queryBoundary(req?: any): Observable<HttpResponse<Order[]>> {
        const options = createRequestOption(req);
        return this.http.get<Order[]>(`${this.resourceUrl}/boundaries`, {params: options, observe: 'response'})
            .map((res: HttpResponse<Order[]>) => this.convertArrayResponse(res));
    }


    report(id?: number): Observable<HttpResponse<OrderReport[]>> {
        return this.http.get<OrderReport[]>(this.resourceUrl + '/' + id + '/report', {observe: 'response'})
            .map((res: HttpResponse<OrderReport[]>) => res);
    }

    queryByOrderCreditNotDeposited(req?: any): Observable<HttpResponse<Order[]>> {
        const options = createRequestOption(req);
        return this.http.get<Order[]>(`${this.resourceUrl}/credit-not-deposited`, {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<Order[]>) => this.convertArrayResponse(res));
    }

    hasCreditNotDepositedInTime(personId: number, customerId: number): Observable<HttpResponse<CreditNotDepositedInTime>> {
        let params;
        if (customerId != null) {
            params = new HttpParams()
                .set('customerId', customerId.toString())
                .set('personId', personId.toString())
            ;
        } else {
            params = new HttpParams().set('personId', personId.toString());
        }
        return this.http.get<CreditNotDepositedInTime>(`${this.resourceUrl}/has-credit-not-deposited-in-time`, {
            params,
            observe: 'response'
        });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    revocation(id: number): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceUrl}/${id}/revocation`, {observe: 'response'});
    }

    confirm(id: number): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceUrl}/${id}/confirm`, {observe: 'response'});
    }
    revertConfirm(id: number): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceUrl}/${id}/revert-confirm`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Order = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertBoundaryResponse(res: BoundaryResponseType): BoundaryResponseType {
        const body: BoundaryDTO = this.convertBoundaryFromServer(res.body);
        return res.clone({body});
    }

    private convertStringResponse(res: StringResponseType): StringResponseType {
        const body: string = this.convertStringFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Order[]>): HttpResponse<Order[]> {
        const jsonResponse: Order[] = res.body;
        const body: Order[] = [];
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

    private convertItemFromServer(order: Order): Order {
        const copy: Order = Object.assign({}, order);
        copy.registerDate = this.dateUtils
            .convertDateTimeFromServer(order.registerDate);
        copy.modifyStatusDate = this.dateUtils
            .convertDateTimeFromServer(order.modifyStatusDate);
        /*if (copy.orderProducts != null)
            copy.orderProducts.forEach((value) => {
                this.sellContractProductService.find(value.sellContractProductId)
                    .subscribe((sellContractProduct) => {
                        value.sellContractProductTitle = sellContractProduct.body.productTitle;
                    });

                this.rateGroupService.find(value.rateGroupId)
                    .subscribe((rateGroup) => {
                        value.rateGroupTitle = rateGroup.body.title;
                    });
            });
        if (copy.personId) {
            if (this.personMap.has(copy.personId)) {
                copy.personTitle = this.personMap.get(copy.personId);
            } else {
                this.personService.find(copy.personId)
                    .subscribe((res) => {
                        copy.personTitle = res.body.fullName;
                        this.personMap.set(copy.personId, copy.personTitle);
                    });
            }
        }
        if (copy.customerId) {
            if (this.customerMap.has(copy.customerId)) {
                copy.customerTitle = this.customerMap.get(copy.customerId);
            } else {
                this.customerService.find(copy.customerId)
                    .subscribe((res) => {
                        copy.customerTitle = res.body.name;
                        this.customerMap.set(copy.customerId, copy.customerTitle);
                    });
            }
        }*/
        /* if (copy.personId) {
            this.personService.find(copy.personId)
                .subscribe((person) => {
                    copy.personTitle = person.body.fullName;
                });
        }
        if (copy.customerId) {
            this.customerService.find(copy.customerId)
                .subscribe((customer) => {
                    copy.customerTitle = customer.body.name;
                });
        }
        if (copy.locationId) {
            this.locationService.find(copy.locationId)
                .subscribe((location) => {
                    copy.locationTitle = location.body.name;
                });
        }
        if (copy.depotId) {
            this.depotService.find(copy.depotId)
                .subscribe((depot) => {
                    copy.depotTitle = depot.body.title;
                });
        }*/
        return copy;
    }

    private convertBoundaryFromServer(boundary: BoundaryDTO): BoundaryDTO {
        const copy: BoundaryDTO = Object.assign({}, boundary);
        return copy;
    }

    /**
     * Convert a Order to a JSON which can be sent to the server.
     */
    private convert(order: Order): Order {
        const copy: Order = Object.assign({}, order);

        return copy;
    }

    private convertBoundary(boundary: BoundaryDTO): BoundaryDTO {
        const copy: BoundaryDTO = Object.assign({}, boundary);

        return copy;
    }


}
