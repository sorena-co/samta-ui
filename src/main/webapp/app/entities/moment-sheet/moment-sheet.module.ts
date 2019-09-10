import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {MomentSheetComponent, momentSheetRoute, MomentSheetService, MomentSheetsResolvePagingParams} from './';
import {NiopdcgatewaySharedModule} from '../../shared/shared.module';
// import { JoditAngularModule } from 'jodit-angular';

const ENTITY_STATES = [
    ...momentSheetRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, {useHash: true})
    ],
    declarations: [
        MomentSheetComponent,
    ],
    entryComponents: [
        MomentSheetComponent,
    ],
    providers: [
        MomentSheetService,
        MomentSheetsResolvePagingParams
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayMomentSheetModule {
}
