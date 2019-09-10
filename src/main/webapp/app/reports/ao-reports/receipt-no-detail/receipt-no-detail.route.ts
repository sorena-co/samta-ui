import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import {ReceiptNoDetailComponent} from './receipt-no-detail.component';

export const receiptNoDetailRoute: Routes = [
    {
        path: 'report/receipt-no-details',
        component: ReceiptNoDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_RECEIPT_NO_DETAIL'],
            pageTitle: 'samtagatewayApp.receiptNoDetail.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
