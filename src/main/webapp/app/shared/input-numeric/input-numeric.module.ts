import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {InputNumericDirective} from './input-numeric.directive';

@NgModule({
    declarations: [
        InputNumericDirective

    ],
    imports: [
        BrowserModule,
        FormsModule
    ],
    exports: [
        InputNumericDirective
    ]

})
export class InputNumericModule {
}
