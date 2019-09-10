import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Location } from './location.model';
import { LocationPopupService } from './location-popup.service';
import { LocationService } from './location.service';

@Component({
    selector: 'jhi-location-close-dialog',
    templateUrl: './location-close-dialog.component.html'
})
export class LocationCloseDialogComponent {

    location: Location;

    constructor(
        private locationService: LocationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmClose(id: number) {
        this.locationService.close(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'locationListModification',
                content: 'closed an location'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-location-close-popup',
    template: ''
})
export class LocationClosePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private locationPopupService: LocationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.locationPopupService
                .open(LocationCloseDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
