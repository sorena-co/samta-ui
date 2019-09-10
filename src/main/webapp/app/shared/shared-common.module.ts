import {LOCALE_ID, NgModule} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {registerLocaleData} from '@angular/common';
import locale from '@angular/common/locales/en';

import {NiopdcgatewaySharedLibsModule} from './shared-libs.module';
import {JhiLanguageHelper} from './language/language.helper';
import {JhiAlertErrorComponent} from './alert/alert-error.component';
import {JhiAlertComponent} from './alert/alert.component';
import {DateTimePickerModule} from './datetimepicker/datetimepicker.module';
import {InputMaskModule} from './input-mask/input-mask.module';
import {InputNumericModule} from './input-numeric/input-numeric.module';
import {InputSearchAfterTypedModule} from './input-search/input-search.module';
import {NationalCodeModule} from './national-code/national-code.module';
import {AuthoritySelectorModule} from './authority-selector/authority-selector.module';
import {MultiStateCheckboxModule} from './multi-state-checkbox/multi-state-checkbox.module';
import {DateTimePickerJalaliModule} from './ng2-datetimepicker-jalali';
import {FindLanguageFromKeyPipe} from './language/find-language-from-key.pipe';
import {LocationSelectorModule} from './location-selector/location-selector.module';
import {RegionSelectorModule} from './region-selector/region-selector.module';
// import {LocationDisableSelectorModule} from './location-authority-selector/location-selector.module';
import {InputLocationSelectorModule} from './selectors/input-location-selector/input-location-selector.module';
import {InputRegionSelectorModule} from './selectors/input-region-selector/input-region-selector.module';
import {CustomPipeModule} from './custom-pipe/custom-pipe.module';
import {EqualsInputValidationModule} from './equals-input-validation/equals-input-validation.module';

@NgModule({
    imports: [
        NiopdcgatewaySharedLibsModule,
        LocationSelectorModule,
        RegionSelectorModule,
        DateTimePickerModule,
        CustomPipeModule,
        DateTimePickerJalaliModule,
        InputMaskModule,
        NationalCodeModule,
        EqualsInputValidationModule,
        InputNumericModule,
        InputSearchAfterTypedModule,
        MultiStateCheckboxModule,
        AuthoritySelectorModule,
        InputLocationSelectorModule,
        InputRegionSelectorModule,
        // LocationDisableSelectorModule
    ],
    declarations: [
        FindLanguageFromKeyPipe,
        JhiAlertComponent,
        JhiAlertErrorComponent
    ],
    providers: [
        FindLanguageFromKeyPipe,
        JhiLanguageHelper,
        Title,
        {
            provide: LOCALE_ID,
            useValue: 'fa'
        },
    ],
    exports: [
        NiopdcgatewaySharedLibsModule,
        LocationSelectorModule,
        RegionSelectorModule,
        FindLanguageFromKeyPipe,
        JhiAlertComponent,
        JhiAlertErrorComponent,
        DateTimePickerModule,
        CustomPipeModule,
        DateTimePickerJalaliModule,
        InputMaskModule,
        NationalCodeModule,
        InputNumericModule,
        EqualsInputValidationModule,
        InputSearchAfterTypedModule,
        MultiStateCheckboxModule,
        AuthoritySelectorModule,
        InputLocationSelectorModule,
        InputRegionSelectorModule,
        // LocationDisableSelectorModule
    ]
})
export class NiopdcgatewaySharedCommonModule {
    constructor() {
        registerLocaleData(locale);
    }
}
