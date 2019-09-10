import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {NiopdcgatewaySharedModule} from '../../shared';
import {
    PosComponent,
    PosDeleteDialogComponent,
    PosDeletePopupComponent,
    PosDialogComponent,
    PosPopupComponent,
    posPopupRoute,
    PosPopupService,
    PosResolvePagingParams,
    posRoute,
    PosService,
} from './';

const ENTITY_STATES = [
    ...posRoute,
    ...posPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, {useHash: true})
    ],
    declarations: [
        PosComponent,
        PosDialogComponent,
        PosDeleteDialogComponent,
        PosPopupComponent,
        PosDeletePopupComponent,
    ],
    entryComponents: [
        PosComponent,
        PosDialogComponent,
        PosPopupComponent,
        PosDeleteDialogComponent,
        PosDeletePopupComponent,
    ],
    providers: [
        PosService,
        PosPopupService,
        PosResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayPosModule {
}
