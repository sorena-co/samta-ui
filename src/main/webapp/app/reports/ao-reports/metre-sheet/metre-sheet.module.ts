import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {RouterModule} from '@angular/router';
import {metreSheetRoute} from './metre-sheet.route';
import {MetreSheetComponent} from './metre-sheet.component';
import {MetreSheetService} from './metre-sheet.service';

/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot(metreSheetRoute, {useHash: true})
    ],
    declarations: [
        MetreSheetComponent,
    ],
    entryComponents: [
        MetreSheetComponent,
    ],
    providers: [
        MetreSheetService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayMetreSheetModule {
}
