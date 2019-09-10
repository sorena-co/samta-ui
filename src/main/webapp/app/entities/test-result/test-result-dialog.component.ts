import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {TestResult} from './test-result.model';
import {TestResultPopupService} from './test-result-popup.service';
import {TestResultService} from './test-result.service';
import {RequestTestResult, RequestTestResultService} from '../request-test-result';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

@Component({
    selector: 'jhi-test-result-dialog',
    templateUrl: './test-result-dialog.component.html'
})
export class TestResultDialogComponent implements OnInit {

    testResult: TestResult;
    isSaving: boolean;
    isView: boolean;

    requesttestresults: RequestTestResult[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private testResultService: TestResultService,
        private requestTestResultService: RequestTestResultService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.requestTestResultService
            .query({filter: 'testresult-is-null'})
            .subscribe((res: HttpResponse<RequestTestResult[]>) => {
                if (!this.testResult.requestTestResultId) {
                    this.requesttestresults = res.body;
                } else {
                    this.requestTestResultService
                        .find(this.testResult.requestTestResultId)
                        .subscribe((subRes: HttpResponse<RequestTestResult>) => {
                            this.requesttestresults = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.testResult.id !== undefined) {
            this.subscribeToSaveResponse(
                this.testResultService.update(this.testResult));
        } else {
            this.subscribeToSaveResponse(
                this.testResultService.create(this.testResult));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TestResult>>) {
        result.subscribe((res: HttpResponse<TestResult>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TestResult) {
        this.eventManager.broadcast({ name: 'testResultListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackRequestTestResultById(index: number, item: RequestTestResult) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-test-result-popup',
    template: ''
})
export class TestResultPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private testResultPopupService: TestResultPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.testResultPopupService
                    .open(TestResultDialogComponent as Component, params['id']);
            } else if (params['requestTestResultId']) {
                this.testResultPopupService
                    .open(TestResultDialogComponent as Component, null, params['requestTestResultId']);
            } else {
                console.log('not be');
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

class View {
    static isView: boolean;
}
