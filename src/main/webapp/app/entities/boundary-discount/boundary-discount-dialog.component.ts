import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {BoundaryDiscount} from './boundary-discount.model';
import {BoundaryDiscountPopupService} from './boundary-discount-popup.service';
import {BoundaryDiscountService} from './boundary-discount.service';
import {Product, ProductService} from '../product';
import {Location, LocationService} from '../location';
import {Country, CountryService} from '../country';
import {VehicleModel, VehicleModelService} from '../vehicle-model';
import {CustomerGroup} from "../customer-type";

@Component({
    selector: 'jhi-boundary-discount-dialog',
    templateUrl: './boundary-discount-dialog.component.html'
})
export class BoundaryDiscountDialogComponent implements OnInit {


    boundaryDiscount: BoundaryDiscount;
    isSaving: boolean;
    isView: boolean;


    products: Product[];
    customProducts: any[];


    locations: Location[];
    customLocation: any[];

    countries: Country[];
    customCountry: any[];

    vehiclemodels: VehicleModel[];
    customVehicleModels: any[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private boundaryDiscountService: BoundaryDiscountService,
        private productService: ProductService,
        private locationService: LocationService,
        private countryService: CountryService,
        private vehicleModelService: VehicleModelService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.loadProducts();
        this.loadLocation();
        this.loadCountry();
        this.loadVehicleModel();
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.boundaryDiscount.id !== undefined) {
            this.subscribeToSaveResponse(
                this.boundaryDiscountService.update(this.boundaryDiscount));
        } else {
            this.subscribeToSaveResponse(
                this.boundaryDiscountService.create(this.boundaryDiscount));
        }
    }

    private loadProducts() {
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
            }, (res) => this.onError(res.message));
    }

    private loadLocation() {
        this.locationService.queryByLevel(3)
            .subscribe(value => {
                this.locations = value.body;
                const location = {
                    value: '',
                    label: ''
                };
                this.customLocation = [];
                this.customLocation.push(location);
                for (let i = 0; i < this.locations.length; i++) {
                    this.customLocation.push({
                        value: this.locations[i].id,
                        label: this.locations[i].name
                    });
                }

            });
    }

    private loadCountry() {
        this.countryService.queryByNational(false)
            .subscribe(value => {
                this.countries = value.body;
                const country = {
                    value: '',
                    label: ''
                };
                this.customCountry = [];
                this.customCountry.push(country);
                for (let i = 0; i < this.countries.length; i++) {
                    this.customCountry.push({
                        value: this.countries[i].id,
                        label: this.countries[i].name
                    });
                }

            });
    }

    loadVehicleModel() {
        this.vehicleModelService.queryByHaveMeasure(true)
            .subscribe(value => {
                this.vehiclemodels = value.body;
                const vehicleModel = {
                    value: '',
                    label: ''
                };
                this.customVehicleModels = [];
                this.customVehicleModels.push(vehicleModel);
                for (let i = 0; i < this.vehiclemodels.length; i++) {
                    this.customVehicleModels.push({
                        value: this.vehiclemodels[i].id,
                        label: this.vehiclemodels[i].title
                    });
                }

            });
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<BoundaryDiscount>>) {
        result.subscribe((res: HttpResponse<BoundaryDiscount>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: BoundaryDiscount) {
        this.eventManager.broadcast({name: 'boundaryDiscountListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackProductById(index: number, item: Product) {
        return item.id;
    }

    trackLocationById(index: number, item: Location) {
        return item.id;
    }

    trackCountryById(index: number, item: Country) {
        return item.id;
    }

    trackVehicleModelById(index: number, item: VehicleModel) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-boundary-discount-popup',
    template: ''
})
export class BoundaryDiscountPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private boundaryDiscountPopupService: BoundaryDiscountPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.boundaryDiscountPopupService
                    .open(BoundaryDiscountDialogComponent as Component, params['id']);
            } else {
                this.boundaryDiscountPopupService
                    .open(BoundaryDiscountDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

class View {
    static isView: boolean;
}
