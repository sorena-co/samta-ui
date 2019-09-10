import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {DatePipe} from '@angular/common';

import {
    AccountService,
    AuthServerProvider,
    CSRFService,
    HasAnyAuthorityDirective,
    HasAnyAuthorityDisabledDirective,
    HasNotAnyAuthorityDirective,
    JhiLoginModalComponent,
    LoginModalService,
    LoginService,
    NiopdcgatewaySharedCommonModule,
    NiopdcgatewaySharedLibsModule,
    Principal,
    StateStorageService,
    UserService
} from './';
import {
    CustomerSelectorComponent,
    LocationLevelSelectorComponent,
    OrderCostTableComponent,
    PaymentSelectorComponent,
    PersonSelectorComponent,
    ProductSelectorComponent,
    SellContractCustomerPersonSelectorComponent,
    SellContractCustomerSelectorComponent,
    SellContractPersonSelectorComponent,
    SellContractProductSelectorComponent,
} from './selectors';
import {RemoteService} from './remoteService';
import {SixtyDegreeConverterService} from './sixty-degree-converter';
import {StimulsoftService} from './stimulsoft/stimulsoft.service';
import {AirportSelectorComponent} from './selectors/airport-selector/airport-selector.component';
import {EPaymentComponent} from './e-payment/e-payment.component';
import {PosService} from './e-payment/pos.service';
import {BoundaryDiscountSelectorComponent} from './selectors/boundary-discount-selector/boundary-discount-selector.component';
import {InputTransitPlaqueComponent} from './input-transit-plaque/input-transit-plaque.component';
import {ScriptService} from './script/script.service';
import {TagRateSelectorComponent} from './selectors/tag-rate-selector/tag-rate-selector.component';
import {PasswordStrengthBarComponent} from './password-strength/password-strength-bar.component';
import {InputPlaqueComponent} from './input-plaque/input-plaque.component';
import {AirportOrderSelectorComponent} from "./selectors/airport-order-selector/airport-order-selector.component";

@NgModule({
    imports: [
        NiopdcgatewaySharedLibsModule,
        NiopdcgatewaySharedCommonModule
    ],
    declarations: [
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        HasNotAnyAuthorityDirective,
        HasAnyAuthorityDisabledDirective,
        EPaymentComponent,
        PasswordStrengthBarComponent,
        /*selector-start*/
        PersonSelectorComponent,
        LocationLevelSelectorComponent,
        OrderCostTableComponent,
        SellContractProductSelectorComponent,
        SellContractCustomerPersonSelectorComponent,
        SellContractCustomerSelectorComponent,
        SellContractProductSelectorComponent,
        CustomerSelectorComponent,
        PaymentSelectorComponent,
        SellContractPersonSelectorComponent,
        AirportSelectorComponent,
        AirportOrderSelectorComponent,
        InputTransitPlaqueComponent,
        ProductSelectorComponent,
        BoundaryDiscountSelectorComponent,
        InputPlaqueComponent,
        TagRateSelectorComponent
        /*selector-end*/
    ],
    providers: [
        LoginService,
        LoginModalService,
        AccountService,
        StateStorageService,
        Principal,
        CSRFService,
        AuthServerProvider,
        UserService,
        DatePipe,
        RemoteService,
        SixtyDegreeConverterService,
        StimulsoftService,
        PosService,
        ScriptService
    ],
    entryComponents: [
        JhiLoginModalComponent,
        EPaymentComponent,
        PasswordStrengthBarComponent,
        InputPlaqueComponent,
        /*selector-start*/
        PersonSelectorComponent,
        LocationLevelSelectorComponent,
        OrderCostTableComponent,
        SellContractProductSelectorComponent,
        SellContractCustomerPersonSelectorComponent,
        SellContractCustomerSelectorComponent,
        SellContractProductSelectorComponent,
        CustomerSelectorComponent,
        PaymentSelectorComponent,
        SellContractPersonSelectorComponent,
        AirportSelectorComponent,
        AirportOrderSelectorComponent,
        InputTransitPlaqueComponent,
        ProductSelectorComponent,
        BoundaryDiscountSelectorComponent,
        TagRateSelectorComponent
        /*selector-end*/
    ],
    exports: [
        NiopdcgatewaySharedCommonModule,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        HasNotAnyAuthorityDirective,
        HasAnyAuthorityDisabledDirective,
        DatePipe,
        EPaymentComponent,
        PasswordStrengthBarComponent,
        InputPlaqueComponent,
        /*selector-start*/
        PersonSelectorComponent,
        LocationLevelSelectorComponent,
        OrderCostTableComponent,
        SellContractProductSelectorComponent,
        SellContractCustomerPersonSelectorComponent,
        SellContractCustomerSelectorComponent,
        SellContractProductSelectorComponent,
        CustomerSelectorComponent,
        PaymentSelectorComponent,
        SellContractPersonSelectorComponent,
        AirportSelectorComponent,
        AirportOrderSelectorComponent,
        InputTransitPlaqueComponent,
        ProductSelectorComponent,
        BoundaryDiscountSelectorComponent,
        TagRateSelectorComponent
        /*selector-end*/
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class NiopdcgatewaySharedModule {
}
