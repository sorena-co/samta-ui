import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {RouterModule} from '@angular/router';
import {totalSellRoute} from './total-sell.route';
import {TotalSellComponent} from './total-sell.component';
import {TotalSellService} from './total-sell.service';

/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot(totalSellRoute, {useHash: true})
    ],
    declarations: [
        TotalSellComponent,
    ],
    entryComponents: [
        TotalSellComponent,
    ],
    providers: [
        TotalSellService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayTotalSellModule {
}
