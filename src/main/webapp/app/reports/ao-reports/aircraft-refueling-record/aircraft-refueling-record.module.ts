import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {RouterModule} from '@angular/router';
import {aircraftRefuelingRecordRoute} from './aircraft-refueling-record.route';
import {AircraftRefuelingRecordComponent} from './aircraft-refueling-record.component';
import {AircraftRefuelingRecordService} from './aircraft-refueling-record.service';

/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot(aircraftRefuelingRecordRoute, {useHash: true})
    ],
    declarations: [
        AircraftRefuelingRecordComponent,
    ],
    entryComponents: [
        AircraftRefuelingRecordComponent,
    ],
    providers: [
        AircraftRefuelingRecordService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayAircraftRefuelingRecordModule {
}
