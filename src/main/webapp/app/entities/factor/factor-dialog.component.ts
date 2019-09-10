import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {Factor} from './factor.model';
import {FactorPopupService} from './factor-popup.service';
import {FactorService} from './factor.service';
import {SellContractPerson, SellContractPersonService} from '../sell-contract-person';

@Component({
    selector: 'jhi-factor-dialog',
    templateUrl: './factor-dialog.component.html'
})
export class FactorDialogComponent implements OnInit {

    factor: Factor;
    isSaving: boolean;
    isView: boolean;
    sellContractPersons: SellContractPerson[];


    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private factorService: FactorService,
        private sellContractPersonService: SellContractPersonService,
        private eventManager: JhiEventManager
    ) {
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
        if (this.factor.id !== undefined) {
            this.subscribeToSaveResponse(
                this.factorService.update(this.factor));
        } else {
            this.subscribeToSaveResponse(
                this.factorService.create(this.factor));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Factor>>) {
        result.subscribe((res: HttpResponse<Factor>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Factor) {
        this.eventManager.broadcast({name: 'factorListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    onChangeStartDate(data) {
        if (data) {
            this.factor.startDate = data;
            if (this.factor.finishDate) {
                this.sellContractPersonService.queryByTime(this.factor.startDate, this.factor.finishDate)
                    .subscribe(value => {
                        this.sellContractPersons = value.body;
                    });
            }
        }
    }

    onChangeFinishDate(data) {
        if (data) {
            this.factor.finishDate = data;
            if (this.factor.startDate) {
                this.sellContractPersonService.queryByTime(this.factor.startDate, this.factor.finishDate)
                    .subscribe(value => this.sellContractPersons = value.body);
            }
        }
    }

    changePerson(data) {
        this.factor.sellContractPersonId = data;
        this.factor.personId = this.sellContractPersons.find(value => {
            return value.id === data;
        }).personId;
    }
}

@Component({
    selector: 'jhi-factor-popup',
    template: ''
})
export class FactorPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private factorPopupService: FactorPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.factorPopupService
                    .open(FactorDialogComponent as Component, params['id']);
            } else {
                this.factorPopupService
                    .open(FactorDialogComponent as Component);
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
