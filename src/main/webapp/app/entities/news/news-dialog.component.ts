import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiDataUtils, JhiEventManager} from 'ng-jhipster';

import {News, NewsAccessType} from './news.model';
import {NewsPopupService} from './news-popup.service';
import {NewsService} from './news.service';
import {Location} from '../location/location.model';
import {LocationService} from '../location/location.service';

@Component({
    selector: 'jhi-news-dialog',
    templateUrl: './news-dialog.component.html'
})
export class NewsDialogComponent implements OnInit {
    locations: Location[];
    news: News;
    isSaving: boolean;
    isView: boolean;
    text: any;
    NewsAccessType = NewsAccessType;

    constructor(public activeModal: NgbActiveModal,
                private dataUtils: JhiDataUtils,
                private jhiAlertService: JhiAlertService,
                private newsService: NewsService,
                private locationService: LocationService,
                private elementRef: ElementRef,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.locationService.query().subscribe((res) => {
            this.locations = res.body;
        });

    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.news, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    handleEvent(data) {
        console.log(data.value);
        this.news.content = data.value;
    }

    save() {
        this.isSaving = true;
        if (this.news.id !== undefined) {
            this.subscribeToSaveResponse(
                this.newsService.update(this.news));
        } else {
            this.subscribeToSaveResponse(
                this.newsService.create(this.news));
        }
    }

    trackLocationById(index: number, item: Location) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }

    locationChanged(data) {
        const ids = data.map((d) => d.id);
        if (data.length !== 0) {
            this.locationService.queryBySubLocationsAndLevel(ids, 2)
                .subscribe(
                    (res: HttpResponse<Location[]>) => {
                        this.locations = res.body;
                    });
        } else {
            this.news.locations = null;
            this.locations = null;
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<News>>) {
        result.subscribe((res: HttpResponse<News>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: News) {
        this.eventManager.broadcast({name: 'newsListModification', content: 'OK'});
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
    selector: 'jhi-news-popup',
    template: ''
})
export class NewsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private newsPopupService: NewsPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.newsPopupService
                    .open(NewsDialogComponent as Component, params['id']);
            } else {
                this.newsPopupService
                    .open(NewsDialogComponent as Component);
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
