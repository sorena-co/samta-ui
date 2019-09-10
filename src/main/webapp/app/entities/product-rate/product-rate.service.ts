import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {BoundaryDTO, ProductRate} from './product-rate.model';
import {createRequestOption} from '../../shared';

export type EntityResponseType = HttpResponse<ProductRate>;

@Injectable()
export class ProductRateService {

    private resourceUrl = SERVER_API_URL + 'niopdcrate/api/product-rates';

    private resourceProductUrl = SERVER_API_URL + 'niopdcrate/api/products';
    private resourceContainerUrl = SERVER_API_URL + 'niopdcrate/api/containers';
    private resourceOrderProductUrl = SERVER_API_URL + 'niopdcorder/api/order-products';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    create(productRate: ProductRate): Observable<EntityResponseType> {
        const copy = this.convert(productRate);
        return this.http.post<ProductRate>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(productRate: ProductRate): Observable<EntityResponseType> {
        const copy = this.convert(productRate);
        return this.http.put<ProductRate>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ProductRate>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    getPriceForBoundarySell(boundaryResponseDTO: BoundaryDTO): Observable<HttpResponse<BoundaryDTO>> {
        return this.http.post<BoundaryDTO>(`${this.resourceUrl}/boundary-sell`, boundaryResponseDTO, {observe: 'response'})
            .map((res: HttpResponse<BoundaryDTO>) => this.convertResponseBoundary(res));
    }
    createByProduct(productRate: ProductRate): Observable<EntityResponseType> {
        const copy = this.convert(productRate);
        return this.http.post(this.resourceUrl + '/product', copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    createByContainer(productRate: ProductRate): Observable<EntityResponseType> {
        const copy = this.convert(productRate);
        return this.http.post(this.resourceUrl + '/container', copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    updateByProduct(productRate: ProductRate): Observable<EntityResponseType> {
        const copy = this.convert(productRate);
        return this.http.put(this.resourceUrl + '/product', copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    updateByContainer(productRate: ProductRate): Observable<EntityResponseType> {
        const copy = this.convert(productRate);
        return this.http.put<ProductRate>(this.resourceUrl + '/container', copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(productId: any, req?: any): Observable<HttpResponse<ProductRate[]>> {
        const options = createRequestOption(req);
        return this.http.get<ProductRate[]>(this.resourceProductUrl + '/' + productId + '/product-rates',
            {params: options, observe: 'response'})
            .map((res: HttpResponse<ProductRate[]>) => this.convertArrayResponse(res));
    }

    queryByProduct(productId: any, req?: any): Observable<HttpResponse<ProductRate[]>> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceProductUrl + '/' + productId + '/product-rates', {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<ProductRate[]>) => this.convertArrayResponse(res));
    }

    queryByContainer(containerId: any, req?: any): Observable<HttpResponse<ProductRate[]>> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceContainerUrl + '/' + containerId + '/product-rates', {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<ProductRate[]>) => this.convertArrayResponse(res));
    }

    isUseProductRateInOrderProduct(productRateId?: any): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceOrderProductUrl}/is-use-product-rate/${productRateId}`, {observe: 'response'});
    }

    isUseContainerRateInOrderProduct(containerRateId?: any): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceOrderProductUrl}/is-use-container-rate/${containerRateId}`, {observe: 'response'});
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ProductRate = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertResponseBoundary(res: HttpResponse<BoundaryDTO>): HttpResponse<BoundaryDTO> {
        const body: BoundaryDTO = this.convertItemFromServerBoundary(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ProductRate[]>): HttpResponse<ProductRate[]> {
        const jsonResponse: ProductRate[] = res.body;
        const body: ProductRate[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ProductRate.
     */
    private convertItemFromServer(productRate: ProductRate): ProductRate {
        const copy: ProductRate = Object.assign({}, productRate);
        copy.startDate = this.dateUtils
            .convertDateTimeFromServer(productRate.startDate);
        copy.finishDate = this.dateUtils
            .convertDateTimeFromServer(productRate.finishDate);
        return copy;
    }

    private convertItemFromServerBoundary(boundaryResponseDTO: BoundaryDTO): BoundaryDTO {
        const copy: BoundaryDTO = Object.assign({}, boundaryResponseDTO);
        return copy;
    }

    /**
     * Convert a ProductRate to a JSON which can be sent to the server.
     */
    private convert(productRate: ProductRate): ProductRate {
        const copy: ProductRate = Object.assign({}, productRate);

        return copy;
    }
}
