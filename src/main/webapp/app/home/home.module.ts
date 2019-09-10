import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterModule} from '@angular/router';

import {NiopdcgatewaySharedModule} from '../shared';

import {HOME_ROUTE, HomeComponent} from './';

import {InputTextareaModule} from 'primeng/primeng';

import {InputSwitchModule} from 'primeng/primeng';
import {TabViewModule} from 'primeng/primeng';
import {DataListModule} from 'primeng/primeng';
import {RTL} from '@progress/kendo-angular-l10n';

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot([HOME_ROUTE], {useHash: true}),
        InputTextareaModule,
        InputSwitchModule,
        TabViewModule,
        DataListModule
    ],
    declarations: [
        HomeComponent,
    ],
    entryComponents: [],
    providers: [{provide: RTL, useValue: true}],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayHomeModule {
}
