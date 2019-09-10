import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    WalletService,
    WalletPopupService,
    WalletComponent,
    WalletDialogComponent,
    WalletPopupComponent,
    WalletDeletePopupComponent,
    WalletDeleteDialogComponent,
    walletRoute,
    walletPopupRoute,
    WalletResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...walletRoute,
    ...walletPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        WalletComponent,
        WalletDialogComponent,
        WalletDeleteDialogComponent,
        WalletPopupComponent,
        WalletDeletePopupComponent,
    ],
    entryComponents: [
        WalletComponent,
        WalletDialogComponent,
        WalletPopupComponent,
        WalletDeleteDialogComponent,
        WalletDeletePopupComponent,
    ],
    providers: [
        WalletService,
        WalletPopupService,
        WalletResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayWalletModule {}
