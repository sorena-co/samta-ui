import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {TreeModule, SharedModule, AccordionModule, TriStateCheckboxModule} from 'primeng/primeng';
import {CommonModule} from '@angular/common';
import {CheckboxModule} from 'primeng/primeng';
import {AuthoritySelectorComponent} from './authority-selector.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MultiStateCheckboxModule} from '../multi-state-checkbox/multi-state-checkbox.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AccordionModule,
        SharedModule,
        TriStateCheckboxModule,
        CheckboxModule,
        TreeModule,
        MultiStateCheckboxModule,
        BrowserAnimationsModule
    ],
    declarations: [
        AuthoritySelectorComponent,
    ],
    entryComponents: [],
    providers: [
    ],
    exports: [
        AuthoritySelectorComponent,
        BrowserAnimationsModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthoritySelectorModule {

}
