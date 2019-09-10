import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {RouterModule} from '@angular/router';
import {consumptionRoute} from './consumption.route';
import {ConsumptionComponent} from './consumption.component';
import {ConsumptionService} from './consumption.service';

/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot(consumptionRoute, {useHash: true})
    ],
    declarations: [
        ConsumptionComponent,
    ],
    entryComponents: [
        ConsumptionComponent,
    ],
    providers: [
        ConsumptionService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayConsumptionModule {
}
