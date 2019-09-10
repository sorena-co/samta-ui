import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {InputMaskModule} from '../input-mask/input-mask.module';
import {TruncatePipe} from './truncate.pipe'
import {SortByPipe} from './sort-by.pipe';

@NgModule({
    declarations: [
        TruncatePipe,
        SortByPipe
    ],
    imports: [
        BrowserModule,
        FormsModule,
        NgbModule.forRoot(),
        InputMaskModule
    ],
    exports: [
        TruncatePipe,
        SortByPipe
    ],
    providers: []
})
export class CustomPipeModule {
}
