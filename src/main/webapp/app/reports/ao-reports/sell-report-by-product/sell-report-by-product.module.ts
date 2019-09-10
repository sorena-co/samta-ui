import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {RouterModule} from '@angular/router';
import {sellReportByProductRoute} from './sell-report-by-product.route';
import {SellReportByProductComponent} from './sell-report-by-product.component';
import {SellReportByProductService} from './sell-report-by-product.service';

/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot(sellReportByProductRoute, {useHash: true})
    ],
    declarations: [
        SellReportByProductComponent,
    ],
    entryComponents: [
        SellReportByProductComponent,
    ],
    providers: [
        SellReportByProductService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewaySellReportByProductModule {
}
