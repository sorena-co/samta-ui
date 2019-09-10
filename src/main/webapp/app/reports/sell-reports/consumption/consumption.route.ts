import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import {ConsumptionComponent} from './consumption.component';

export const consumptionRoute: Routes = [
    {
        path: 'report/consumption',
        component: ConsumptionComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_REPORT_CONSUMPTION'],
            pageTitle: 'samtagatewayApp.consumption.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
