import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {DayDepot} from './day-depot.model';
import {DayDepotPopupService} from './day-depot-popup.service';
import {DayDepotService} from './day-depot.service';
import {MeasurementOilTankService} from '../measurement-oil-tank';
import {MeasureType, OilTank, OilTankService, OilTankType} from '../oil-tank';
import {MainDayDepotService} from '../main-day-depot';
import {MainDayOperationService} from '../main-day-operation';
import {LiteratureVolumeOilTank} from '../literature-volume-oil-tank/literature-volume-oil-tank.model';
import {LiteratureVolumeOilTankService} from '../literature-volume-oil-tank/literature-volume-oil-tank.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {SixtyConverter, SixtyDegreeConverterService} from '../../shared/sixty-degree-converter';

@Component({
    selector: 'jhi-day-depot-dialog',
    templateUrl: './day-depot-dialog.component.html'
})
export class DayDepotDialogComponent implements OnInit {

    dayDepot: DayDepot;
    haveOldDayDepot: boolean;
    isSaving: boolean;
    isView: boolean;
    literatureVolumeOilTanks: LiteratureVolumeOilTank[];
    OilTankType = OilTankType;
    MeasureType = MeasureType;
    oilTank: OilTank;

    constructor(public activeModal: NgbActiveModal,
                private literatureVolumeOilTankService: LiteratureVolumeOilTankService,
                private jhiAlertService: JhiAlertService,
                private dayDepotService: DayDepotService,
                private measurementOilTankService: MeasurementOilTankService,
                private oilTankService: OilTankService,
                private sixtyDegreeService: SixtyDegreeConverterService,
                private mainDayDepotService: MainDayDepotService,
                private mainDayOperationService: MainDayOperationService,
                private eventManager: JhiEventManager,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.literatureVolumeOilTankService.queryByOilTankId(this.dayDepot.oilTankId)
            .subscribe((res) => {
                this.literatureVolumeOilTanks = res.body;
            });
        if (this.dayDepot.id) {
            this.dayDepotService.isHaveOldDayDepot(this.dayDepot.id)
                .subscribe(value => {
                    this.haveOldDayDepot = value;
                });
        }
        this.oilTankService.find(this.dayDepot.oilTankId)
            .subscribe(value => this.oilTank = value.body);
    }


    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.dayDepot.id !== undefined) {
            if(this.dayDepot.mainDayOperationId!=null){
                this.dayDepot.endMeasurementOilTankSixtyAmount = this.dayDepot.endMeasurementOilTankAmountDeep;
                this.dayDepot.startMeasurementOilTankSixtyAmount = this.dayDepot.startMeasurementOilTankAmountDeep;
                this.dayDepot.endMeasurementOilTankSpecialWeight = 60;
                this.dayDepot.endMeasurementOilTankProductTemperature = 60;
                this.dayDepot.endMeasurementOilTankEnvironmentTemperature = 60;
                this.dayDepot.startMeasurementOilTankSpecialWeight = 60;
                this.dayDepot.startMeasurementOilTankProductTemperature = 60;
                this.dayDepot.startMeasurementOilTankEnvironmentTemperature = 60;
            }
            this.subscribeToSaveResponse(
                this.dayDepotService.update(this.dayDepot));
        } else {
            this.subscribeToSaveResponse(
                this.dayDepotService.create(this.dayDepot));
        }
    }

    onStartMeasurementOilTankAmountDeep(data) {
        if(this.dayDepot.mainDayOperationId==null) {
            let model = new SixtyConverter();
            model.envTemp = this.dayDepot.startMeasurementOilTankEnvironmentTemperature;
            model.proTmp = this.dayDepot.startMeasurementOilTankProductTemperature;
            model.speWei = this.dayDepot.startMeasurementOilTankSpecialWeight;
            this.sixtyDegreeService.getQuantity60TankByLiteratureVolumeOilTanks(model, this.literatureVolumeOilTanks.find((value) => value.millimeter === data).id)
                .subscribe(res => {
                    model = res.body;
                    this.dayDepot.startMeasurementOilTankAmount = res.body.quantity;
                    this.dayDepot.startMeasurementOilTankSixtyAmount = res.body.quantity60;
                });
        }
    }

    onEndMeasurementOilTankAmountDeep(data) {
        if(this.dayDepot.mainDayOperationId!=null) {
            let model = new SixtyConverter();
            model.envTemp = this.dayDepot.endMeasurementOilTankEnvironmentTemperature;
            model.proTmp = this.dayDepot.endMeasurementOilTankProductTemperature;
            model.speWei = this.dayDepot.endMeasurementOilTankSpecialWeight;
            this.sixtyDegreeService.getQuantity60TankByLiteratureVolumeOilTanks(model, this.literatureVolumeOilTanks.find((value) => value.millimeter === data).id)
                .subscribe(res => {
                    model = res.body;
                    this.dayDepot.endMeasurementOilTankAmount = res.body.quantity;
                    this.dayDepot.endMeasurementOilTankSixtyAmount = res.body.quantity60;
                });
        }
    }

    refreshStart() {
        this.dayDepot.startMeasurementOilTankAmount = null;
        this.dayDepot.startMeasurementOilTankAmountDeep = null;
        this.dayDepot.startMeasurementOilTankSixtyAmount = null;
        this.dayDepot.startMeasurementOilTankSpecialWeight = null;
        this.dayDepot.startMeasurementOilTankProductTemperature = null;
        this.dayDepot.startMeasurementOilTankEnvironmentTemperature = null;
        this.dayDepot.startMeasurementOilTankRegisterDate = null;
    }

    refreshEnd() {
        this.dayDepot.endMeasurementOilTankAmount = null;
        this.dayDepot.endMeasurementOilTankAmountDeep = null;
        this.dayDepot.endMeasurementOilTankSixtyAmount = null;
        this.dayDepot.endMeasurementOilTankSpecialWeight = null;
        this.dayDepot.endMeasurementOilTankProductTemperature = null;
        this.dayDepot.endMeasurementOilTankEnvironmentTemperature = null;
        this.dayDepot.endMeasurementOilTankRegisterDate = null;
    }

    trackOilTankById(index: number, item: OilTank) {
        return item.id;
    }


    trackMeasurementOilTankAmountDeepById(index: number, item: LiteratureVolumeOilTank) {
        return item.id;
    }

    onBlurStartDeep() {
        this.literatureVolumeOilTankService.calculateRatio(this.dayDepot.startMeasurementOilTankAmountDeep, this.dayDepot.oilTankId, null)
            .subscribe(value => {
                this.dayDepot.startMeasurementOilTankAmount = value.body;
                let model = new SixtyConverter();
                model.envTemp = this.dayDepot.startMeasurementOilTankEnvironmentTemperature;
                model.proTmp = this.dayDepot.startMeasurementOilTankProductTemperature;
                model.speWei = this.dayDepot.startMeasurementOilTankSpecialWeight;
                model.quantity = this.dayDepot.startMeasurementOilTankAmount;
                this.sixtyDegreeService.getQuantity60Tank(model)
                    .subscribe(res => {
                        model = res.body;
                        this.dayDepot.startMeasurementOilTankAmount = res.body.quantity;
                        this.dayDepot.startMeasurementOilTankSixtyAmount = res.body.quantity60;
                    });
            });
    }

    onBlurEndDeep() {
            this.literatureVolumeOilTankService.calculateRatio(this.dayDepot.endMeasurementOilTankAmountDeep, this.dayDepot.oilTankId, null)
                .subscribe(value => {
                    this.dayDepot.endMeasurementOilTankAmount = value.body;
                    if(this.dayDepot.mainDayOperationId==null) {
                        let model = new SixtyConverter();
                        model.envTemp = this.dayDepot.endMeasurementOilTankEnvironmentTemperature;
                        model.proTmp = this.dayDepot.endMeasurementOilTankProductTemperature;
                        model.speWei = this.dayDepot.endMeasurementOilTankSpecialWeight;
                        model.quantity = this.dayDepot.endMeasurementOilTankAmount;
                        this.sixtyDegreeService.getQuantity60Tank(model)
                            .subscribe(res => {
                                model = res.body;
                                this.dayDepot.endMeasurementOilTankAmount = res.body.quantity;
                                this.dayDepot.endMeasurementOilTankSixtyAmount = res.body.quantity60;
                            });
                    }
                });
    }


    private subscribeToSaveResponse(result: Observable<HttpResponse<DayDepot>>) {
        result.subscribe((res: HttpResponse<DayDepot>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: DayDepot) {
        this.eventManager.broadcast({name: 'dayDepotListModification', content: 'OK'});
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
    selector: 'jhi-day-depot-popup',
    template: ''
})
export class DayDepotPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private dayDepotPopupService: DayDepotPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.dayDepotPopupService
                    .open(DayDepotDialogComponent as Component, params['id']);
            } else if (params['mainDayDepotId']) {
                this.dayDepotPopupService
                    .open(DayDepotDialogComponent as Component, null, params['mainDayDepotId']);
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
