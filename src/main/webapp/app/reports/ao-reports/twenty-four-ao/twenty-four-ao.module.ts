import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {RouterModule} from '@angular/router';
import {twentyFourAoRoute} from './twenty-four-ao.route';
import {TwentyFourAoComponent} from './twenty-four-ao.component';
import {TwentyFourAoService} from './twenty-four-ao.service';

/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot(twentyFourAoRoute, {useHash: true})
    ],
    declarations: [
        TwentyFourAoComponent,
    ],
    entryComponents: [
        TwentyFourAoComponent,
    ],
    providers: [
        TwentyFourAoService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayTwentyFourAoModule {
}
