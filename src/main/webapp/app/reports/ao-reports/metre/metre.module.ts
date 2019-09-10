import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {RouterModule} from '@angular/router';
import {metreRoute} from './metre.route';
import {MetreComponent} from './metre.component';
import {MetreService} from './metre.service';

/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot(metreRoute, {useHash: true})
    ],
    declarations: [
        MetreComponent,
    ],
    entryComponents: [
        MetreComponent,
    ],
    providers: [
        MetreService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayMetreModule {
}
