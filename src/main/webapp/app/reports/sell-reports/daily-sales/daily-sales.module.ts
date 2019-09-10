import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {RouterModule} from '@angular/router';
import {dailySalesRoute} from './daily-sales.route';
import {DailySalesComponent} from './daily-sales.component';
import {DailySalesService} from './daily-sales.service';

/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot(dailySalesRoute, {useHash: true})
    ],
    declarations: [
        DailySalesComponent,
    ],
    entryComponents: [
        DailySalesComponent,
    ],
    providers: [
        DailySalesService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayDailySalesModule {
}
