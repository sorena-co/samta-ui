import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {RouterModule} from '@angular/router';
import {airlineRoute} from './airline.route';
import {AirlineComponent} from './airline.component';
import {AirlineService} from './airline.service';

/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot(airlineRoute, {useHash: true})
    ],
    declarations: [
        AirlineComponent,
    ],
    entryComponents: [
        AirlineComponent,
    ],
    providers: [
        AirlineService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayAirlineModule {
}
