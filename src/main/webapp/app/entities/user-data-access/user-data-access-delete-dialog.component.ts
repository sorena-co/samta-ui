import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UserDataAccess } from './user-data-access.model';
import { UserDataAccessPopupService } from './user-data-access-popup.service';
import { UserDataAccessService } from './user-data-access.service';

@Component({
    selector: 'jhi-user-data-access-delete-dialog',
    templateUrl: './user-data-access-delete-dialog.component.html'
})
export class UserDataAccessDeleteDialogComponent {

    userDataAccess: UserDataAccess;

    constructor(
        private userDataAccessService: UserDataAccessService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.userDataAccessService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'userDataAccessListModification',
                content: 'Deleted an userDataAccess'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-user-data-access-delete-popup',
    template: ''
})
export class UserDataAccessDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userDataAccessPopupService: UserDataAccessPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.userDataAccessPopupService
                .open(UserDataAccessDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
