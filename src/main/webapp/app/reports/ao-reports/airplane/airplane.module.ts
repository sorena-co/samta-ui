import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {RouterModule} from '@angular/router';
import {airplaneRoute} from './airplane.route';
import {AirplaneComponent} from './airplane.component';
import {AirplaneService} from './airplane.service';

/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot(airplaneRoute, {useHash: true})
    ],
    declarations: [
        AirplaneComponent,
    ],
    entryComponents: [
        AirplaneComponent,
    ],
    providers: [
        AirplaneService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayAirplaneModule {
}
