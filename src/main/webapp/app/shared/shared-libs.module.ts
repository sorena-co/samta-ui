import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {NgbDropdownModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgJhipsterModule } from 'ng-jhipster';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CookieModule } from 'ngx-cookie';
import { ExcelModule, GridModule, PDFModule } from '@progress/kendo-angular-grid';
import 'quill/quill';

import {
    BlockUIModule,
    BreadcrumbModule,
    ButtonModule,
    CheckboxModule,
    DataTableModule,
    DropdownModule,
    EditorModule,
    FileUploadModule,
    InputSwitchModule,
    MultiSelectModule,
    OverlayPanelModule,
    SharedModule,
    SplitButtonModule,
    StepsModule,
    ToggleButtonModule,
    ColorPickerModule,
} from 'primeng/primeng';
import {ButtonsModule} from '@progress/kendo-angular-buttons';
import {DropDownsModule} from '@progress/kendo-angular-dropdowns';
import {PanelBarModule} from '@progress/kendo-angular-layout';
import {QueryBuilderModule} from 'angular2-query-builder';
import {ListboxModule} from 'primeng/listbox';
import {HotkeyModule} from 'angular2-hotkeys';

@NgModule({
    imports: [
        OverlayPanelModule,
        NgbModule.forRoot(),
        EditorModule,
        NgJhipsterModule.forRoot({
            // set below to true to make alerts look like toast
            alertAsToast: false,
            i18nEnabled: true,
            defaultI18nLang: 'fa'
        }),
        InfiniteScrollModule,
        DataTableModule,
        SharedModule,
        MultiSelectModule,
        ButtonModule,
        CheckboxModule,
        BreadcrumbModule,
        InputSwitchModule,
        ToggleButtonModule,
        ColorPickerModule,
        InfiniteScrollModule,
        StepsModule,
        SplitButtonModule,
        BlockUIModule,
        FileUploadModule,
        QueryBuilderModule,
        DropdownModule,
        ListboxModule,
        ButtonsModule,
        DropDownsModule,
        PanelBarModule,
        GridModule,
        PDFModule,
        ExcelModule,
        CookieModule.forRoot(),
        HotkeyModule.forRoot()
    ],
    exports: [
        OverlayPanelModule,
        FormsModule,
        HttpClientModule,
        EditorModule,
        CommonModule,
        NgbModule,
        NgJhipsterModule,
        InfiniteScrollModule,
        DataTableModule,
        SharedModule,
        MultiSelectModule,
        ButtonModule,
        CheckboxModule,
        BreadcrumbModule,
        InputSwitchModule,
        ToggleButtonModule,
        ColorPickerModule,
        StepsModule,
        FileUploadModule,
        QueryBuilderModule,
        DropdownModule,
        ListboxModule,
        SplitButtonModule,
        ButtonsModule,
        DropDownsModule,
        PanelBarModule,
        GridModule,
        PDFModule,
        ExcelModule,
        HotkeyModule
    ]
})
export class NiopdcgatewaySharedLibsModule {}
