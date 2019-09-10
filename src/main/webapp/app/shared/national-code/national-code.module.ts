import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NationalCodeDirective} from './national-code.directive';

@NgModule({
    declarations: [
        NationalCodeDirective
    ],
    imports: [
        BrowserModule,
        FormsModule
    ],
    exports: [
        NationalCodeDirective
    ],
    providers: []
})
export class NationalCodeModule {
}
