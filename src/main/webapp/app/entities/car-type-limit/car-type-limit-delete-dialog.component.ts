import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CarTypeLimit } from './car-type-limit.model';
import { CarTypeLimitPopupService } from './car-type-limit-popup.service';
import { CarTypeLimitService } from './car-type-limit.service';

@Component({
    selector: 'jhi-car-type-limit-delete-dialog',
    templateUrl: './car-type-limit-delete-dialog.component.html'
})
export class CarTypeLimitDeleteDialogComponent {

    carTypeLimit: CarTypeLimit;

    constructor(
        private carTypeLimitService: CarTypeLimitService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.carTypeLimitService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'carTypeLimitListModification',
                content: 'Deleted an carTypeLimit'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-car-type-limit-delete-popup',
    template: ''
})
export class CarTypeLimitDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private carTypeLimitPopupService: CarTypeLimitPopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.carTypeLimitPopupService
                .open(CarTypeLimitDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
