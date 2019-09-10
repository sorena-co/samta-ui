import {Component, NgModule, Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'sortBy'})

export class SortByPipe {

    transform(array: Array<string>, args: string): Array<string> {
        if (array !== undefined) {
            array.sort((a: any, b: any) => {
                if (a[args] < b[args]) {
                    return -1;
                } else if (a[args] > b[args]) {
                    return 1;
                } else {
                    return 0;
                }
            });
        }
        return array;
    }
}
