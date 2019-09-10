import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {Person, Personality} from './person.model';
import {PersonPopupService} from './person-popup.service';
import {PersonService} from './person.service';
import {Region, RegionService} from '../region';
import {Country, CountryService} from '../country';
import {CustomerGroup, LocationType} from '../customer-type/customer-type.model';
import {RemoteService} from '../../shared/remoteService';
import {UserService} from '../../shared';

@Component({
    selector: 'jhi-person-dialog',
    templateUrl: './person-dialog.component.html'
})
export class PersonDialogComponent implements OnInit {

    regexCode = /^[\d]{10}$/;
    person: Person;
    isSaving: boolean;
    isView: boolean;
    canInput = false;
    blocked = false;
    regions: Region[];

    country: Country = new Country();
    nationality: Country = new Country();
    countries: Country[];
    Personality = Personality;
    lastCode: String;

    minDateTime = new Date();
    maxDateTime = new Date();
    existEmail: boolean | null;
    notHaveIdCode: boolean;
    personFind: boolean;

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private personService: PersonService,
                private router: Router,
                private regionService: RegionService,
                private remoteService: RemoteService,
                private userService: UserService,
                private countryService: CountryService,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;

        this.minDateTime.setFullYear(this.minDateTime.getFullYear() - 120, 2, 22);
        this.maxDateTime.setFullYear(this.maxDateTime.getFullYear() - 18);

        this.countryService.query()
            .subscribe((res) => {
                this.countries = res.body;
                if (!this.person.id) {
                    const find = this.countries.find((value) => value.checkNationalCode);
                    if (find) {
                        this.person.nationalityId = find.id;
                        this.person.countryId = find.id;
                    }
                    this.changeNationality();
                    this.changeCountry();
                } else {
                    this.changeNationality();
                    this.changeCountry();

                }
            }, (res) => this.onError(res.message));

        this.onChangeNationalCode(!this.person.id);
    }

    checkUserExistByEmail() {
        if (this.person.email) {
            this.userService.existUserByEmail(this.person.email, null)
                .subscribe((value) => {
                    this.existEmail = value.body;
                });
        }
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.person.id !== undefined) {
            this.subscribeToSaveResponse(
                this.personService.update(this.person));
        } else {
            this.subscribeToSaveResponse(
                this.personService.create(this.person));
        }
    }

    trackBirthRegionById(index: number, item: Region) {
        return item.id;
    }

    trackCountryById(index: number, item: Country) {
        return item.id;
    }

    trackNationalityById(index: number, item: Country) {
        return item.id;
    }

    onBlurPostalCode() {
        if (this.country.checkNationalCode &&
            this.regexCode.test(this.person.postalCode)) {
            this.remoteService.getAddressByPostcode(this.person.postalCode).subscribe((value) => {
                this.person.address = value.body.address;
            }, (error1) => {
            });
        }
    }

    changeCountry() {
        if (this.countries && this.countries.length) {
            this.country = this.countries.find((value: Country) =>
                value.id === this.person.countryId
            );
            if (!this.country.checkNationalCode) {
                this.person.regionId = null;
            } else {
                this.onBlurPostalCode();
            }
        }
    }

    changeBirthday() {
        this.notHaveIdCode = !this.person.birthday || this.person.birthday > new Date(1989, 3, 21);
        if (this.notHaveIdCode) {
            this.person.idCode = '0';
        } else if (this.person.idCode === '0') {
            this.person.idCode = '';
        }
        this.onChangeBaseInfo();
    }

    changeNationality() {
        if (this.countries && this.countries.length) {
            this.nationality = this.countries.find((value: Country) =>
                value.id === this.person.nationalityId
            );
            this.regionService.queryCity(this.person.nationalityId, 0).subscribe((res) => {
                this.regions = res.body;
            });
        }
    }

    onChangeNationalCode(disable: boolean) {

        if (disable) {
            return;
        }

        if (this.person.code !== this.lastCode) {
            this.blocked = true;
            this.personService.findByCode(this.person.code).subscribe(
                (personRes) => {
                    const person = personRes.body;
                    if (person) {
                        person.sharePercent = this.person.sharePercent;
                        person.companyId = this.person.companyId;
                        this.person = person;
                        this.changeCountry();
                        this.canInput = true;
                    } else {
                        this.person.id = null;
                        this.person.name = null;
                        this.person.firstName = null;
                        this.person.lastName = null;
                        this.person.fatherName = null;
                        this.person.idCode = null;
                        this.person.telephone = null;
                        this.person.postalCode = null;
                        this.person.registerNo = null;
                        this.person.address = null;
                        this.person.birthday = null;
                        this.person.economicCode = null;
                        this.person.regionId = null;
                        this.person.countryId = null;
                        this.person.fullName = null;
                        this.canInput = true;
                    }
                    this.lastCode = this.person.code;
                    this.blocked = false;
                },
                (res) => {
                    this.onError(res.message);
                    this.lastCode = null;
                }
            );
        }
    }


    onChangeBaseInfo() {
        if (this.person.personality && this.person.code && this.nationality && this.nationality.checkNationalCode && (
            (this.person.personality === this.Personality[this.Personality.NATURAL] && this.person.birthday && this.person.idCode)
            || (this.person.personality === this.Personality[this.Personality.LEGAL] && this.person.birthday && this.person.registerNo)))

            this.personService.findByBaseInfo(this.person).subscribe(value => {
                let person1 = value.body;
                if (this.person.personality === this.Personality[this.Personality.NATURAL]) {
                    this.person.firstName = person1.firstName;
                    this.person.lastName = person1.lastName;
                    this.person.fatherName = person1.fatherName;
                    this.personFind = true;
                } else if (this.person.personality === this.Personality[this.Personality.LEGAL]){
                    this.person.name = person1.name;
                    this.person.postalCode = person1.postalCode;
                    this.person.address = person1.address;
                }
            }, error1 => {
                this.person.firstName = '';
                this.person.lastName = '';
                this.person.fatherName = '';
                this.person.name = '';
                this.person.postalCode = '';
                this.person.address = '';
                this.onError(error1.error);
                this.personFind = false;
            });

    }


    private subscribeToSaveResponse(result: Observable<HttpResponse<Person>>) {
        result.subscribe((res: HttpResponse<Person>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Person) {
        this.eventManager.broadcast({name: 'personListModification', content: 'OK'});
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
    selector: 'jhi-person-popup',
    template: ''
})
export class PersonPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private personPopupService: PersonPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.personPopupService
                    .open(PersonDialogComponent as Component, params['id'], params['companyId']);
            } else {
                this.personPopupService
                    .open(PersonDialogComponent as Component, null, params['companyId']);
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
