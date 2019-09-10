import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {Customer} from './customer.model';
import {CustomerPopupService} from './customer-popup.service';
import {CustomerService} from './customer.service';
import {CountryService} from '../country';
import {CustomerType, CustomerTypeService} from '../customer-type';
import {Region, RegionService} from '../region';
import {Location, LocationService} from '../location';
import {Cost, CostService} from '../cost';
import {Depot, DepotService} from '../depot';
import {TranslateService} from '@ngx-translate/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CustomerGroup} from '../customer-type/customer-type.model';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {RemoteService} from '../../shared/remoteService/remote.service';
import {AirplaneModelService} from '../airplane-model';
import {ProductService} from '../product';
import {VehicleModel, VehicleModelService} from '../vehicle-model';
import {Plaque} from '../plaque';

@Component({
    selector: 'jhi-boundary-dialog',
    templateUrl: './boundary-dialog.component.html'
})
export class BoundaryDialogComponent implements OnInit {

    customer: Customer;
    isSaving: boolean;
    isView: boolean;

    CustomerGroup = CustomerGroup;
    customProducts: any[];
    selectedProduct: any;
    products: any[];

    vehicleModels: VehicleModel[] = [];
    vehicleModel: VehicleModel = new VehicleModel();

    constructor(private router: Router,
                private route: ActivatedRoute,
                private activeModal: NgbActiveModal,
                private alertService: JhiAlertService,
                private customerService: CustomerService,
                private remoteService: RemoteService,
                private eventManager: JhiEventManager,
                private productService: ProductService,
                private vehicleModelService: VehicleModelService,
                private translateService: TranslateService) {

    }

    loadVehicleModels() {
        // if (!this.vehicleModels)
        this.vehicleModelService.queryByCustomerGroup('BOUNDARY')
            .subscribe((res) => {
                this.vehicleModels = res.body;
                if (this.customer.id && this.customer.vehicleModelId) {
                    this.onChangeVehicleModel(this.customer.vehicleModelId);
                }
            }, (res) => this.onError(res.message));
    }

    loadProducts() {
        if (!this.products) {
            this.productService.queryByCustomerGroup(CustomerGroup[CustomerGroup.BOUNDARY])
                .subscribe((res) => {
                    this.products = res.body;
                    const product = {
                        value: '',
                        label: ''
                    };
                    this.customProducts = [];
                    this.customProducts.push(product);
                    for (let i = 0; i < this.products.length; i++) {
                        this.customProducts.push({
                            value: this.products[i].id,
                            label: this.products[i].title
                        });
                    }
                    if (this.customer.id) {
                        this.selectedProduct = this.customer.productId;
                    }
                }, (res) => this.onError(res.message));
        }
    }

    ngOnInit() {
        this.isSaving = false;
        this.isView = View.isView;
        this.loadVehicleModels();
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.customer.id !== undefined) {
            this.subscribeToSaveResponse(
                this.customerService.update(this.customer));
        } else {
            this.subscribeToSaveResponse(
                this.customerService.create(this.customer));
        }
    }

    trackCustomerTypeById(index: number, item: CustomerType) {
        return item.id;
    }

    trackVehicleModelById(index: number, item: VehicleModel) {
        return item.id;
    }

    trackRegionById(index: number, item: Region) {
        return item.id;
    }

    trackLocationById(index: number, item: Location) {
        return item.id;
    }

    trackCostById(index: number, item: Cost) {
        return item.id;
    }

    trackDepotById(index: number, item: Depot) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }

    onChangeProduct(data) {
        this.customer.productId = data;
    }

    onChangeVehicleModel(vehicleModelId) {
        this.vehicleModel = this.vehicleModels.find((value) => value.id === vehicleModelId);
        if (this.vehicleModel.havePrimitiveMeasure) {
            this.loadProducts();
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Customer>>) {
        result.subscribe((res: HttpResponse<Customer>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Customer) {
        this.eventManager.broadcast({name: 'customerListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.alertService.error(error.message, null, null);
    }

    onChangePlaque(plaque: Plaque) {
        if (plaque) {
            this.customer.plaqueTemplateId = plaque.id;
            this.customer.plaqueTemplateTitle = plaque.title;
        }
    }
}

@Component({
    selector: 'jhi-boundary-popup',
    template: ''
})
export class BoundaryPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private customerPopupService: CustomerPopupService) {
    }

    ngOnInit() {
        View.isBoundary = !!this.route.data['isBoundary'];
        this.routeSub = this.route.params.subscribe((params) => {

            View.isView = !!params['view'];
            if (params['id']) {
                this.customerPopupService
                    .open(BoundaryDialogComponent as Component, params['id']);
            } else {
                this.customerPopupService
                    .open(BoundaryDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }

}

class View {
    static isView: boolean;
    static isBoundary: boolean;
}
