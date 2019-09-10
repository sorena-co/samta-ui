import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {OrderPayment} from './order-payment.model';
import {OrderPaymentService} from './order-payment.service';
import {Principal} from '../../shared';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

@Component({
    selector: 'jhi-order-payment',
    templateUrl: './order-payment.component.html'
})
export class OrderPaymentComponent implements OnInit, OnDestroy {

    currentAccount: any;
    orderPayments: OrderPayment[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;

    constructor(
        private orderPaymentService: OrderPaymentService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager
    ) {
        this.routeData = this.activatedRoute.data.subscribe((data) => {
            this.itemsPerPage = data.pagingParams.size;
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = !data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
    }

    loadAll() {
        this.orderPaymentService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<OrderPayment[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/order-payment'], {
            queryParams:
                {
                    page: this.page,
                    size: this.itemsPerPage,
                    sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
                }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.router.navigate(['/order-payment'], {
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInOrderPayments();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: OrderPayment) {
        return item.id;
    }

    registerChangeInOrderPayments() {
        this.eventSubscriber = this.eventManager.subscribe('orderPaymentListModification', (response) => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'desc' : 'asc')];

        return result;
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.orderPayments = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
