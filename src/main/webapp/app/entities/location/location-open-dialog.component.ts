import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Location } from './location.model';
import { LocationPopupService } from './location-popup.service';
import { LocationService } from './location.service';

@Component({
    selector: 'jhi-location-open-dialog',
    templateUrl: './location-open-dialog.component.html'
})
export class LocationOpenDialogComponent {

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

    confirmOpen(id: number) {
        this.locationService.open(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'locationListModification',
                content: 'Opened an location'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-location-open-popup',
    template: ''
})
export class LocationOpenPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private locationPopupService: LocationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.locationPopupService
                .open(LocationOpenDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
