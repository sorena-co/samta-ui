import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {RouterModule} from '@angular/router';
import {customerRoute} from './customer.route';
import {CustomerComponent} from './customer.component';
import {CustomerService} from './customer.service';

/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot(customerRoute, {useHash: true})
    ],
    declarations: [
        CustomerComponent,
    ],
    entryComponents: [
        CustomerComponent,
    ],
    providers: [
        CustomerService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayCustomerReportModule {
}
