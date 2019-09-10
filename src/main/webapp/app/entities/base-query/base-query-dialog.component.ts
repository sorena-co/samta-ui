import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager, JhiAlertService} from 'ng-jhipster';

import {BaseQuery, BaseQueryResult} from './base-query.model';
import {BaseQueryPopupService} from './base-query-popup.service';
import {BaseQueryService} from './base-query.service';

@Component({
    selector: 'jhi-base-query-dialog',
    templateUrl: './base-query-dialog.component.html'
})
export class BaseQueryDialogComponent implements OnInit {

    baseQuery: BaseQuery;
    isSaving: boolean;
    isView: boolean;
    cols: any;
    resultList: any;
    baseQueryResult: BaseQueryResult;
    locationId: number;
    dateTime: any;
    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private baseQueryService: BaseQueryService,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
    }
    runQuery(){
        this.baseQueryService.resultListByTempQuery(this.baseQuery, this.dateTime, this.locationId).subscribe((baseQueryResult) => {
            this.baseQueryResult = baseQueryResult.body;
            this.resultList = [];
            this.baseQueryResult.resultList.forEach((value) => {
                let column: any;
                column = {};
                for (let i = 0; i < this.baseQueryResult.header.length; i++) {
                    column[this.baseQueryResult.header[i]] = value[i];
                }
                this.resultList.push(column);

            });

            this.cols = [];
            this.baseQueryResult.header.forEach((value) => {
                let header: any;
                header = {};
                header.field = value;
                header.header = value;
                this.cols.push(header);
            });
            this.cols = this.cols.reverse();

        });
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.baseQuery.id !== undefined) {
            this.subscribeToSaveResponse(
                this.baseQueryService.update(this.baseQuery));
        } else {
            this.subscribeToSaveResponse(
                this.baseQueryService.create(this.baseQuery));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<BaseQuery>>) {
        result.subscribe((res: HttpResponse<BaseQuery>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: BaseQuery) {
        this.eventManager.broadcast({name: 'baseQueryListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-base-query-popup',
    template: ''
})
export class BaseQueryPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private baseQueryPopupService: BaseQueryPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.baseQueryPopupService
                    .open(BaseQueryDialogComponent as Component, params['id']);
            } else {
                this.baseQueryPopupService
                    .open(BaseQueryDialogComponent as Component);
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
