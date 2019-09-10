import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {TransportContract} from './transport-contract.model';
import {TransportContractPopupService} from './transport-contract-popup.service';
import {TransportContractService} from './transport-contract.service';
import {Customer, CustomerService} from '../customer';
import {Person, PersonService} from '../person';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

@Component({
    selector: 'jhi-transport-contract-dialog',
    templateUrl: './transport-contract-dialog.component.html'
})
export class TransportContractDialogComponent implements OnInit {

    transportContract: any;
    isSaving: boolean;
    isView: boolean;

    customers: Customer[];

    people: Person[];

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private transportContractService: TransportContractService,
                private customerService: CustomerService,
                private personService: PersonService,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        console.log(this.transportContract.customerId);
        this.customerService.query()
            .subscribe((res: HttpResponse<Customer[]>) => { this.customers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.personService.query()
            .subscribe((res: HttpResponse<Person[]>) => { this.people = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.transportContract.id !== undefined) {
            this.subscribeToSaveResponse(
                this.transportContractService.update(this.transportContract));
        } else {
            this.subscribeToSaveResponse(
                this.transportContractService.create(this.transportContract));
        }
    }

    trackCustomerById(index: number, item: Customer) {
        return item.id;
    }

    trackPersonById(index: number, item: Person) {
        return item.id;
    }

    personSelected(event) {
        this.transportContract.personFullName = event.fullName;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TransportContract>>) {
        result.subscribe((res: HttpResponse<TransportContract>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TransportContract) {
        this.eventManager.broadcast({ name: 'transportContractListModification', content: 'OK'});
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
    selector: 'jhi-transport-contract-popup',
    template: ''
})
export class TransportContractPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private transportContractPopupService: TransportContractPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.transportContractPopupService
                    .open(TransportContractDialogComponent as Component, params['id']);
            } else if (params['customerId']) {
                this.transportContractPopupService
                    .open(TransportContractDialogComponent as Component, null, params['customerId']);
            } else {
                this.transportContractPopupService
                    .open(TransportContractDialogComponent as Component);
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
