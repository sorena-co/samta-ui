import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SellContractPerson } from './sell-contract-person.model';
import { SellContractPersonPopupService } from './sell-contract-person-popup.service';
import { SellContractPersonService } from './sell-contract-person.service';
import { SellContract, SellContractService } from '../sell-contract';
import { Person, PersonService } from '../person';

@Component({
    selector: 'jhi-sell-contract-person-dialog',
    templateUrl: './sell-contract-person-dialog.component.html'
})
export class SellContractPersonDialogComponent implements OnInit {

    sellContractPerson: SellContractPerson;
    isSaving: boolean;
    isView: boolean;

    sellcontracts: SellContract[];

    people: Person[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private sellContractPersonService: SellContractPersonService,
        private sellContractService: SellContractService,
        private personService: PersonService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.sellContractService.query()
            .subscribe((res: HttpResponse<SellContract[]>) => { this.sellcontracts = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.personService.query()
            .subscribe((res: HttpResponse<Person[]>) => { this.people = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.sellContractPerson.id !== undefined) {
            this.subscribeToSaveResponse(
                this.sellContractPersonService.update(this.sellContractPerson));
        } else {
            this.subscribeToSaveResponse(
                this.sellContractPersonService.create(this.sellContractPerson));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SellContractPerson>>) {
        result.subscribe((res: HttpResponse<SellContractPerson>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SellContractPerson) {
        this.eventManager.broadcast({ name: 'sellContractPersonListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackSellContractById(index: number, item: SellContract) {
        return item.id;
    }

    trackPersonById(index: number, item: Person) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-sell-contract-person-popup',
    template: ''
})
export class SellContractPersonPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sellContractPersonPopupService: SellContractPersonPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            View.isView = !!params['view'];
            if ( params['id'] ) {
                this.sellContractPersonPopupService
                    .open(SellContractPersonDialogComponent as Component, params['id']);
            } else if ( params['sellContractId'] ) {
                this.sellContractPersonPopupService
                    .open(SellContractPersonDialogComponent as Component, null, params['sellContractId']);
            } else console.log('not be');
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
class View {
    static isView: boolean;
}
