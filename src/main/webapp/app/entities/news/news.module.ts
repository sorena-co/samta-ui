import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {
    NewsComponent,
    NewsDeleteDialogComponent,
    NewsDeletePopupComponent,
    NewsDialogComponent,
    NewsPopupComponent,
    newsPopupRoute,
    NewsPopupService,
    NewsResolvePagingParams,
    newsRoute,
    NewsService
} from './';
import {NiopdcgatewaySharedModule} from '../../shared/shared.module';
// import { JoditAngularModule } from 'jodit-angular';

const ENTITY_STATES = [
    ...newsRoute,
    ...newsPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, {useHash: true})
    ],
    declarations: [
        NewsComponent,
        NewsDialogComponent,
        NewsDeleteDialogComponent,
        NewsPopupComponent,
        NewsDeletePopupComponent
    ],
    entryComponents: [
        NewsComponent,
        NewsDialogComponent,
        NewsPopupComponent,
        NewsDeleteDialogComponent,
        NewsDeletePopupComponent,
    ],
    providers: [
        NewsService,
        NewsPopupService,
        NewsResolvePagingParams
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayNewsModule {
}
