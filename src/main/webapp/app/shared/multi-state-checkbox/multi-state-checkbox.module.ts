import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {MultiStateCheckboxComponent} from './multi-state-checkbox.component';
import {TreeModule} from 'primeng/primeng';
import { CommonModule } from '@angular/common';
import {CheckboxModule} from 'primeng/primeng';

@NgModule({
    imports: [
        CommonModule,
        TreeModule,
        CheckboxModule
    ],
    declarations: [
        MultiStateCheckboxComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    exports: [
        MultiStateCheckboxComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MultiStateCheckboxModule {

}
