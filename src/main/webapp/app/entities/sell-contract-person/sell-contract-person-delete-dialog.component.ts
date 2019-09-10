import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SellContractPerson } from './sell-contract-person.model';
import { SellContractPersonPopupService } from './sell-contract-person-popup.service';
import { SellContractPersonService } from './sell-contract-person.service';

@Component({
    selector: 'jhi-sell-contract-person-delete-dialog',
    templateUrl: './sell-contract-person-delete-dialog.component.html'
})
export class SellContractPersonDeleteDialogComponent {

    sellContractPerson: SellContractPerson;

    constructor(
        private sellContractPersonService: SellContractPersonService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.sellContractPersonService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'sellContractPersonListModification',
                content: 'Deleted an sellContractPerson'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sell-contract-person-delete-popup',
    template: ''
})
export class SellContractPersonDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sellContractPersonPopupService: SellContractPersonPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.sellContractPersonPopupService
                .open(SellContractPersonDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
