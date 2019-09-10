import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {RouterModule} from '@angular/router';
import {AoMountReportRoute} from './ao-mount-report.route';
import {AoMountReportComponent} from './ao-mount-report.component';
import {AoMountReportService} from './ao-mount-report.service';

/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot(AoMountReportRoute, {useHash: true})
    ],
    declarations: [
        AoMountReportComponent,
    ],
    entryComponents: [
        AoMountReportComponent,
    ],
    providers: [
        AoMountReportService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayAoMountReportModule {
}
