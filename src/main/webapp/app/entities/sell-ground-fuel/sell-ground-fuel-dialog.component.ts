import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {SellGroundFuel} from './sell-ground-fuel.model';
import {SellGroundFuelPopupService} from './sell-ground-fuel-popup.service';
import {SellGroundFuelService} from './sell-ground-fuel.service';
import {DayDepot} from '../day-depot';
import {HotkeysService, Hotkey} from 'angular2-hotkeys';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'jhi-sell-ground-fuel-dialog',
    templateUrl: './sell-ground-fuel-dialog.component.html'
})
export class SellGroundFuelDialogComponent implements OnInit {

    sellGroundFuel: SellGroundFuel;
    isSaving: boolean;
    isView: boolean;

    daydepots: DayDepot[];
    @ViewChild('editForm') editForm: NgForm;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private sellGroundFuelService: SellGroundFuelService,
        private _hotkeysService: HotkeysService,
        private eventManager: JhiEventManager
    ) {
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
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.sellGroundFuel.sellToDifferent) {
            this.sellGroundFuel.totalPrice = this.sellGroundFuel.amount * this.sellGroundFuel.rate;
        }
        if (this.sellGroundFuel.id !== undefined) {
            this.subscribeToSaveResponse(
                this.sellGroundFuelService.update(this.sellGroundFuel));
        } else {
            this.subscribeToSaveResponse(
                this.sellGroundFuelService.create(this.sellGroundFuel));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SellGroundFuel>>) {
        result.subscribe((res: HttpResponse<SellGroundFuel>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SellGroundFuel) {
        this.eventManager.broadcast({name: 'sellGroundFuelListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackDayDepotById(index: number, item: DayDepot) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-sell-ground-fuel-popup',
    template: ''
})
export class SellGroundFuelPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sellGroundFuelPopupService: SellGroundFuelPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.sellGroundFuelPopupService
                    .open(SellGroundFuelDialogComponent as Component, params['id']);
            } else if (params['dayDepotId']) {
                this.sellGroundFuelPopupService
                    .open(SellGroundFuelDialogComponent as Component, null, params['dayDepotId']);
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
