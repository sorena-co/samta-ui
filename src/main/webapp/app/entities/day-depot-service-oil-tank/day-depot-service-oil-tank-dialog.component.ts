import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {DayDepotServiceOilTank} from './day-depot-service-oil-tank.model';
import {DayDepotServiceOilTankPopupService} from './day-depot-service-oil-tank-popup.service';
import {DayDepotServiceOilTankService} from './day-depot-service-oil-tank.service';
import {MeasurementOilTank} from '../measurement-oil-tank';
import {DayDepot, DayDepotService} from '../day-depot';
import {LiteratureVolumeOilTank} from '../literature-volume-oil-tank/literature-volume-oil-tank.model';
import {LiteratureVolumeOilTankService} from '../literature-volume-oil-tank/literature-volume-oil-tank.service';
import {SixtyConverter, SixtyDegreeConverterService} from '../../shared/sixty-degree-converter';
import {MeasureType, OilTank, OilTankService} from '../oil-tank';
import {ServiceOilTank, ServiceOilTankService} from "../service-oil-tank";

@Component({
    selector: 'jhi-day-depot-service-oil-tank-dialog',
    templateUrl: './day-depot-service-oil-tank-dialog.component.html'
})
export class DayDepotServiceOilTankDialogComponent implements OnInit {

    dayDepotServiceOilTank: DayDepotServiceOilTank;
    isSaving: boolean;
    isView: boolean;
    literatureVolumeOilTanks: LiteratureVolumeOilTank[];
    isHaveOldDayDepot: boolean;
    dayDepotId: number;
    daydepots: DayDepot[];
    disableStart: boolean;
    disableEnd: boolean;
    serviceOilTank: ServiceOilTank;
    MeasureType = MeasureType;

    constructor(public activeModal: NgbActiveModal,
                private literatureVolumeOilTankService: LiteratureVolumeOilTankService,
                private jhiAlertService: JhiAlertService,
                private dayDepotService: DayDepotService,
                private serviceOilTankService: ServiceOilTankService,
                private sixtyDegreeService: SixtyDegreeConverterService,
                private dayDepotServiceOilTankService: DayDepotServiceOilTankService,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {

        if (this.dayDepotServiceOilTank.id) {
            if (this.dayDepotServiceOilTank.startMeasurementOilTankEnvironmentTemperature &&
                this.dayDepotServiceOilTank.startMeasurementOilTankProductTemperature &&
                this.dayDepotServiceOilTank.startMeasurementOilTankSpecialWeight) {
                this.disableStart = true;
            }
            if (this.dayDepotServiceOilTank.endMeasurementOilTankProductTemperature &&
                this.dayDepotServiceOilTank.endMeasurementOilTankEnvironmentTemperature &&
                this.dayDepotServiceOilTank.startMeasurementOilTankSpecialWeight) {
                this.disableEnd = true;
            }
        }

        this.dayDepotId = UsefulId.dayDepotId;
        this.isView = View.isView;
        this.isSaving = false;
        this.literatureVolumeOilTankService.queryByServiceOilTankId(this.dayDepotServiceOilTank.oilTankServiceId)
            .subscribe((res: HttpResponse<LiteratureVolumeOilTank[]>) => {
                this.literatureVolumeOilTanks = res.body;
            });
        this.dayDepotService.isHaveOldDayDepot(this.dayDepotId)
            .subscribe(value => this.isHaveOldDayDepot = value);
        this.dayDepotServiceOilTankService.find(this.dayDepotServiceOilTank.id)
            .subscribe(value => {
                this.serviceOilTankService.find(value.body.oilTankServiceId)
                    .subscribe(oilTankRes => this.serviceOilTank = oilTankRes.body);
            });
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.dayDepotServiceOilTank.id !== undefined) {
            this.subscribeToSaveResponse(
                this.dayDepotServiceOilTankService.update(this.dayDepotServiceOilTank));
        } else {
            this.subscribeToSaveResponse(
                this.dayDepotServiceOilTankService.create(this.dayDepotServiceOilTank));
        }
    }

    trackMeasurementOilTankById(index: number, item: MeasurementOilTank) {
        return item.id;
    }

    trackMeasurementOilTankAmountDeepStartById(index: number, item: LiteratureVolumeOilTank) {
        return item.id;
    }

    trackMeasurementOilTankAmountDeepEndById(index: number, item: LiteratureVolumeOilTank) {
        return item.id;
    }

    trackDayDepotById(index: number, item: DayDepot) {
        return item.id;
    }

    onStartMeasurementOilTankAmountDeep(data) {
        let model = new SixtyConverter();
        model.envTemp = this.dayDepotServiceOilTank.startMeasurementOilTankEnvironmentTemperature;
        model.proTmp = this.dayDepotServiceOilTank.startMeasurementOilTankProductTemperature;
        model.speWei = this.dayDepotServiceOilTank.startMeasurementOilTankSpecialWeight;
        this.sixtyDegreeService.getQuantity60TankByLiteratureVolumeOilTanks(model, this.literatureVolumeOilTanks.find((value) => value.millimeter === data).id)
            .subscribe(res => {
                model = res.body;
                this.dayDepotServiceOilTank.startMeasurementOilTankAmount = res.body.quantity;
                this.dayDepotServiceOilTank.startMeasurementOilTankSixtyAmount = res.body.quantity60;
                this.disableStart = true;
            });
    }

