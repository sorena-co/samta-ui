import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {ContractType, SellContract} from './sell-contract.model';
import {SellContractService} from './sell-contract.service';
import {Customer, CustomerService} from '../customer';
import {Product, ProductService} from '../product';
import {SellContractPerson} from '../sell-contract-person';
import {ConsumptionService} from '../consumption';
import {TranslateService} from '@ngx-translate/core';
import {SellContractCustomer} from '../sell-contract-customer';
import {Person, PersonService} from '../person';

@Component({
    selector: 'jhi-sell-contract-dialog',
    templateUrl: './sell-contract-dialog.component.html'
})
export class SellContractDialogComponent implements OnInit {

    customerIds;
    sellContract: SellContract = new SellContract();
    sellContractPerson: SellContractPerson = new SellContractPerson();
    sellContractCustomer: SellContractCustomer = new SellContractCustomer();
    isSaving: boolean;
    isView: boolean;
    sellContractPeopleEdit: boolean;
    sellContractCustomerEdit: boolean;
    personExists: boolean;
    sharePercentMax: boolean;
    personCreate: boolean;
    customerExists: boolean;
    customerCreate: boolean;

    customers: Customer[];
    mapSiteItems: any[];

    firstLocation: any;
    customerLevel: number;
    contractTypes: ContractType[] | null;
    ContractType = ContractType;
    customerId: number;
    personId: number;
    activeCustomer: boolean = true;
    defaultCustomer: Customer;
    defaultPerson: Person;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private alertService: JhiAlertService,
                private sellContractService: SellContractService,
                private customerService: CustomerService,
                private personService: PersonService,
                private eventManager: JhiEventManager,
                private consumptionService: ConsumptionService,
                private productService: ProductService,
                private translateService: TranslateService) {
        this.customerId = route.snapshot.queryParams['customer'] ? +route.snapshot.queryParams['customer'] : null;
        this.personId = route.snapshot.queryParams['person'] ? +route.snapshot.queryParams['person'] : null;
        console.log(this.customerId);
    }

    ngOnInit() {
        this.isSaving = false;
        this.route.params.subscribe((params) => {
            this.route.data.subscribe((data) => {
                this.isView = !!data['isView'];
            });
            if (params['id']) {
                this.sellContractService.find(params['id']).subscribe((sellContract) => {
                    this.sellContract = sellContract.body;
                    this.sellContract.finishDateServer = this.sellContract.finishDate;
                    this.setBreadCrumb();
                });
            } else {
                this.sellContract = new SellContract();
                this.sellContract.sellContractPeople = [];
                this.sellContract.sellContractCustomers = [];
                this.sellContract.startDate = new Date();
                this.sellContract.finishDate = new Date();
                this.sellContract.finishDate.setFullYear(this.sellContract.finishDate.getFullYear() + 1);
                this.sellContract.exportationDate = new Date();
                this.setBreadCrumb();
            }
        });

        this.sellContractService.queryTypes()
            .subscribe((res: HttpResponse<ContractType[]>) => {
                this.contractTypes = res.body;
            });
    }

    setBreadCrumb() {
        this.mapSiteItems = [];
        this.translateService.get('global.menu.home').subscribe((title) => {
            this.mapSiteItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('samtagatewayApp.sellContract.home.title').subscribe((title) => {
            //todo fix router
            this.mapSiteItems.push({label: title, routerLink: ['/sell-contract'], queryParams: {customer:this.customerId,person:this.personId}});
        });
        if (this.sellContract && this.sellContract.id) {
            this.translateService.get('samtagatewayApp.sellContract.home.editLabel').subscribe((title) => {
                this.mapSiteItems.push({label: title});
            });
        } else {
            this.translateService.get('samtagatewayApp.sellContract.home.createLabel').subscribe((title) => {
                this.mapSiteItems.push({label: title});
            });
        }
    }

    clear() {
        this.router.navigate(['/sell-contract']);

        // this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.sellContract.id !== undefined) {
            this.subscribeToSaveResponse(
                this.sellContractService.update(this.sellContract));
        } else {
            this.subscribeToSaveResponse(
                this.sellContractService.create(this.sellContract));
        }
    }

    personSelected(event) {
        this.sellContractPerson.personFullName = event.fullName;
        this.sellContractPerson.creditAccount = event.creditAccount;
        this.sellContractPerson.costAccount = event.costAccount;
    }

    newSellContractPerson() {
        this.customerIds = [];
        this.sellContractPerson = new SellContractPerson();
        this.personCreate = true;
        if (this.sellContract.sellContractPeople.length > 0) {
            let amount = 0;
            this.sellContract.sellContractPeople.forEach((value) => amount += Number(value.sharePercent));
            this.sellContractPerson.sharePercent = 100 - amount;
        } else {
            this.sellContractPerson.sharePercent = 100;
        }
        if (this.personId) {
            this.sellContractPerson.personId = this.personId;
            if (this.defaultPerson)
                this.sellContractPerson.personFullName = this.defaultPerson.fullName;
            else
                this.personService.find(this.personId).subscribe(value => {
                    this.defaultPerson = value.body;
                    this.sellContractPerson.personFullName = value.body.fullName;
                });
        }
        this.sellContractPeopleEdit = false;
    }

    addSellContractPerson() {
        this.personExists = false;
        this.sharePercentMax = false;
        const find = this.sellContract.sellContractPeople.find((value) => value.personId === this.sellContractPerson.personId);
        if (!this.sellContractPeopleEdit && find) {
            this.personExists = true;
        } else if (this.sellContract.sellContractPeople && this.sellContract.sellContractPeople.length > 0 &&
            (+this.sellContract.sellContractPeople.map((value) => value.sharePercent)
                    .reduce((sum, current) => +sum + +current) + (+this.sellContractPerson.sharePercent) +
                (this.sellContractPeopleEdit ? find.sharePercent * -1 : 0)
            ) > 100) {
            this.sharePercentMax = true;
        } else {
            if (this.sellContractPeopleEdit) {
                find.sharePercent = +this.sellContractPerson.sharePercent;
            } else {
                this.sellContract.sellContractPeople.push(this.sellContractPerson);
            }
            this.personCreate = false;
            this.sellContractPeopleEdit = false;
        }
    }

    removePerson(personId) {
        this.sellContract.sellContractPeople.splice(this.sellContract.sellContractPeople.findIndex((value) => value.personId === personId), 1);
    }

    editPerson(personId) {
        this.sellContractPeopleEdit = true;
        const find = this.sellContract.sellContractPeople.find((value) => value.personId === personId);
        this.sellContractPerson = new SellContractPerson();
        this.sellContractPerson.sharePercent = find.sharePercent;
        this.sellContractPerson.creditAccount = find.creditAccount;
        this.sellContractPerson.id = find.id;
        this.sellContractPerson.personId = find.personId;
        this.sellContractPerson.personFullName = find.personFullName;
        this.sellContractPerson.sellContractId = find.sellContractId;
    }

    cancelPerson() {
        this.personCreate = false;
        this.sellContractPeopleEdit = false;
    }

    customerSelected(event) {
        if (event != null) {
            this.sellContractCustomer.customerName = event.name;
            this.customerLevel = Math.max(event.locations.map((value) => value.level));
            this.customerIds = [event.id];
            this.sellContractCustomer.creditAccount = event.creditAccount;
        } else {
            this.customerIds = [];
        }
    }

    locationLoadFull(event) {
        this.firstLocation = event.filter((option) => option.level === 0);
        if (this.firstLocation && this.firstLocation.length > 0) {
            this.firstLocation = this.firstLocation[0];
        } else {
            this.firstLocation = null;
        }
    }

    locationSelected(event) {
        if (event) {
            this.sellContractCustomer.locationName = event.label;
        }
    }

    newSellContractCustomer() {
        this.sellContractCustomer = new SellContractCustomer();
        this.sellContractCustomer.startDate = this.sellContract.startDate;
        this.sellContractCustomer.finishDate = this.sellContract.finishDate;
        if (this.customerId) {
            this.sellContractCustomer.customerId = this.customerId;
            if (this.defaultCustomer) this.sellContractCustomer.customerName = this.defaultCustomer.name;
            else this.customerService.find(this.customerId).subscribe(value => {
                this.defaultCustomer = value.body;
                this.sellContractCustomer.customerName = value.body.name;
            });
        }
        this.customerIds = [];
        this.customerCreate = true;
        this.sellContractCustomerEdit = false;
    }

    addSellContractCustomer() {
        this.customerExists = false;
        const find = this.sellContract.sellContractCustomers.find((value) => value.customerId === this.sellContractCustomer.customerId);
        if (!this.sellContractCustomerEdit && find) {
            this.customerExists = true;
        } else {

            if (this.sellContractCustomerEdit) {
                find.locationName = this.sellContractCustomer.locationName;
                find.locationId = this.sellContractCustomer.locationId;
                find.hasTransport = this.sellContractCustomer.hasTransport;
                find.startDate = this.sellContractCustomer.startDate;
                find.finishDate = this.sellContractCustomer.finishDate;
            } else {
                this.sellContract.sellContractCustomers.push(this.sellContractCustomer);
            }
            this.customerExists = false;
            this.customerCreate = false;
            this.sellContractCustomerEdit = false;

        }
    }

    removeCustomer(customerId) {
        this.sellContract.sellContractCustomers.splice(this.sellContract.sellContractCustomers.findIndex((value) => value.customerId === customerId), 1);
    }

    editCustomer(customerId) {
        this.sellContractCustomerEdit = true;
        const find = this.sellContract.sellContractCustomers.find((value) => value.customerId === customerId);
        this.sellContractCustomer = new SellContractCustomer();
        this.sellContractCustomer.locationId = find.locationId;
        this.sellContractCustomer.locationName = find.locationName;
        this.sellContractCustomer.id = find.id;
        this.sellContractCustomer.customerId = find.customerId;
        this.sellContractCustomer.customerName = find.customerName;
        this.sellContractCustomer.sellContractId = find.sellContractId;
        this.sellContractCustomer.hasTransport = find.hasTransport;
        this.sellContractCustomer.startDate = find.startDate;
        this.sellContractCustomer.finishDate = find.finishDate;
        this.sellContractCustomer.active = find.active;
    }

    cancelCustomer() {
        this.customerCreate = false;
        this.sellContractCustomerEdit = false;
    }

    trackProductById(index: number, item: Product) {
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

    onChangeCustomer(customerId) {
        let ids = [];
        ids.push(customerId);
        this.customerService.checkActiveCustomer(ids)
            .subscribe(value => {
                this.activeCustomer = value.body;
            });
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SellContract>>) {
        result.subscribe((res: HttpResponse<SellContract>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SellContract) {
        this.eventManager.broadcast({name: 'sellContractListModification', content: 'OK'});
        this.isSaving = false;
        this.router.navigate(['/sell-contract']);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.alertService.error(error.message, null, null);
    }

    /*    onSelectedItemCustomers(event: Customer[]) {
            this.sellContract.customers = [];
            console.log(event);
            event.forEach((value, index, array) => {
                if (this.sellContract.customers == null ||
                    this.sellContract.customers.length <= 0 ||
                    this.sellContract.customers.find((id) => id.id == value.id) == null) {
                    this.sellContract.customers.push(value);
                }
            });
            console.log(this.customerIds);
        }*/
}
