/**
 * Created by mehrabi-s on 15/04/2017.
 */

import {Pipe, PipeTransform} from '@angular/core';
import {NgbCalendarPersian} from 'ng2-datepicker-jalali/persian/ngb-calendar-persian';
@Pipe({
    name: 'dateTimeJalali'
})
export class DateTimeJalaliPipe implements PipeTransform {

    transform(value: any, ...args: any[]): any {
        if (value) {
                value = new Date(value);
            if (value) {
                const da = new NgbCalendarPersian().fromGregorian(value);
                return  `${da.year}/${this.pad(da.month, 2)}/${this.pad(da.day, 2)} ${value.getHours()}:${value.getMinutes()}`;
            }
        }
        return '';

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

}
