import './vendor.ts';

import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2Webstorage } from 'ngx-webstorage';
import { JhiEventManager } from 'ng-jhipster';

import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { NiopdcgatewaySharedModule, UserRouteAccessService } from './shared';
import { NiopdcgatewayAppRoutingModule} from './app-routing.module';
import { NiopdcgatewayHomeModule } from './home';
import { NiopdcgatewayAdminModule } from './admin/admin.module';
import { NiopdcgatewayAccountModule } from './account/account.module';
import { NiopdcgatewayEntityModule } from './entities/entity.module';
import { NiopdcgatewayReportModule } from './reports/report.module';
import { PaginationConfig } from './blocks/config/uib-pagination.config';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// jhipster-needle-angular-add-module-import JHipster will add new module here
import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        NiopdcgatewayAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        NiopdcgatewaySharedModule,
        NiopdcgatewayHomeModule,
        NiopdcgatewayAdminModule,
        NiopdcgatewayAccountModule,
        NiopdcgatewayEntityModule,
        NiopdcgatewayReportModule,
        BrowserAnimationsModule
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent
    ],
    providers: [
        ProfileService,
        PaginationConfig,
        UserRouteAccessService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true,
            deps: [
                Injector
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
            deps: [
                JhiEventManager
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true,
            deps: [
                Injector
            ]
        }
    ],
    bootstrap: [ JhiMainComponent ]
})
export class NiopdcgatewayAppModule {}
