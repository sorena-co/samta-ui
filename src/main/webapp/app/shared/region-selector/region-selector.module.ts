import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {RegionSelectorComponent} from './region-selector.component';
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
        RegionSelectorComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    exports: [
        RegionSelectorComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RegionSelectorModule {

}
