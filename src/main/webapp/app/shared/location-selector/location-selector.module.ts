import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { LocationSelectorComponent } from './location-selector.component';
import { TreeModule } from 'primeng/primeng';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/primeng';

@NgModule({
    imports: [
        CommonModule,
        TreeModule,
        CheckboxModule
    ],
    declarations: [
        LocationSelectorComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    exports: [
        LocationSelectorComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LocationSelectorModule {

}
