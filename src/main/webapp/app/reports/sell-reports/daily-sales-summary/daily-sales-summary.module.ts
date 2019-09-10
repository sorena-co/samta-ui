import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {RouterModule} from '@angular/router';
import {dailySalesSummaryRoute} from './daily-sales-summary.route';
import {DailySalesSummaryComponent} from './daily-sales-summary.component';
import {DailySalesSummaryService} from './daily-sales-summary.service';

/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot(dailySalesSummaryRoute, {useHash: true})
    ],
    declarations: [
        DailySalesSummaryComponent,
    ],
    entryComponents: [
        DailySalesSummaryComponent,
    ],
    providers: [
        DailySalesSummaryService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayDailySalesSummaryModule {
}
