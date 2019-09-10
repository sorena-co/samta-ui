import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {EqualsInputValidationDirective} from './equals-input-validation.directive';

@NgModule({
    declarations: [
        EqualsInputValidationDirective
    ],
    imports: [
        BrowserModule,
        FormsModule
    ],
    exports: [
        EqualsInputValidationDirective
    ],
    providers: []
})
export class EqualsInputValidationModule {
}
