import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {SellContractProduct} from './sell-contract-product.model';
import {createRequestOption} from '../../shared';
import {RateGroup, RateGroupService} from '../rate-group';
import {CurrencyRateGroup, CurrencyRateGroupService} from '../currency-rate-group';
import {ContractType} from '../sell-contract';
import {JhiDateUtils} from "ng-jhipster";

export type EntityResponseType = HttpResponse<SellContractProduct>;

@Injectable()
export class SellContractProductService {

    currencyRateGroupTitleMap = new Map<number, string>();
    rateGroupTitleMap = new Map<number, string>();
    private resourceUrl = SERVER_API_URL + '/niopdcbase/api/sell-contract-products';
    private resourceSellContractUrl = SERVER_API_URL + '/niopdcbase/api/sell-contracts';
    private resourceCustomerUrl = SERVER_API_URL + '/niopdcbase/api/customers';

    constructor(private http: HttpClient,
                private dateUtils: JhiDateUtils,
                private currencyRateGroupService: CurrencyRateGroupService,
                private rateGroupService: RateGroupService) {
    }

    create(sellContractProduct: SellContractProduct): Observable<EntityResponseType> {
        const copy = this.convert(sellContractProduct);
        return this.http.post<SellContractProduct>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(sellContractProduct: SellContractProduct): Observable<EntityResponseType> {
        const copy = this.convert(sellContractProduct);
        return this.http.put<SellContractProduct>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SellContractProduct>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findSellContractCustomerIdBySellContractProduct(id: number): Observable<number> {
        return this.http.get<number>(`${this.resourceUrl}/${id}/get-sell-contract-customer-id`, {observe: 'response'})
            .map((res) => {
                return res.body;
            });
    }


    query(sellContractId: any, req?: any): Observable<HttpResponse<SellContractProduct[]>> {
        const options = createRequestOption(req);
        return this.http.get<SellContractProduct[]>(this.resourceSellContractUrl + '/' + sellContractId + '/sell-contract-products', {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<SellContractProduct[]>) => this.convertArrayResponse(res));
    }

    queryByCustomerId(customerId: any, req?: any): Observable<HttpResponse<SellContractProduct[]>> {
        const options = createRequestOption(req);
        return this.http.get<SellContractProduct[]>(this.resourceUrl + '/customer/' + customerId + '/sell-contract-products', {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<SellContractProduct[]>) => this.convertArrayResponse(res));
    }

    findByDepotAndCustomer(buyTypeId: number,
                           currencyRateGroupId: number,
                           currencyId: number,
                           depotId: number,
                           customerId: number,
                           personId: number,
                           sellContractId: number,
                           typeOfFuelReceipt: any,
                           contractType: ContractType
    ) {

        let params;
        if (customerId == null) {
            if (currencyRateGroupId == null)
                params = new HttpParams()
                    .set('contractType', contractType.toString())
                    .set('sellContractId', sellContractId.toString());
            else
                params = new HttpParams()
                    .set('contractType', contractType.toString())
                    .set('currencyRateGroupId', currencyRateGroupId.toString())
                    .set('sellContractId', sellContractId.toString());
        }
        else if (typeOfFuelReceipt) {
            if (currencyRateGroupId == null)
                params = new HttpParams()
                    .set('typeOfFuelReceipt', typeOfFuelReceipt.toString())
                    .set('customerId', customerId.toString())
                    .set('sellContractId', sellContractId.toString())
                    .set('contractType', contractType.toString());
            else
                params = new HttpParams()
                    .set('typeOfFuelReceipt', typeOfFuelReceipt.toString())
                    .set('customerId', customerId.toString())
                    .set('currencyRateGroupId', currencyRateGroupId.toString())
                    .set('sellContractId', sellContractId.toString())
                    .set('contractType', contractType.toString());
        } else if (currencyRateGroupId == null)
            params = new HttpParams()
                .set('customerId', customerId.toString())
                .set('sellContractId', sellContractId.toString())
                .set('contractType', contractType.toString());
        else
            params = new HttpParams()
                .set('customerId', customerId.toString())
                .set('sellContractId', sellContractId.toString())
                .set('currencyRateGroupId', currencyRateGroupId.toString())
                .set('contractType', contractType.toString());

        return this.http.get<SellContractProduct[]>(
            `${this.resourceCustomerUrl}/${buyTypeId}/${currencyId}/${depotId}/${personId}/sell-contracts/sell-contract-products`,
            {params, observe: 'response'})
            .map((res: HttpResponse<SellContractProduct[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SellContractProduct = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SellContractProduct[]>): HttpResponse<SellContractProduct[]> {
        const jsonResponse: SellContractProduct[] = res.body;
        const body: SellContractProduct[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SellContractProduct.
     */
    private convertItemFromServer(sellContractProduct: SellContractProduct): SellContractProduct {
        const copy: SellContractProduct = Object.assign({}, sellContractProduct);
        copy.startDate = this.dateUtils
            .convertDateTimeFromServer(sellContractProduct.startDate);
        copy.finishDate = this.dateUtils
            .convertDateTimeFromServer(sellContractProduct.finishDate);
        //todo fix it
        if (this.currencyRateGroupTitleMap.has(copy.currencyRateGroupId)) {
            copy.currencyRateGroupTitle = this.currencyRateGroupTitleMap.get(copy.currencyRateGroupId);
        } else {
            this.currencyRateGroupService.find(copy.currencyRateGroupId).subscribe((currencyRateGroup: HttpResponse<CurrencyRateGroup>) => {
                copy.currencyRateGroupTitle = currencyRateGroup.body.title;
                this.currencyRateGroupTitleMap.set(copy.currencyRateGroupId, copy.currencyRateGroupTitle);
            });
        }

        if (this.rateGroupTitleMap.has(copy.rateGroupId)) {
            copy.rateGroupTitle = this.rateGroupTitleMap.get(copy.rateGroupId);
        } else {
            this.rateGroupService.find(copy.rateGroupId).subscribe((rateGroup: HttpResponse<RateGroup>) => {
                copy.rateGroupTitle = rateGroup.body.title;
                this.rateGroupTitleMap.set(copy.rateGroupId, copy.rateGroupTitle);
            });
        }
        return copy;
    }

    /**
     * Convert a SellContractProduct to a JSON which can be sent to the server.
     */
    private convert(sellContractProduct: SellContractProduct): SellContractProduct {
        const copy: SellContractProduct = Object.assign({}, sellContractProduct);
        return copy;
    }
}
