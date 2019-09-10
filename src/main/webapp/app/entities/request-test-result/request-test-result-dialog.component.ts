import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {RequestTestResult} from './request-test-result.model';
import {RequestTestResultPopupService} from './request-test-result-popup.service';
import {RequestTestResultService} from './request-test-result.service';
import {OilTank, OilTankService} from '../oil-tank';
import {RefuelCenter, RefuelCenterService} from '../refuel-center';
import {Product} from '../product/product.model';
import {ProductService} from '../product/product.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

@Component({
    selector: 'jhi-request-test-result-dialog',
    templateUrl: './request-test-result-dialog.component.html'
})
export class RequestTestResultDialogComponent implements OnInit {

    requestTestResult: RequestTestResult;
    isSaving: boolean;
    isView: boolean;

    products: Product[];
    oiltanks: OilTank[];

    refuelCenters: RefuelCenter[];

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private requestTestResultService: RequestTestResultService,
                private oilTankService: OilTankService,
                private productService: ProductService,
                private refuelCenterService: RefuelCenterService,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.oilTankService.query()
            .subscribe((res: HttpResponse<OilTank[]>) => {
                this.oiltanks = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.refuelCenterService.query()
            .subscribe((res: HttpResponse<RefuelCenter[]>) => {
                this.refuelCenters = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.productService.query()
            .subscribe((res) => {
                this.products = res.body;
            });
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.requestTestResult.id !== undefined) {
            this.subscribeToSaveResponse(
                this.requestTestResultService.update(this.requestTestResult));
        } else {
            this.subscribeToSaveResponse(
                this.requestTestResultService.create(this.requestTestResult));
        }
    }

    trackOilTankById(index: number, item: OilTank) {
        return item.id;
    }

    trackRefuelCenterById(index: number, item: RefuelCenter) {
        return item.id;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<RequestTestResult>>) {
        result.subscribe((res: HttpResponse<RequestTestResult>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: RequestTestResult) {
        this.eventManager.broadcast({name: 'requestTestResultListModification', content: 'OK'});
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
    selector: 'jhi-request-test-result-popup',
    template: ''
})
export class RequestTestResultPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private requestTestResultPopupService: RequestTestResultPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.requestTestResultPopupService
                    .open(RequestTestResultDialogComponent as Component, params['id']);
            } else {
                this.requestTestResultPopupService
                    .open(RequestTestResultDialogComponent as Component);
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
