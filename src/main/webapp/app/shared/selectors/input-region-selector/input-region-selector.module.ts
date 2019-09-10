import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {CheckboxModule, TreeModule} from 'primeng/primeng';
import {CommonModule} from '@angular/common';
import {InputRegionSelectorComponent} from './input-region-selector.component';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        TreeModule,
        CheckboxModule,
        FormsModule
    ],
    declarations: [
        InputRegionSelectorComponent,
    ],
    entryComponents: [],
    providers: [],
    exports: [
        InputRegionSelectorComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InputRegionSelectorModule {

}
