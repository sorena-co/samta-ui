import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'truncate'
})

export class TruncatePipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        if (value) {
            let size = parseInt(args[0]);
            if (!size) {
                size = 10;
            }
            let s1 = value.slice(0, size);
            let s2 = value.slice(size, value.length);
            let i = s2.indexOf(',');
            let s3;
            if (i !== -1) {
                s3 = s2.slice(0, i);
            } else {
                s3 = s2;
            }
            let temp = s1 + s3;
            let arr = temp.split(',');
            let result = '';
            let tempArr = [];

            if (arr.length > 1) {
                tempArr = arr.slice(0, arr.length - 1);
            } else if (arr.length === 1) {
                tempArr = arr;
            }

            for (let i = 0; i < tempArr.length; i++) {
                if (i === 0) {
                    result += tempArr[i];
                } else {
                    result += ',' + tempArr[i];
                }
            }
            if (arr.length > 1) {
                result += '...';
            }

            return result;
        }
    }

}
