import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {HttpResponse} from '@angular/common/http';
import {Region} from './region.model';
import {RegionService} from './region.service';

@Injectable()
export class RegionPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private modalService: NgbModal,
                private router: Router,
                private regionService: RegionService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, regionId?: number | any, countryId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.regionService.find(id)
                    .subscribe((regionResponse: HttpResponse<Region>) => {
                        const region: Region = regionResponse.body;
                        this.ngbModalRef = this.regionModalRef(component, region);
                        resolve(this.ngbModalRef);
                    });
            } else if (regionId) {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError

                this.regionService.find(regionId)
                    .subscribe((regionResponse: HttpResponse<Region>) => {
                        const region2: Region = regionResponse.body;

                        const region = new Region();
                        region.parentId = region2.id;
                        region.level = region2.level + 1;
                        region.parentCode = region2.code;
                        this.ngbModalRef = this.regionModalRef(component, region);
                        resolve(this.ngbModalRef);
                    });
            } else if (countryId) {
                setTimeout(() => {
                    const region = new Region();
                    region.countryId = countryId;
                    region.level = 0;
                    region.parentCode = '';
                    this.ngbModalRef = this.regionModalRef(component, region);
                    resolve(this.ngbModalRef);
                }, 0);
            } else {
                setTimeout(() => {
                    this.ngbModalRef = this.regionModalRef(component);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    regionModalRef(component: Component, region?: Region): NgbModalRef {
        const modalRef = this.modalService.open(component, {size: 'lg', backdrop: 'static'});
        if (region) modalRef.componentInstance.region = region;
        modalRef.result.then((result) => {
            this.router.navigate([{outlets: {popup: null}}], {replaceUrl: true, queryParamsHandling: 'merge'});
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{outlets: {popup: null}}], {replaceUrl: true, queryParamsHandling: 'merge'});
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
