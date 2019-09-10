import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {RouterModule} from '@angular/router';
import {totalSellGroundRoute} from './total-sell-ground.route';
import {TotalSellGroundComponent} from './total-sell-ground.component';
import {TotalSellGroundService} from './total-sell-ground.service';

/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot(totalSellGroundRoute, {useHash: true})
    ],
    declarations: [
        TotalSellGroundComponent,
    ],
    entryComponents: [
        TotalSellGroundComponent,
    ],
    providers: [
        TotalSellGroundService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayTotalSellGroundModule {
}
