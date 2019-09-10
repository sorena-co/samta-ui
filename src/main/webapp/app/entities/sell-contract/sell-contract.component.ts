import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {SellContract} from './sell-contract.model';
import {SellContractService} from './sell-contract.service';
import {Principal} from '../../shared';

import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {SessionStorageService} from 'ngx-webstorage';
import {Person, PersonService} from '../person';
import {Customer, CustomerService} from '../customer';

@Component({
    selector: 'jhi-sell-contract',
    templateUrl: './sell-contract.component.html'
})
export class SellContractComponent implements OnInit, OnDestroy {

    currentAccount: any;
    sellContracts: SellContract[];
    sellContract: SellContract = new SellContract();
    error: any;
    success: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    breadcrumbItems: any[];
    customers = 'علیرضا حنیفی,محمد جلیلی,سجاد محرابی,عباس جعفری';
    customerId: number;
    personId: number;
    customerName: string = null;
    personName: string = null;
    person: Person;
    customer: Customer;

    constructor(private sellContractService: SellContractService,
                private parseLinks: JhiParseLinks,
                private jhiAlertService: JhiAlertService,
                private principal: Principal,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private $sessionStorage: SessionStorageService,
                private translateService: TranslateService,
                private personService: PersonService,
                private customerService: CustomerService,
                private eventManager: JhiEventManager) {
        this.routeData = this.activatedRoute.data.subscribe((data) => {
            this.itemsPerPage = data.pagingParams.size;
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = !data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
        this.currentSearch = activatedRoute.snapshot.queryParams['search'] ? activatedRoute.snapshot.queryParams['search'] : '';
        this.customerId = activatedRoute.snapshot.queryParams['customer'] ? +activatedRoute.snapshot.queryParams['customer'] : null;
        this.personId = activatedRoute.snapshot.queryParams['person'] ? +activatedRoute.snapshot.queryParams['person'] : null;
        /*
                if (!this.customerId) {
                    this.customerId = this.$sessionStorage.retrieve('customer');
                }
                if (!this.personId) {
                    this.personId = this.$sessionStorage.retrieve('person');
                }*/

        this.sellContract.active = null;

        const x = this.currentSearch.split('&');
        for (const key of x) {
            let value = key.split('$');
            if (key.lastIndexOf('#') >= 0) { // enum
                value = key.split('#');
            } else if (key.lastIndexOf(';') >= 0) { // Boolean
                value = key.split(';');
            } else if (key.lastIndexOf('☼') >= 0) { // equal number
                value = key.split('☼');
            } else if (key.lastIndexOf('>') >= 0) { // number
                value = key.split('>');
            } else if (key.lastIndexOf('<') >= 0) { // number
                value = key.split('<');
            } else if (key.lastIndexOf('→') >= 0) { // start date
                value = key.split('→');
            } else if (key.lastIndexOf('←') >= 0) { // end date
                value = key.split('←');
            }

            if (value.length > 1) {
                if (value[0] === 'active') {
                    this.sellContract[value[0]] = Boolean(value[1]);
                } else {
                    this.sellContract[value[0]] = value[1];
                }
            }
        }
    }

    loadAll() {
        this.sellContractService.query({
            query: (this.currentSearch.length > 0 ? this.currentSearch : null),
            customerName: this.customerId ? null : this.customerName,
            personName: this.personId ? null : this.personName,
            customer: this.customerId ? this.customerId : null,
            person: this.personId ? this.personId : null,
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<SellContract[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.router.navigate(['/sell-contract'], {
            queryParams: {
                person: this.personId ? this.personId : null,
                customer: this.customerId ? this.customerId : null,
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.sellContract = new SellContract();
        this.sellContract.active = null;
        if (!this.personId)
            this.personName = null;
        if (!this.personId)
            this.customerName = null;
        this.loadAll();
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.sellContract.startDate) {
            this.currentSearch += 'startDate→' + this.sellContract.startDate.toISOString() + '&';
        }
        if (this.sellContract.finishDate) {
            this.currentSearch += 'finishDate→' + this.sellContract.finishDate.toISOString() + '&';
        }
        if (this.sellContract.contractNo) {
            this.currentSearch += 'contractNo$' + this.sellContract.contractNo + '&';
        }
        if (this.sellContract.active) {
            this.currentSearch += 'active;' + this.sellContract.active + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        this.router.navigate(['/sell-contract'], {
            queryParams: {
                person: this.personId ? this.personId : null,
                customer: this.customerId ? this.customerId : null,
                search: this.currentSearch,
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.loadAll();
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe((title) => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        if (this.person || this.customer) {
            if (this.customer)
                this.breadcrumbItems.push(
                    {
                        label: this.translateService.instant('niopdcgatewayApp.customer.home.title') + ' (' + this.customer.name + ')',
                        routerLink: ['/customer']
                    }
                );
            else
                this.breadcrumbItems.push({
                    label: this.translateService.instant('niopdcgatewayApp.person.home.title') + ' (' + this.person.fullName + ')',
                    routerLink: ['/person']
                });
        }
        this.breadcrumbItems.push(
            {
                label: this.translateService.instant('niopdcgatewayApp.sellContract.home.title')
            });
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });

        this.registerChangeInSellContracts();
        if (this.personId) {
            this.personService.find(this.personId)
                .subscribe(value => {
                    this.person = value.body;
                    this.personName = this.person.fullName;
                    this.setBreadCrumb();
                });
        } else if (this.customerId) {
            this.customerService.find(this.customerId)
                .subscribe(value => {
                    this.customer = value.body;
                    this.customerName = this.customer.name;
                    this.setBreadCrumb();
                });
        } else this.setBreadCrumb();

    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: SellContract) {
        return item.id;
    }

    registerChangeInSellContracts() {
        this.eventSubscriber = this.eventManager.subscribe('sellContractListModification', (response) => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'desc' : 'asc')];

        return result;
    }

    loadLazy(event: LazyLoadEvent) {
        const predicate = this.predicate;
        const reverse = this.reverse;
        const page = this.page;
        const itemsPerPage = this.itemsPerPage;
        this.page = (event.first / event.rows) + 1;
        this.itemsPerPage = event.rows;
        if (event.sortField) {
            this.predicate = event.sortField;
            this.reverse = event.sortOrder !== 1;
        }

        if (this.page > 1 ||
            this.page !== page ||
            this.itemsPerPage !== itemsPerPage ||
            this.predicate !== predicate ||
            this.reverse !== reverse) {

            this.router.navigate(['/sell-contract'], {
                queryParams: {
                    page: this.page,
                    size: this.itemsPerPage,
                    person: this.personId ? this.personId : null,
                    customer: this.customerId ? this.customerId : null,
                    search: this.currentSearch,
                    sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
                }
            });
        }

        this.loadAll();
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.sellContracts = data;
        this.fillCustomers(this.sellContracts);
        this.fillPeople(this.sellContracts);
        this.$sessionStorage.store('person', this.personId);
        this.$sessionStorage.store('customer', this.customerId);

    }

    private fillCustomers(data: SellContract[]) {
        data.forEach(value => {
            for (let i = 0; i < value.sellContractCustomers.length; i++) {
                if (i === 0) {
                    value.customers = value.sellContractCustomers[i].customerName;
                } else {
                    value.customers += ',' + value.sellContractCustomers[i].customerName;
                }
            }
        });
    }

    private fillPeople(data: SellContract[]) {
        data.forEach(value => {
            for (let i = 0; i < value.sellContractPeople.length; i++) {
                if (i === 0) {
                    value.people = value.sellContractPeople[i].personFullName;
                } else {
                    value.people += ',' + value.sellContractPeople[i].personFullName;
                }
            }
        });
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
