import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {NiopdcgatewaySharedModule} from '../../shared';
import {
    PersonComponent,
    PersonDeleteDialogComponent,
    PersonDeletePopupComponent,
    PersonDialogComponent,
    PersonPopupComponent,
    personPopupRoute,
    PersonPopupService,
    PersonResolvePagingParams,
    personRoute,
    PersonService,
    PersonCreateUserDialogComponent,
    PersonCreateUserPopupComponent,
    PersonChangeStatusDialogComponent,
    PersonChangeStatusPopupComponent,
    PersonRegisterDialogComponent
} from './';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const ENTITY_STATES = [
    ...personRoute,
    ...personPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES),
        NgbModule
    ],
    declarations: [
        PersonComponent,
        PersonDialogComponent,
        PersonRegisterDialogComponent,
        PersonDeleteDialogComponent,
        PersonPopupComponent,
        PersonDeletePopupComponent,
        PersonChangeStatusDialogComponent,
        PersonChangeStatusPopupComponent,
        PersonCreateUserDialogComponent,
        PersonCreateUserPopupComponent
    ],
    entryComponents: [
        PersonComponent,
        PersonDialogComponent,
        PersonRegisterDialogComponent,
        PersonPopupComponent,
        PersonDeleteDialogComponent,
        PersonDeletePopupComponent,
        PersonChangeStatusDialogComponent,
        PersonChangeStatusPopupComponent,
        PersonCreateUserDialogComponent,
        PersonCreateUserPopupComponent
    ],
    providers: [
        PersonService,
        PersonPopupService,
        PersonResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayPersonModule {
}
