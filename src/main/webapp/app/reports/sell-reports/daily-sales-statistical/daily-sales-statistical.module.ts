import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {RouterModule} from '@angular/router';
import {dailySalesStatisticalRoute} from './daily-sales-statistical.route';
import {DailySalesStatisticalComponent} from './daily-sales-statistical.component';
import {DailySalesStatisticalService} from './daily-sales-statistical.service';

/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot(dailySalesStatisticalRoute, {useHash: true})
    ],
    declarations: [
        DailySalesStatisticalComponent,
    ],
    entryComponents: [
        DailySalesStatisticalComponent,
    ],
    providers: [
        DailySalesStatisticalService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayDailySalesStatisticalModule {
}
