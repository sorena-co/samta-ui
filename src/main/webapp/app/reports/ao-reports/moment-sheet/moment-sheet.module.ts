import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {RouterModule} from '@angular/router';
import {momentSheetRoute} from './moment-sheet.route';
import {MomentSheetAoComponent} from './moment-sheet-ao.component';
import {MomentSheetService} from './moment-sheet.service';
import {MomentSheetDepotComponent} from './moment-sheet-depot.component';

/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot(momentSheetRoute, {useHash: true})
    ],
    declarations: [
        MomentSheetAoComponent,
        MomentSheetDepotComponent,
    ],
    entryComponents: [
        MomentSheetAoComponent,
        MomentSheetDepotComponent,
    ],
    providers: [
        MomentSheetService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayMomentSheetModule {
}
