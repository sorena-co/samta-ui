import {
    Component, OnInit, Input, forwardRef, ViewEncapsulation, EventEmitter, Output,
    HostListener, ElementRef
} from '@angular/core';

import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import {JhiAlertService, JhiLanguageService, JhiParseLinks} from 'ng-jhipster';
import {LazyLoadEvent} from 'primeng/components/common/api';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {PersonService} from '../../../entities/person';
import {Person} from '../../../entities/person';
import {ITEMS_PER_PAGE} from '../../';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PersonSelectorComponent),
    multi: true
};

@Component({
    selector: 'app-person-selector',
    templateUrl: 'person-selector.component.html',
    styleUrls: ['person-selector.component.css'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR/*,
     CUSTOM_INPUT_CONTROL_VALIDATOR*/],
    encapsulation: ViewEncapsulation.None

})
export class PersonSelectorComponent implements OnInit {

    @Input() companyId;

    @Input() multiSelect = false;
    @Input() disabled = false;
    @Input() widthGrid = '100%';
    @Input() selectObject = false;
    @Input() creator = false;
    @Input() onlySellContractAirplane = false;
    @Output() selectedItem = new EventEmitter();

    people: Person[];
    person: Person = new Person();
    selects: any;

    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any = 1;
    predicate: any = 'id';
    currentSearch: any = '';
    reverse = true;

    overlayVisible: boolean;

    constructor(private alertService: JhiAlertService,
                private languageService: JhiLanguageService,
                private parseLinks: JhiParseLinks,
                private personService: PersonService,
                private elementRef: ElementRef) {
        this.itemsPerPage = ITEMS_PER_PAGE;
    }

    loadAll() {
        this.personService.querySelector({
            query: this.currentSearch.length > 0 ? this.currentSearch : null,
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort(),
            onlySellContractAirplane: this.onlySellContractAirplane
        }).subscribe(
            (res: HttpResponse<Person[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    empty() {
        this.value = null;
        if (this.multiSelect) {
            this.selects = [];
        } else {
            this.selects = undefined;
        }
        this.onChange(this.value);
        this.onTouched();
        this.selectedItem.emit(this.selects);

    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.loadAll();
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.person.fullName) {
            this.currentSearch += 'fullName$' + this.person.fullName + '&';
        }
        if (this.person.code) {
            this.currentSearch += 'code$' + this.person.code + '&';
        }
        if (this.person.personality) {
            this.currentSearch += 'personality#Personality.' + this.person.personality + '&';
        }
        if (this.person.sharePercent) {
            this.currentSearch += 'sharePercent$' + this.person.sharePercent + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        this.loadAll();
    }

    ngOnInit() {
        this.onChange(this.value);
    }

    writeValue(val: any) {
        if (val !== this.value) {
            this.value = val;
        }
    }

    onChange: any = () => {
    }
    onTouched: any = () => {
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    get value() {
        if (this.selects) {
            return this.selectObject ?
                this.selects :
                (this.multiSelect) ?
                    this.selects.map((value) => value.id) :
                    this.selects.id;
        } else {
            return null;
        }
    }

    set value(val: any) {
        if (this.selectObject) {
            if (this.multiSelect && val instanceof Array) {
                this.selects = val.filter((value) => value.id);
            } else if (!this.multiSelect && val.id) {
                this.selects = val;
            } else if (this.multiSelect) {
                this.selects = [];
            } else {
                this.selects = undefined;
            }
            this.onChange(this.value);
            this.onTouched();
        } else {
            if (this.multiSelect && val instanceof Array) {
                this.selects = [];
                val.forEach((value) => {
                        if (typeof value === 'number' && this.selects.find((value_f) => value_f.id === value) == null) {
                            this.personService.find(value).subscribe(
                                (res: HttpResponse<Person>) => {
                                    if (this.selects.find((value_f) => value_f.id === value) == null) {
                                        this.selects.push(res.body);
                                        this.onChange(this.value);
                                        this.onTouched();
                                    }

                                }, (res: HttpErrorResponse) => this.onError(res.message));
                        }
                    }
                );
            } else if (!this.multiSelect && typeof val === 'number') {
                this.personService.find(val).subscribe(
                    (res: HttpResponse<Person>) => {
                        this.selects = res.body;
                        this.onChange(this.value);
                        this.onTouched();
                    }, (res: HttpErrorResponse) => this.onError(res.message));
            } else {
                this.selects = undefined;
            }
        }

    }

    onSelect(event, selected) {
        this.onChange(this.value);
        if (this.multiSelect) {
            if (selected) {
                if (this.selects.find((value) => value.id === event.data.id) == null) {
                    this.selects.push(event.data);
                }
            } else {
                this.selects = this.selects.filter((value2) => value2.id !== event.data.id);
            }
        } else {
            this.overlayVisible = false;
        }
        this.selectedItem.emit(this.selects);

    }

    showTable() {
        if (this.disabled === true) {
            return;
        }
        this.overlayVisible = !this.overlayVisible;
    }

    close() {
        this.overlayVisible = false;
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'desc' : 'asc')];
        
        return result;
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.people = data;
    }

    private onError(error) {
        console.log(error);
    }

    loadLazy(event: LazyLoadEvent) {
        this.page = (event.first / event.rows) + 1;
        this.itemsPerPage = event.rows;
        if (event.sortField) {
            this.predicate = event.sortField;
            this.reverse = event.sortOrder !== 1;
        }

        this.loadAll();
    }

    @HostListener('document:click', ['$event'])
    handleClick(event) {
        let clickedComponent = event.target;
        let inside = false;
        do {
            if (clickedComponent === this.elementRef.nativeElement) {
                inside = true;
            }
            clickedComponent = clickedComponent.parentNode;
        } while (clickedComponent);
        if (!inside) {
            this.close();
        }
    }

}
