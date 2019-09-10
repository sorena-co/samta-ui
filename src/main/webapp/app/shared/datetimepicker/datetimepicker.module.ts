import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {DateTimeJalaliPipe} from './datetime-jalali.pipe';
import {TimeJalaliPipe} from './time-jalali.pipe';
import {DateJalaliPipe} from './date-jalali.pipe';
import {InputMaskModule} from '../input-mask/input-mask.module';

@NgModule({
    declarations: [
        DateTimeJalaliPipe,
        DateJalaliPipe,
        TimeJalaliPipe
    ],
    imports: [
        BrowserModule,
        FormsModule,
        NgbModule.forRoot(),
        InputMaskModule
    ],
    exports: [
        DateTimeJalaliPipe,
        DateJalaliPipe,
        TimeJalaliPipe
    ],
    providers: []
})
export class DateTimePickerModule {
}
