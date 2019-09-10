import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {TestResult} from './test-result.model';
import {TestResultService} from './test-result.service';
import {Principal} from '../../shared';
import {RequestTestResult, RequestTestResultService} from '../request-test-result/.';
import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'jhi-test-result',
    templateUrl: './test-result.component.html'
})
export class TestResultComponent implements OnInit, OnDestroy {

    currentAccount: any;
    testResults: TestResult[];
    testResult: TestResult = new TestResult();
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
    requestTestResultId: number;
    requestTestResult: RequestTestResult;
    breadcrumbItems: any[];

    constructor(private testResultService: TestResultService,
                private requestTestResultService: RequestTestResultService,
                private parseLinks: JhiParseLinks,
                private jhiAlertService: JhiAlertService,
                private principal: Principal,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private translateService: TranslateService,
                private eventManager: JhiEventManager) {
        this.routeData = this.activatedRoute.data.subscribe((data) => {
            this.itemsPerPage = data.pagingParams.size;
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = !data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
        this.currentSearch = activatedRoute.snapshot.queryParams['search'] ? activatedRoute.snapshot.queryParams['search'] : '';
        this.requestTestResultId = activatedRoute.snapshot.params['requestTestResultId'];
        this.testResult.isSend = null;

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
                if (value[0] === 'isSend') {
                    this.testResult[value[0]] = Boolean(value[1]);
                } else {
                    this.testResult[value[0]] = value[1];
                }
            }
        }
    }

    loadAll() {
        this.testResultService.query(this.requestTestResultId, {
            query: this.currentSearch.length > 0 ? this.currentSearch : null,
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<TestResult[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';

        this.router.navigate(['request-test-result/' + this.requestTestResultId + '/test-result'], {
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.testResult = new TestResult();
        this.testResult.isSend = null;
        this.loadAll();
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.testResult.appearance) {
            this.currentSearch += 'appearance$' + this.testResult.appearance + '&';
        }
        if (this.testResult.densityAt15) {
            this.currentSearch += 'densityAt15$' + this.testResult.densityAt15 + '&';
        }
        if (this.testResult.distillation) {
            this.currentSearch += 'distillation$' + this.testResult.distillation + '&';
        }
        if (this.testResult.ibp) {
            this.currentSearch += 'ibp$' + this.testResult.ibp + '&';
        }
        if (this.testResult.tenPresentRecovered) {
            this.currentSearch += 'tenPresentRecovered$' + this.testResult.tenPresentRecovered + '&';
        }
        if (this.testResult.fiftyPresentRecovered) {
            this.currentSearch += 'fiftyPresentRecovered$' + this.testResult.fiftyPresentRecovered + '&';
        }
        if (this.testResult.ninetyPresentRecovered) {
            this.currentSearch += 'ninetyPresentRecovered$' + this.testResult.ninetyPresentRecovered + '&';
        }
        if (this.testResult.fbp) {
            this.currentSearch += 'fbp$' + this.testResult.fbp + '&';
        }
        if (this.testResult.rl) {
            this.currentSearch += 'rl$' + this.testResult.rl + '&';
        }
        if (this.testResult.existentGum) {
            this.currentSearch += 'existentGum$' + this.testResult.existentGum + '&';
        }
        if (this.testResult.flashPoint) {
            this.currentSearch += 'flashPoint$' + this.testResult.flashPoint + '&';
        }
        if (this.testResult.copperCorrosion) {
            this.currentSearch += 'copperCorrosion$' + this.testResult.copperCorrosion + '&';
        }
        if (this.testResult.freezing) {
            this.currentSearch += 'freezing$' + this.testResult.freezing + '&';
        }
        if (this.testResult.conductivity) {
            this.currentSearch += 'conductivity$' + this.testResult.conductivity + '&';
        }
        if (this.testResult.isSend) {
            this.currentSearch += 'isSend;' + this.testResult.isSend + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        this.router.navigate(['request-test-result/' + this.requestTestResultId + '/test-result'], {
            queryParams: {
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
        this.translateService.get('niopdcgatewayApp.testResult.home.requestTestResultTitle').subscribe((title) => {
            this.breadcrumbItems.push({
                label: title + ` (${this.requestTestResult.id})`,
                routerLink: ['/request-test-result']
            });
        });
        this.translateService.get('niopdcgatewayApp.testResult.home.title').subscribe((title) => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });

        this.registerChangeInTestResults();

        this.requestTestResultService.find(this.requestTestResultId).subscribe(
            (requestTestResult) => {
                this.requestTestResult = requestTestResult.body;
                this.setBreadCrumb();
            }
        );
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TestResult) {
        return item.id;
    }

    registerChangeInTestResults() {
        this.eventSubscriber = this.eventManager.subscribe('testResultListModification', (response) => this.loadAll());
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

            this.router.navigate(['request-test-result', this.requestTestResultId, 'test-result'], {
                queryParams: {
                    page: this.page,
                    size: this.itemsPerPage,
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
        this.testResults = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
