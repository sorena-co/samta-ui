import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import {AircraftRefuelingRecordComponent} from './aircraft-refueling-record.component';

export const aircraftRefuelingRecordRoute: Routes = [
    {
        path: 'report/aircraft-refueling-records',
        component: AircraftRefuelingRecordComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_REPORT_METRE_SHEET'],
            pageTitle: 'samtagatewayApp.aircraftRefuelingRecord.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