    onEndMeasurementOilTankAmountDeep(data) {
        let model = new SixtyConverter();
        model.envTemp = this.dayDepotServiceOilTank.endMeasurementOilTankEnvironmentTemperature;
        model.proTmp = this.dayDepotServiceOilTank.endMeasurementOilTankProductTemperature;
        model.speWei = this.dayDepotServiceOilTank.endMeasurementOilTankSpecialWeight;
        this.sixtyDegreeService.getQuantity60TankByLiteratureVolumeOilTanks(model, this.literatureVolumeOilTanks.find((value) => value.millimeter === data).id)
            .subscribe(res => {
                model = res.body;
                this.dayDepotServiceOilTank.endMeasurementOilTankAmount = res.body.quantity;
                this.dayDepotServiceOilTank.endMeasurementOilTankSixtyAmount = res.body.quantity60;
                this.disableEnd = true;
            });
    }

    refreshStart() {
        this.dayDepotServiceOilTank.startMeasurementOilTankAmount = null;
        this.dayDepotServiceOilTank.startMeasurementOilTankAmountDeep = null;
        this.dayDepotServiceOilTank.startMeasurementOilTankSixtyAmount = null;
        this.dayDepotServiceOilTank.startMeasurementOilTankSpecialWeight = null;
        this.dayDepotServiceOilTank.startMeasurementOilTankProductTemperature = null;
        this.dayDepotServiceOilTank.startMeasurementOilTankEnvironmentTemperature = null;
        this.dayDepotServiceOilTank.startMeasurementOilTankRegisterDate = null;
        this.disableStart = false;
    }

    refreshEnd() {
        this.dayDepotServiceOilTank.endMeasurementOilTankAmount = null;
        this.dayDepotServiceOilTank.endMeasurementOilTankAmountDeep = null;
        this.dayDepotServiceOilTank.endMeasurementOilTankSixtyAmount = null;
        this.dayDepotServiceOilTank.endMeasurementOilTankSpecialWeight = null;
        this.dayDepotServiceOilTank.endMeasurementOilTankProductTemperature = null;
        this.dayDepotServiceOilTank.endMeasurementOilTankEnvironmentTemperature = null;
        this.dayDepotServiceOilTank.endMeasurementOilTankRegisterDate = null;
        this.disableEnd = false;
    }

    onBlurStartDeep() {
        this.literatureVolumeOilTankService.calculateRatio(this.dayDepotServiceOilTank.startMeasurementOilTankAmountDeep, null, this.dayDepotServiceOilTank.oilTankServiceId)
            .subscribe(value => {
                this.dayDepotServiceOilTank.startMeasurementOilTankAmount = value.body;
                let model = new SixtyConverter();
                model.envTemp = this.dayDepotServiceOilTank.startMeasurementOilTankEnvironmentTemperature;
                model.proTmp = this.dayDepotServiceOilTank.startMeasurementOilTankProductTemperature;
                model.speWei = this.dayDepotServiceOilTank.startMeasurementOilTankSpecialWeight;
                model.quantity = this.dayDepotServiceOilTank.startMeasurementOilTankAmount;
                this.sixtyDegreeService.getQuantity60Tank(model)
                    .subscribe(res => {
                        model = res.body;
                        this.dayDepotServiceOilTank.startMeasurementOilTankAmount = res.body.quantity;
                        this.dayDepotServiceOilTank.startMeasurementOilTankSixtyAmount = res.body.quantity60;
                        this.disableStart = true;
                    });
            });
    }

    onBlurEndDeep() {
        this.literatureVolumeOilTankService.calculateRatio(this.dayDepotServiceOilTank.endMeasurementOilTankAmountDeep, null, this.dayDepotServiceOilTank.oilTankServiceId)
            .subscribe(value => {
                this.dayDepotServiceOilTank.endMeasurementOilTankAmount = value.body;
                let model = new SixtyConverter();
                model.envTemp = this.dayDepotServiceOilTank.endMeasurementOilTankEnvironmentTemperature;
                model.proTmp = this.dayDepotServiceOilTank.endMeasurementOilTankProductTemperature;
                model.speWei = this.dayDepotServiceOilTank.endMeasurementOilTankSpecialWeight;
                model.quantity = this.dayDepotServiceOilTank.endMeasurementOilTankAmount;
                this.sixtyDegreeService.getQuantity60Tank(model)
                    .subscribe(res => {
                        model = res.body;
                        this.dayDepotServiceOilTank.endMeasurementOilTankAmount = res.body.quantity;
                        this.dayDepotServiceOilTank.endMeasurementOilTankSixtyAmount = res.body.quantity60;
                        this.disableEnd = true;
                    });
            });
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<DayDepotServiceOilTank>>) {
        result.subscribe((res: HttpResponse<DayDepotServiceOilTank>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: DayDepotServiceOilTank) {
        this.eventManager.broadcast({name: 'dayDepotServiceOilTankListModification', content: 'OK'});
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
    selector: 'jhi-day-depot-service-oil-tank-popup',
    template: ''
})
export class DayDepotServiceOilTankPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private dayDepotServiceOilTankPopupService: DayDepotServiceOilTankPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if (params['type']) {
                UsefulId.dayDepotId = params['dayDepotId'];
                if (params['type'] === 'view') {
                    View.isView = true;
                } else {
                    View.isView = false;
                }
            }
            if (params['dayDepotId'] && !params['id']) {
                UsefulId.dayDepotId = params['dayDepotId'];
                this.dayDepotServiceOilTankPopupService
                    .open(DayDepotServiceOilTankDialogComponent as Component, null, params['dayDepotId']);
            }
            if (params['id'] && params['dayDepotId']) {
                UsefulId.dayDepotId = params['dayDepotId'];
                UsefulId.dayDepotServiceOilTankId = params['id'];
                this.dayDepotServiceOilTankPopupService
                    .open(DayDepotServiceOilTankDialogComponent as Component, params['id'], params['dayDepotId']);
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

class UsefulId {
    static dayDepotId: number;
    static dayDepotServiceOilTankId: number;
}
