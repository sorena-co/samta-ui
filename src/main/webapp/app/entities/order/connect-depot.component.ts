import {Component, OnInit, OnDestroy} from '@angular/core';

import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {Location} from '../location';
import {Depot, DepotService} from '../depot';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ConnectDepotService} from './connect-depot.service';
import {DepotFile} from './order.model';
import {saveAs} from 'file-saver/FileSaver';
import {TranslateService} from '@ngx-translate/core';
import {Product, ProductService} from "../product";

@Component({
    selector: 'jhi-connect-depot',
    templateUrl: './connect-depot.component.html'
})
export class ConnectDepotComponent implements OnInit {

    breadcrumbItems;
    req = {
        locationId: null,
        depotId: null,
        depotSendCode: null,
        productId: null,
        startOrderNo: null,
        endOrderNo: null,
        endDate: null,
        startDate: null
    };
    depotFiles: DepotFile[];
    locations: Location[];
    depots: any;
    products: Product[];

    constructor(
        private connectDepotService: ConnectDepotService,
        private depotService: DepotService,
        private eventManager: JhiEventManager,
        private jhiAlertService: JhiAlertService,
        private translateService: TranslateService,
        private productService: ProductService,
    ) {
    }

    locationChanged() {
        this.depotService.queryByLocation(this.req.locationId)
            .subscribe((res1: HttpResponse<Depot[]>) => {
                this.depots = res1.body.map((value) => ({label: value.title, value: value.id}));
                if (this.depots && this.depots[0]) {
                    this.req.depotId = this.depots[0].value;
                    console.log(this.req.depotId);
                } else {
                    this.req.depotId = null;
                }
                this.depotChanged(this.req.depotId);
            }, (res1: HttpErrorResponse) => this.onError(res1.message));
    }

    depotChanged(depotId) {
        if (depotId) {
            this.search();
           /* this.connectDepotService.query(depotId)
                .subscribe((res1: HttpResponse<DepotFile[]>) => {
                    this.depotFiles = res1.body;
                }, (res1: HttpErrorResponse) => this.onError(res1.message));*/
        } else {
            this.depotFiles = null;
        }
    }

    download(type, depotFile?: DepotFile) {
        if (!depotFile) {
            depotFile = new DepotFile();
            depotFile.depotId = this.req.depotId;
            depotFile.depotSendCode= this.req.depotSendCode;
            depotFile.endDate= this.req.endDate;
            depotFile.startDate= this.req.startDate;
            depotFile.productId= this.req.productId;
            depotFile.startOrderNo= this.req.startOrderNo;
            depotFile.endOrderNo= this.req.endOrderNo;
        }
        depotFile.type = type;
        this.connectDepotService.download(depotFile).subscribe((value) => {
            saveAs(value.body, value.headers.get('filename'));
            this.search();
        }, (error1: HttpErrorResponse) => this.onError(error1));
    }
    search(depotFile?: DepotFile) {
        if (!depotFile) {
            depotFile = new DepotFile();
            depotFile.depotId = this.req.depotId;
            depotFile.depotSendCode= this.req.depotSendCode;
            depotFile.endDate= this.req.endDate;
            depotFile.startDate= this.req.startDate;
            depotFile.productId= this.req.productId;
            depotFile.startOrderNo= this.req.startOrderNo;
            depotFile.endOrderNo= this.req.endOrderNo;
        }
        // depotFile.type = type;
        this.connectDepotService.search(depotFile)
            .subscribe((res1: HttpResponse<DepotFile[]>) => {
                this.depotFiles = res1.body;
            }, (res1: HttpErrorResponse) => this.onError(res1.message));
    }

    upload() {
        this.connectDepotService.upload(this.req.depotSendCode).subscribe((value) => {
            // this.jhiAlertService.success(value.body);
        }, (error1: HttpErrorResponse) => this.onError(error1));
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    ngOnInit(): void {
        this.productService.query()
            .subscribe((res: HttpResponse<Product[]>) => {
                this.products = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.setBreadCrumb();
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe((title) => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('global.menu.sell.connectDepot').subscribe((title) => {
            this.breadcrumbItems.push({label: title});
        });
    }
}
