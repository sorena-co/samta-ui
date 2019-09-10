import {
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostListener,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import {ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator} from '@angular/forms';
import {NgbCalendar, NgbDatepickerConfig, NgbDatepickerI18n} from '@ng-bootstrap/ng-bootstrap';
import {NgbDatepickerI18nPersian} from 'ng2-datepicker-jalali/persian/ngb-datepicker-i18n-persian';
import {NgbCalendarPersian} from 'ng2-datepicker-jalali/persian/ngb-calendar-persian';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import {NgbTime} from '@ng-bootstrap/ng-bootstrap/timepicker/ngb-time';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatetimepickerComponent),
    multi: true
};

export const CUSTOM_INPUT_CONTROL_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => DatetimepickerComponent),
    multi: true
};

@Component({
    selector: 'ng2-datetimepicker',
    templateUrl: './datetimepicker.component.html',
    styleUrls: ['./datetimepicker.component.css'],
    providers: [
        NgbDatepickerConfig,
        {provide: NgbCalendar, useClass: NgbCalendarPersian},
        {provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian},
        CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR,
        CUSTOM_INPUT_CONTROL_VALIDATOR
    ]
    , encapsulation: ViewEncapsulation.None
})
export class DatetimepickerComponent implements OnInit, OnChanges, ControlValueAccessor, Validator {

    @Output() OnPersianFormat = new EventEmitter();
    @Output() onChangeDateTime = new EventEmitter();
    @Input('disableTime') disableTime = false;
    @Input() maxDateTime;
    @Input() minDateTime;
    @Input() displayMonths = 1;

    @Input() disabled: boolean;
    @Input() required = false;

    @Input() overlayVisible: boolean;
    @Input() dir: 'ltr' | 'rtl';
    @Input() rtlActive = false;

    @Input() time;

    _dateTimeFormat = '';
    _date;
    _time;
    _value: Date;
    _lastValue;

    _panelClick: boolean;

    maxDate: NgbDate;
    minDate: NgbDate;
    minTime: NgbTime;
    maxTime: NgbTime;

    constructor(private elementRef: ElementRef,
                private config: NgbDatepickerConfig) {
        const date = new NgbCalendarPersian().fromGregorian(new Date());
        config.minDate = {year: 1290, month: 1, day: 1};
        config.maxDate = {year: date.year + 50, month: 12, day: 30};

    }

    ngOnInit() {
        this._panelClick = false;

        if (!(this.dir === 'rtl' || this.dir === 'ltr')) {
            let parent = this.elementRef.nativeElement.parentElement;
            while (parent && !(this.dir === 'rtl' || this.dir === 'ltr')) {
                this.dir = parent.dir;
                parent = parent.parentElement;
            }
            if (!(this.dir === 'rtl' || this.dir === 'ltr')) {
                this.dir = 'rtl';
            }
        }
        if (this.required !== false) {
            this.required = true;
        }

    }

    ngOnChanges(changes: SimpleChanges): void {
        this.canChange();
        if (changes.minDateTime) {
            if (this.minDateTime) {
                this.minDate = new NgbCalendarPersian().fromGregorian(this.minDateTime);
                this.minTime = new NgbTime(this.minDateTime.getHours(), this.minDateTime.getMinutes(), this.minDateTime.getSeconds());
                this.config.minDate = this.minDate;
                console.log('minDate:', this.minDate);
            }
        }
        if (changes.maxDateTime) {
            if (this.maxDateTime) {
                this.maxDate = new NgbCalendarPersian().fromGregorian(this.maxDateTime);
                this.maxTime = new NgbTime(this.maxDateTime.getHours(), this.maxDateTime.getMinutes(), this.maxDateTime.getSeconds());
                this.config.maxDate = this.maxDate;
                console.log('maxDate:', this.maxDate);

            }
        }
    }

    changedTime() {
        if (this._time) {
            this.canChange();
        }
    }

    changedDate() {
        if (this._date) {
            this.canChange();
        }
    }

    selectToday(dp) {
        dp.navigateTo();
        const now: NgbDate = new NgbCalendarPersian().fromGregorian(new Date());
        this._date = {year: now.year, month: now.month, day: now.day};
    }

    clear() {
        this._date = null;
        this._time = null;
        this._dateTimeFormat = '';
        this.canChange();
    }

