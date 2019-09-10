import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {NiopdcConfig} from './niopdc-config.model';
import {NiopdcConfigPopupService} from './niopdc-config-popup.service';
import {NiopdcConfigService} from './niopdc-config.service';
import {Currency, CurrencyService} from '../currency';
import {CurrencyRateGroup, CurrencyRateGroupService} from '../currency-rate-group';
import {TransferType, TransferTypeService} from "../transfer-type";

@Component({
    selector: 'jhi-niopdc-config-dialog',
    templateUrl: './niopdc-config-dialog.component.html'
})
export class NiopdcConfigDialogComponent implements OnInit {

    niopdcConfig: NiopdcConfig;
    transfertypes: TransferType[];
    isSaving: boolean;
    isView: boolean;

    currencies: any[] = [];
    currencyRateGroups: CurrencyRateGroup[] = [];


    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private currencyService: CurrencyService,
        private currencyRateGroupService: CurrencyRateGroupService,
        private niopdcConfigService: NiopdcConfigService,
        private transferTypeService: TransferTypeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;

        this.currencyService.query()
            .subscribe(value => {
                this.currencies = [];
                value.body.forEach((value: Currency) => {
                    const newVar = {
                        label: value.title,
                        value: value.id
                    };
                    this.currencies.push(newVar);
                });
            });

        this.currencyRateGroupService.query()
            .subscribe(value => {
                this.currencyRateGroups = value.body;
            });

        this.transferTypeService.query()
            .subscribe((res) => {
                this.transfertypes = res.body;
            });
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.niopdcConfig.id !== undefined) {
            this.subscribeToSaveResponse(
                this.niopdcConfigService.update(this.niopdcConfig));
        } else {
            this.subscribeToSaveResponse(
                this.niopdcConfigService.create(this.niopdcConfig));
        }
    }

    trackCurrencyRateGroupById(index: number, item: CurrencyRateGroup) {
        return item.id;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<NiopdcConfig>>) {
        result.subscribe((res: HttpResponse<NiopdcConfig>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: NiopdcConfig) {
        this.eventManager.broadcast({name: 'niopdcConfigListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

}

@Component({
    selector: 'jhi-niopdc-config-popup',
    template: ''
})
export class NiopdcConfigPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private niopdcConfigPopupService: NiopdcConfigPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.niopdcConfigPopupService
                    .open(NiopdcConfigDialogComponent as Component, params['id']);
            } else {
                this.niopdcConfigPopupService
                    .open(NiopdcConfigDialogComponent as Component);
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
