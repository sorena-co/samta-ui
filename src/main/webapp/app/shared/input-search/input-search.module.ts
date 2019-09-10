import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {InputSearchAfterTypedDirective} from './input-search.directive';

@NgModule({
    declarations: [
        InputSearchAfterTypedDirective
    ],
    imports: [
        BrowserModule,
        FormsModule
    ],
    exports: [
        InputSearchAfterTypedDirective
    ],
    providers: []
})
export class InputSearchAfterTypedModule {
}
