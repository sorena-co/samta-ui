import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UserRefuelCenter } from './user-refuel-center.model';
import { UserRefuelCenterPopupService } from './user-refuel-center-popup.service';
import { UserRefuelCenterService } from './user-refuel-center.service';

@Component({
    selector: 'jhi-user-refuel-center-delete-dialog',
    templateUrl: './user-refuel-center-delete-dialog.component.html'
})
export class UserRefuelCenterDeleteDialogComponent {

    userRefuelCenter: UserRefuelCenter;

    constructor(
        private userRefuelCenterService: UserRefuelCenterService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.userRefuelCenterService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'userRefuelCenterListModification',
                content: 'Deleted an userRefuelCenter'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-user-refuel-center-delete-popup',
    template: ''
})
export class UserRefuelCenterDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userRefuelCenterPopupService: UserRefuelCenterPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.userRefuelCenterPopupService
                .open(UserRefuelCenterDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
