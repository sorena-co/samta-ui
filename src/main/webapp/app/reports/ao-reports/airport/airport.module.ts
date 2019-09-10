import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {RouterModule} from '@angular/router';
import {airportRoute} from './airport.route';
import {AirportComponent} from './airport.component';
import {AirportService} from './airport.service';

/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot(airportRoute, {useHash: true})
    ],
    declarations: [
        AirportComponent,
    ],
    entryComponents: [
        AirportComponent,
    ],
    providers: [
        AirportService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayAirportModule {
}
