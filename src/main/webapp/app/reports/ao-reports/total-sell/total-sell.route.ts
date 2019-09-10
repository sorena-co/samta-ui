import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import {TotalSellComponent} from './total-sell.component';

export const totalSellRoute: Routes = [
    {
        path: 'report/total-sells',
        component: TotalSellComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_TOTAL_SELL'],
            pageTitle: 'samtagatewayApp.totalSell.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
