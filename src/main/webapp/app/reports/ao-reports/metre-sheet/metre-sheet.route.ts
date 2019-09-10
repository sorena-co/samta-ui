import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import {MetreSheetComponent} from './metre-sheet.component';

export const metreSheetRoute: Routes = [
    {
        path: 'report/metre-sheet',
        component: MetreSheetComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_REPORT_METRE_SHEET'],
            pageTitle: 'samtagatewayApp.metreSheet.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
