import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    TestResultService,
    TestResultPopupService,
    TestResultComponent,
    TestResultDialogComponent,
    TestResultPopupComponent,
    TestResultDeletePopupComponent,
    TestResultDeleteDialogComponent,
    testResultRoute,
    testResultPopupRoute,
    TestResultResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...testResultRoute,
    ...testResultPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TestResultComponent,
        TestResultDialogComponent,
        TestResultDeleteDialogComponent,
        TestResultPopupComponent,
        TestResultDeletePopupComponent,
    ],
    entryComponents: [
        TestResultComponent,
        TestResultDialogComponent,
        TestResultPopupComponent,
        TestResultDeleteDialogComponent,
        TestResultDeletePopupComponent,
    ],
    providers: [
        TestResultService,
        TestResultPopupService,
        TestResultResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayTestResultModule {}
