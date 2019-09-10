import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {RequestFilterElement} from './request-filter-element.model';
import {RequestFilterElementPopupService} from './request-filter-element-popup.service';
import {RequestFilterElementService} from './request-filter-element.service';
import {OilTank, OilTankService} from '../oil-tank';
import {RefuelCenter, RefuelCenterService} from '../refuel-center';
import {Product} from '../product/product.model';
import {ProductService} from '../product/product.service';

@Component({
    selector: 'jhi-request-filter-element-dialog',
    templateUrl: './request-filter-element-dialog.component.html'
})
export class RequestFilterElementDialogComponent implements OnInit {

    requestFilterElement: RequestFilterElement;
    isSaving: boolean;
    isView: boolean;
    products: Product[];

    oiltanks: OilTank[];

    refuelCenters: RefuelCenter[];

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private productService: ProductService,
                private requestFilterElementService: RequestFilterElementService,
                private oilTankService: OilTankService,
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
        if (this.requestFilterElement.id !== undefined) {
            this.subscribeToSaveResponse(
                this.requestFilterElementService.update(this.requestFilterElement));
        } else {
            this.subscribeToSaveResponse(
                this.requestFilterElementService.create(this.requestFilterElement));
        }
    }

    trackOilTankById(index: number, item: OilTank) {
        return item.id;
    }

    trackRefuelCenterById(index: number, item: RefuelCenter) {
        return item.id;
    }

    trackProductById(index: number, item: RefuelCenter) {
        return item.id;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<RequestFilterElement>>) {
        result.subscribe((res: HttpResponse<RequestFilterElement>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: RequestFilterElement) {
        this.eventManager.broadcast({name: 'requestFilterElementListModification', content: 'OK'});
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
    selector: 'jhi-request-filter-element-popup',
    template: ''
})
export class RequestFilterElementPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private requestFilterElementPopupService: RequestFilterElementPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.requestFilterElementPopupService
                    .open(RequestFilterElementDialogComponent as Component, params['id']);
            } else {
                this.requestFilterElementPopupService
                    .open(RequestFilterElementDialogComponent as Component);
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
