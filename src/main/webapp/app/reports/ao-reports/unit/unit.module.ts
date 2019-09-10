import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {RouterModule} from '@angular/router';
import {unitRoute} from './unit.route';
import {UnitComponent} from './unit.component';
import {UnitService} from './unit.service';

/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot(unitRoute, {useHash: true})
    ],
    declarations: [
        UnitComponent,
    ],
    entryComponents: [
        UnitComponent,
    ],
    providers: [
        UnitService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayUnitModule {
}
