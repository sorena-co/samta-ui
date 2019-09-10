import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CleaningReportOilTank } from './cleaning-report-oil-tank.model';
import { CleaningReportOilTankPopupService } from './cleaning-report-oil-tank-popup.service';
import { CleaningReportOilTankService } from './cleaning-report-oil-tank.service';
import { OilTank, OilTankService } from '../oil-tank';
import { RefuelCenter, RefuelCenterService } from '../refuel-center';

import {Product} from '../product';
import {ProductService} from '../product';

@Component({
    selector: 'jhi-cleaning-report-oil-tank-dialog',
    templateUrl: './cleaning-report-oil-tank-dialog.component.html'
})
export class CleaningReportOilTankDialogComponent implements OnInit {

    cleaningReportOilTank: CleaningReportOilTank;
    isSaving: boolean;
    isView: boolean;

    products: Product[];
    oiltanks: OilTank[];

    refuelCenters: RefuelCenter[];

    constructor(public activeModal: NgbActiveModal,
                private productService: ProductService,
                private jhiAlertService: JhiAlertService,
                private cleaningReportOilTankService: CleaningReportOilTankService,
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
        this.refuelCenterService.queryByReadAccess()
            .subscribe((res: HttpResponse<RefuelCenter[]>) => {
                this.refuelCenters = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.productService.query()
            .subscribe((res: HttpResponse<Product[]>) => {
                this.products = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.cleaningReportOilTank.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cleaningReportOilTankService.update(this.cleaningReportOilTank));
        } else {
            this.subscribeToSaveResponse(
                this.cleaningReportOilTankService.create(this.cleaningReportOilTank));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CleaningReportOilTank>>) {
        result.subscribe((res: HttpResponse<CleaningReportOilTank>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CleaningReportOilTank) {
        this.eventManager.broadcast({ name: 'cleaningReportOilTankListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
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

}

@Component({
    selector: 'jhi-cleaning-report-oil-tank-popup',
    template: ''
})
export class CleaningReportOilTankPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private cleaningReportOilTankPopupService: CleaningReportOilTankPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.cleaningReportOilTankPopupService
                    .open(CleaningReportOilTankDialogComponent as Component, params['id']);
            } else {
                this.cleaningReportOilTankPopupService
                    .open(CleaningReportOilTankDialogComponent as Component);
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
