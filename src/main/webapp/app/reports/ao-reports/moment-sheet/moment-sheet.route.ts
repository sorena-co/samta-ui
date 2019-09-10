import {Routes} from '@angular/router';

import {UserRouteAccessService} from '../../../shared';
import {MomentSheetAoComponent} from './moment-sheet-ao.component';
import {MomentSheetDepotComponent} from './moment-sheet-depot.component';

export const momentSheetRoute: Routes = [
    {
        path: 'report/moment-sheet/ao',
        component: MomentSheetAoComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_REPORT_MOMENT_SHEET_AO'],
            pageTitle: 'samtagatewayApp.momentSheet.home.aoTitle'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'report/moment-sheet/depot',
        component: MomentSheetDepotComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_REPORT_MOMENT_SHEET_DEPOT'],
            pageTitle: 'samtagatewayApp.momentSheet.home.depotTitle'
        },
        canActivate: [UserRouteAccessService]
    }
];
