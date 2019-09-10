import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { UserRefuelCenter } from './user-refuel-center.model';
import { UserRefuelCenterService } from './user-refuel-center.service';

@Component({
    selector: 'jhi-user-refuel-center-detail',
    templateUrl: './user-refuel-center-detail.component.html'
})
export class UserRefuelCenterDetailComponent implements OnInit, OnDestroy {

    userRefuelCenter: UserRefuelCenter;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private userRefuelCenterService: UserRefuelCenterService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInUserRefuelCenters();
    }

    load(id) {
        this.userRefuelCenterService.find(id).subscribe((userRefuelCenter) => {
            this.userRefuelCenter = userRefuelCenter.body;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInUserRefuelCenters() {
        this.eventSubscriber = this.eventManager.subscribe(
            'userRefuelCenterListModification',
            (response) => this.load(this.userRefuelCenter.id)
        );
    }
}
