import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {InputMaskDirective} from './input-mask.directive';

@NgModule({
    declarations: [
        InputMaskDirective

    ],
    imports: [
        BrowserModule,
        FormsModule
    ],
    exports: [
        InputMaskDirective
    ],
    providers: []
})
export class InputMaskModule {
}