    getValue(): Date {
        this.applyTextInput();
        if (this._date) {
            const date: Date = new NgbCalendarPersian().toGregorian(this._date);

            console.log('this.time', this.time);
            let times = null;
            if (this.time) {
                times = this.time.split(/:/);
                if (times.length > 3 ||
                    (times.length > 0 && +times[0] > 23 || +times[0] < 0) ||
                    (times.length > 1 && +times[1] > 59 || +times[1] < 0) ||
                    (times.length > 2 && +times[2] > 59 || +times[2] < 0)) {
                    this.time = null;
                }
            }

            if (this.time && this.disableTime) {
                this._time = new NgbTime(
                    times.length > 0 ? +times[0] : 0,
                    times.length > 1 ? +times[1] : 0,
                    times.length > 2 ? +times[2] : 0);
            }

            if (this.disableTime && !this._time) {
                this._time = new NgbTime(0, 0, 0);
            }

            if (this._time) {
                date.setHours(this._time.hour);
                date.setMinutes(this._time.minute);
                date.setSeconds(this._time.second);

                this.OnPersianFormat.emit(this._date.year + '/' + this._date.month + '/' + this._date.day +
                    ((this.disableTime) ? '' : ' ' + this._time.hour + ':' + this._time.minute));
                return date;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    applyTextInput() {
        if (this._date) {
            if (this.disableTime) {
                this._dateTimeFormat = `${this.pad(this._date.year, 4)}/${this.pad(this._date.month, 2)}/${this.pad(this._date.day, 2)}`;
            } else if (this._time) {
                this._dateTimeFormat = `${this.pad(this._date.year, 4)}/${this.pad(this._date.month, 2)}/${this.pad(this._date.day, 2)}`
                    + ' ' + `${this.pad(this._time.hour, 2)}:${this.pad(this._time.minute, 2)}`;
            }
        }
    }

    pad(str: number | any, max) {
        str = str.toString();
        let i: number;
        let strR = '';
        for (i = 0; i < max - str.length; i++) {
            strR += '0';
        }

        return strR + str;
    }

    inputBlur() {
        if (this._dateTimeFormat) {
            const datetime: string[] = this._dateTimeFormat.replace(/\s/gi, ' ').split(' ');
            if ((this.disableTime && datetime.length === 1) || datetime.length === 2) {
                const date: string[] = datetime[0].split('/');
                if (date.length === 3 &&
                    +date[0] && +date[0] > 0 && +date[0] < 9999 &&
                    +date[1] && +date[1] > 0 && +date[1] <= 12 &&
                    +date[2] && +date[2] > 0 && +date[2] <= 31
                ) {
                    if (this.disableTime) {
                        this._time = new NgbTime(0, 0, 0);
                        this._date = new NgbDate(+date[0], +date[1], +date[2]);
                    } else if (datetime.length > 1) {
                        const time: string[] = datetime[1].split(':');
                        if (time.length === 2 &&
                            +time[0] != null && +time[0] > -1 && +time[0] < 24 &&
                            +time[1] != null && +time[1] > -1 && +time[1] < 60
                        ) {
                            this._time = new NgbTime(+time[0], +time[1], 0);
                            this._date = new NgbDate(+date[0], +date[1], +date[2]);
                        } else {
                            this._time = null;
                        }
                    }
                } else {
                    this._date = null;
                    this._time = null;
                }
            } else {
                this._date = null;
                this._time = null;
            }
        } else {
            this._date = null;
            this._time = null;
        }
        this.onChange(this.getValue());
    }

    getValidDate() {
        if (this._date && (this.minDateTime || this.maxDateTime)) {
            if (this.minDate &&
                (this.minDate.year > this._date.year ||
                    (this.minDate.year === this._date.year && this.minDate.month > this._date.month) ||
                    (this.minDate.year === this._date.year && this.minDate.month === this._date.month &&
                        this.minDate.day > this._date.day))) {
                return false;
            } else if (this.maxDate &&
                (this.maxDate.year < this._date.year ||
                    (this.maxDate.year === this._date.year && this.maxDate.month < this._date.month) ||
                    (this.maxDate.year === this._date.year && this.maxDate.month === this._date.month &&
                        this.maxDate.day < this._date.day))) {
                return false;
            }
        }
        return true;
    }

    getValidTime() {
        if (this.disableTime === true) {
            return true;
        }

        if (this.getValidDate() && this._time && this._date && (this.minDateTime || this.maxDateTime)) {

            if (this.minDateTime &&
                this.minDate &&
                this.minTime) {

                if (this.minDate.year === this._date.year &&
                    this.minDate.month === this._date.month &&
                    this.minDate.day === this._date.day) {

                    if (this.minTime.hour > this._time.hour || (
                        this.minTime.hour === this._time.hour &&
                        this.minTime.minute >= this._time.minute
                    )) {
                        return false;
                    }
                }
            }

            if (this.maxDateTime && this.maxDate && this.maxTime) {
                if (this.maxDate.year === this._date.year &&
                    this.maxDate.month === this._date.month &&
                    this.maxDate.day === this._date.day) {

                    if (this.maxTime.hour < this._time.hour || (
                        this.maxTime.hour === this._time.hour &&
                        this.maxTime.minute <= this._time.minute)) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    canChange() {
        const value = this.getValue();
        if (this._lastValue !== value) {
            this._lastValue = value;
            this.onChange(value);
            this.onChangeDateTime.emit(this.getValue());

            if (this.disableTime) {
                this.hide();
            }
        }
    }

    onChange: any = () => {
    }
    onTouched: any = () => {
    }

    writeValue(val: any) {
        if (!val) {
            this.clear();

        } else if (val !== this.getValue()) {
            this._value = new Date(val);
            if (this._value && val) {
                this._date = new NgbCalendarPersian().fromGregorian(this._value);
                this._time = new NgbTime(this._value.getHours(), this._value.getMinutes(), 0);
            }
            this.applyTextInput();
        }
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    validate() {
        const err = {
            rangeError: {
                dateTime: this.getValue(),
                max: this.maxDateTime,
                min: this.maxDateTime
            }
        };

        // todo check it
        return null; // (this.required && this._dateTimeFormat) || !this.getValidTime() || !this.getValidDate() ? null : err;
    }

    onMouseClick(datePicker) {
        if (this.disabled) {
            return;
        }

        if (!this._panelClick) {
            if (this.overlayVisible) {
                this.hide();
            } else {
                this.show();
                if (this._date) {
                    datePicker.navigateTo({year: this._date.year, month: this._date.month});
                }
            }
        }
    }

    show() {
        this.overlayVisible = true;
    }

    hide() {
        this.overlayVisible = false;
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
            if (this.disableTime || (!this.disableTime && !this._panelClick)) {
                this.hide();
            }
        }
        this._panelClick = false;
    }
}
