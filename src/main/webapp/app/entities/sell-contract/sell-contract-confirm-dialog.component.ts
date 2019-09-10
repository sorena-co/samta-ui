import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SellContract } from './sell-contract.model';
import { SellContractPopupService } from './sell-contract-popup.service';
import { SellContractService } from './sell-contract.service';

@Component({
    selector: 'jhi-sell-contract-confirm-dialog',
    templateUrl: './sell-contract-confirm-dialog.component.html'
})
export class SellContractConfirmDialogComponent {

    sellContract: SellContract;

    constructor(
        private sellContractService: SellContractService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirm(id: number) {
        this.sellContractService.confirm(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'sellContractListModification',
                content: 'Confirmd an sellContract'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sell-contract-confirm-popup',
    template: ''
})
export class SellContractConfirmPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sellContractPopupService: SellContractPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.sellContractPopupService
                .open(SellContractConfirmDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
