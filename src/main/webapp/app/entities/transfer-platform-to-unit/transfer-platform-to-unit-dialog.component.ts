import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {TransferPlatformToUnit} from './transfer-platform-to-unit.model';
import {TransferPlatformToUnitPopupService} from './transfer-platform-to-unit-popup.service';
import {TransferPlatformToUnitService} from './transfer-platform-to-unit.service';
import {MetreLog, MetreLogService} from '../metre-log';
import {Metre, MetreService} from '../metre';
import {OilTank, OilTankService, OilTankType} from '../oil-tank';
import {DayDepot, DayDepotService} from '../day-depot';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {SixtyConverter, SixtyDegreeConverterService} from "../../shared/sixty-degree-converter";
import {HotkeysService, Hotkey} from 'angular2-hotkeys';
import {NgForm} from "@angular/forms";

@Component({
    selector: 'jhi-transfer-platform-to-unit-dialog',
    templateUrl: './transfer-platform-to-unit-dialog.component.html'
})
export class TransferPlatformToUnitDialogComponent implements OnInit {

    transferPlatformToUnit: TransferPlatformToUnit;
    isSaving: boolean;
    isView: boolean;
    amount: number;
    maxEndMetreNumber: number;
    metrelogs: MetreLog[];

    metres: Metre[];

    metre: Metre;

    @ViewChild('editForm') editForm: NgForm;
    units: DayDepot[];
    platformTitle: string;

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private sixtyConverterService: SixtyDegreeConverterService,
                private transferPlatformToUnitService: TransferPlatformToUnitService,
                private metreLogService: MetreLogService,
                private metreService: MetreService,
                private _hotkeysService: HotkeysService,
                private oilTankService: OilTankService,
                private dayDepotService: DayDepotService,
                private eventManager: JhiEventManager) {
        this._hotkeysService.add(new Hotkey(['ins', 'enter'], (event: KeyboardEvent, k: string): boolean => {
            if (k === 'enter') {
                this.editForm.onSubmit(null);
                return false;
            }
        }));
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;


        if (this.transferPlatformToUnit.id) {
            this.metreService.find(this.transferPlatformToUnit.metreId)
                .subscribe(metre => {
                    this.metre = metre.body;
                    this.amount = this.transferPlatformToUnit.endMeter - this.transferPlatformToUnit.startMeter;
                });
        }
        /*this.metreLogService
            .query({filter: 'transferplatformtounit-is-null'})
            .subscribe((res: HttpResponse<MetreLog[]>) => {
                if (!this.transferPlatformToUnit.metreLogId) {
                    this.metrelogs = res.body;
                } else {
                    this.metreLogService
                        .find(this.transferPlatformToUnit.metreLogId)
                        .subscribe((subRes: HttpResponse<MetreLog>) => {
                            this.metrelogs = [subRes.body].concat(res.body);
                        }, (subRes) => this.onError(subRes.body));
                }
            }, (res) => this.onError(res.message));*/

        this.dayDepotService.find(this.transferPlatformToUnit.platformId).subscribe((dayDepot) => {
            this.platformTitle = dayDepot.body.oilTankTitle;
            this.metreService.getMetreActiveStatus(dayDepot.body.oilTankId)
                .subscribe((res) => {
                    this.metres = res.body;
                    /*if (this.metres != null && this.metres.length > 0){
                        this.transferPlatformToUnit.metreId = this.metres[0].id;
                        this.changeMetre(this.transferPlatformToUnit.metreId);
                    }*/
                }, (res) => this.onError(res.message));
        });

        this.dayDepotService.queryByOilTankType(OilTankType[OilTankType.UNIT], this.transferPlatformToUnit.platformId)
            .subscribe((res) => {
                this.units = res.body;
            }, (res) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        this.transferPlatformToUnit.amount = this.amount;
        this.transferPlatformToUnit.natureAmount = this.amount;
        if (this.transferPlatformToUnit.id !== undefined) {
            this.subscribeToSaveResponse(
                this.transferPlatformToUnitService.update(this.transferPlatformToUnit));
        } else {
            this.subscribeToSaveResponse(
                this.transferPlatformToUnitService.create(this.transferPlatformToUnit));
        }
    }

    changeMetre(metreId) {
        this.metreService.find(metreId)
            .subscribe(metre => {
                this.metre = metre.body;
                this.transferPlatformToUnit.startMeter = this.metre.amount;
                if (this.amount) {
                    let sum = Number(this.amount) + this.metre.amount;
                    if (sum > this.metre.maxMetre) {
                        let minus = sum - this.metre.maxMetre;
                        this.amount -= minus;
                    }
                    this.transferPlatformToUnit.endMeter = Number(this.amount) + this.transferPlatformToUnit.startMeter;

                }
                this.maxEndMetreNumber = this.metre.maxMetre - this.metre.amount;
            });
    }

    onChangeAmount(data) {
        this.amount = Number(data);
        if (this.metre) {
            this.transferPlatformToUnit.endMeter = this.amount + this.transferPlatformToUnit.startMeter;
        }
    }

    trackMetreLogById(index: number, item: MetreLog) {
        return item.id;
    }

    trackMetreById(index: number, item: Metre) {
        return item.id;
    }

    trackOilTankById(index: number, item: OilTank) {
        return item.id;
    }

    trackDayDepotById(index: number, item: DayDepot) {
        return item.id;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TransferPlatformToUnit>>) {
        result.subscribe((res: HttpResponse<TransferPlatformToUnit>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TransferPlatformToUnit) {
        this.eventManager.broadcast({name: 'transferPlatformToUnitListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    calculateQuantity60() {
        let model = new SixtyConverter();
        this.transferPlatformToUnit.natureAmount = this.amount;
        model.envTemp = this.transferPlatformToUnit.environmentTemperature;
        model.proTmp = this.transferPlatformToUnit.productTemperature;
        model.quantity = this.amount;
        model.speWei = this.transferPlatformToUnit.specialWeight;
        this.sixtyConverterService.getQuantity60Tank(model)
            .subscribe(res => {
                model = res.body;
                this.transferPlatformToUnit.sixtyAmount = res.body.quantity60;

            });

    }
}

@Component({
    selector: 'jhi-transfer-platform-to-unit-popup',
    template: ''
})
export class TransferPlatformToUnitPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private transferPlatformToUnitPopupService: TransferPlatformToUnitPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.transferPlatformToUnitPopupService
                    .open(TransferPlatformToUnitDialogComponent as Component, params['id']);
            } else if (params['dayDepotId']) {
                this.transferPlatformToUnitPopupService
                    .open(TransferPlatformToUnitDialogComponent as Component, null, params['dayDepotId']);
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
