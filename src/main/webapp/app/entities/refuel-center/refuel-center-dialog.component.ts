import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {RefuelCenter} from './refuel-center.model';
import {RefuelCenterPopupService} from './refuel-center-popup.service';
import {RefuelCenterService} from './refuel-center.service';
import {TransferType, TransferTypeService} from '../transfer-type';
import {DepotService} from '../depot/depot.service';
import {Depot} from '../depot/depot.model';
import {RegionService} from '../region/region.service';
import {CountryService} from '../country/country.service';
import {AirportService} from "../airport";

@Component({
    selector: 'jhi-refuel-center-dialog',
    templateUrl: './refuel-center-dialog.component.html'
})
export class RefuelCenterDialogComponent implements OnInit {

    refuelCenter: RefuelCenter;
    isSaving: boolean;
    isView: boolean;
    depots: any[];
    depotSelected: any;
    transfertypes: any[];
    transferTypeSelected: any;
    refuelCenters: any;
    foreignRefuelCenter: boolean;
    refuelCenterSelected: any [];
    airports: any[];
    airportSelected: any[];
    disableFuel: boolean = false;
    disableWaybill: boolean = false;

    constructor(private activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private refuelCenterService: RefuelCenterService,
                private depotService: DepotService,
                private regionService: RegionService,
                private countryService: CountryService,
                private airportService: AirportService,
                private transferTypeService: TransferTypeService,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;

        this.transferTypeService.query()
            .subscribe((res: HttpResponse<TransferType[]>) => {
                this.transfertypes = res.body;
                for (let i = 0; i < this.transfertypes.length; i++) {
                    this.transfertypes[i].label = this.transfertypes[i].title;
                    this.transfertypes[i].value = this.transfertypes[i].id;
                }
                if (this.refuelCenter.id != null) {
                    this.transferTypeSelected = [];
                    for (let i = 0; i < this.refuelCenter.transferTypes.length; i++) {
                        this.transferTypeSelected.push(this.refuelCenter.transferTypes[i].id);
                    }
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));

        this.depotService.query()
            .subscribe((res: HttpResponse<Depot[]>) => {
                this.depots = res.body;
                for (let i = 0; i < this.depots.length; i++) {
                    this.depots[i].label = this.depots[i].title;
                    this.depots[i].value = this.depots[i].id;
                }
                if (this.refuelCenter.id != null) {
                    this.depotSelected = [];
                    for (let i = 0; i < this.refuelCenter.depotIds.length; i++) {
                        this.depotSelected.push(this.refuelCenter.depotIds[i]);
                    }
                }
            });
        this.airportService.query().subscribe((res) => {
            this.airports = res.body;
            for (let i = 0; i < this.airports.length; i++) {
                this.airports[i].value = this.airports[i].id;
                this.airports[i].label = this.airports[i].persianTitle;
            }
            if (this.refuelCenter.id != null) {
                this.airportSelected = [];
                for (let i = 0; i < this.refuelCenter.airports.length; i++) {
                    this.airportSelected.push(this.refuelCenter.airports[i].id);
                }
            }
        });
        this.handleDisableOrderNumbers();
    }

    handleDisableOrderNumbers() {
        if (this.refuelCenter.fuelReceiptStartNumber !== this.refuelCenter.fuelReceiptCurrentNumber) {
            this.disableFuel = true;
        } else {
            this.disableFuel = false;
        }

        if (this.refuelCenter.wayBillStartNumber !== this.refuelCenter.wayBillCurrentNumber) {
            this.disableWaybill = true;
        } else {
            this.disableWaybill = false;
        }
    }


    onChangeAirport(newValue) {
        this.refuelCenter.airports = [];
        for (let i = 0; i < this.airportSelected.length; i++) {
            for (let j = 0; j < this.airports.length; j++) {
                if (this.airportSelected[i] === this.airports[j].id) {
                    this.refuelCenter.airports[i] = this.airports[j];
                }
            }
        }
    }

    onChangeDepots(data) {
        this.refuelCenter.depotIds = [];
        for (let i = 0; i < this.depotSelected.length; i++) {
            for (let j = 0; j < this.depots.length; j++) {
                if (this.depotSelected[i] === this.depots[j].id) {
                    this.refuelCenter.depotIds[i] = this.depots[j].id;
                }
            }
        }
    }

    onChangeTransferType(data) {
        this.refuelCenter.transferTypes = [];
        for (let i = 0; i < this.transferTypeSelected.length; i++) {
            for (let j = 0; j < this.transfertypes.length; j++) {
                if (this.transferTypeSelected[i] === this.transfertypes[j].id) {
                    this.refuelCenter.transferTypes[i] = this.transfertypes[j];
                }
            }
        }
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.refuelCenter.id !== undefined) {
            this.subscribeToSaveResponse(
                this.refuelCenterService.update(this.refuelCenter));
        } else {
            this.subscribeToSaveResponse(
                this.refuelCenterService.create(this.refuelCenter));
        }
    }

    trackTransferTypeById(index: number, item: TransferType) {
        return item.id;
    }

    trackRefuelCenterById(index: number, item: RefuelCenter) {
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

    changeFuelReceiptStartNumber(data) {
        console.log(this.refuelCenter.fuelReceiptStartNumber);
        this.refuelCenter.fuelReceiptCurrentNumber = this.refuelCenter.fuelReceiptStartNumber;
    }

    changeWayBillStartNumber(data) {
        console.log(this.refuelCenter.fuelReceiptStartNumber);
        this.refuelCenter.wayBillCurrentNumber = this.refuelCenter.wayBillStartNumber;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<RefuelCenter>>) {
        result.subscribe((res: HttpResponse<RefuelCenter>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: RefuelCenter) {
        this.eventManager.broadcast({name: 'refuelCenterListModification', content: 'OK'});
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
    selector: 'jhi-refuel-center-popup',
    template: ''
})
export class RefuelCenterPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private refuelCenterPopupService: RefuelCenterPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.refuelCenterPopupService
                    .open(RefuelCenterDialogComponent as Component, params['id']);
            } else {
                this.refuelCenterPopupService
                    .open(RefuelCenterDialogComponent as Component);
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
