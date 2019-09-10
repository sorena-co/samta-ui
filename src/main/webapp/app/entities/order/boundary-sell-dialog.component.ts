import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Country, CountryService} from '../country';
import {Customer, CustomerService} from '../customer';
import {MenuItem} from 'primeng/primeng';
import {ProductService} from '../product';
import {TranslateService} from '@ngx-translate/core';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';
import {CustomerGroup, CustomerType, CustomerTypeService} from '../customer-type';
import {HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {CarRfId} from '../car-rf-id';
import {CarTank, TankType} from '../car-tank';
import {OrderStatus, OrderType} from './order.model';
import {OrderProductService} from '../order-product';
import {AmountType, BoundaryItemDTO, OrderDiscountDTO, ProductRate, ProductRateService} from '../product-rate';
import {Currency, CurrencyService} from '../currency';
import {CurrencyRateGroup} from '../currency-rate-group';
import {BoundaryDTO} from '../product-rate/product-rate.model';
import {Location, LocationService, TranshipType} from '../location';
import {OrderService} from './order.service';
import {EPaymentComponent} from '../../shared/e-payment/e-payment.component';
import {VehicleModel, VehicleModelService} from '../vehicle-model';
import {VehicleCapacity, VehicleCapacityService} from '../vehicle-capacity';
import {ConfigType} from '../niopdc-config';
import {BoundaryDiscount, BoundaryDiscountService} from '../boundary-discount';

@Component({
    selector: 'jhi-boundary-sell',
    templateUrl: './boundary-sell-dialog.component.html',
    styleUrls: ['./order-dialog.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class BoundarySellDialogComponent implements OnInit {
    showSearch = true;

    isView: boolean;
    items: MenuItem[];
    customer: Customer = new Customer();
    mapSiteItems: any;
    searchRfId: string;
    searchPlaque: string;
    searchPlaqueTemplateId: number;
    activeIndex = 0;
    existCustomer: boolean;
    customProducts: any[];
    products: any[];

    vehicleModels: VehicleModel[] = [];
    customVehicleModels: any[];
    vehicleModel: VehicleModel = new VehicleModel();

    vehicleCapacity: VehicleCapacity = new VehicleCapacity();

    customerCreate: boolean;
    customerEdit: boolean;
    carTankCreate: boolean;
    carTankEdit: boolean;

    customers: Customer[] = [];
    customerTypes: CustomerType[] = [];

    carRfId: CarRfId = new CarRfId();
    carTank: CarTank = new CarTank();
    tempEditCarTank: CarTank = new CarTank();
    carTanks: CarTank[] = [];

    TankType = TankType;

    productRate: ProductRate = new ProductRate();

    currencies: Currency[] = [];

    currencyRateGroup: CurrencyRateGroup = new CurrencyRateGroup();

    boundaryDTO: BoundaryDTO = new BoundaryDTO();
    responseBoundaryDTO: BoundaryDTO = new BoundaryDTO();
    boundaryDiscountId: number;
    showPriceTable = false;
    locations: any[];
    customLocation: any[];
    selectedLocation: Location;

    boundaryDiscounts: any[];
    customBoundaryDiscounts: any[];
    selectedBoundaryDiscount: BoundaryDiscount;

    identifier: string;
    payStatus: string;

    orderId: number;
    OrderStatus = OrderStatus;
    OrderType = OrderType;
    orderType: string;

    primitiveAmount: any;

    serverDate: any;
    locationDate: any;
    isDay = true;

    showCalculatePrice = true;
    AmountType = AmountType;
    TranshipType = TranshipType;

    country: any = new Country();

    ConfigType = ConfigType;

    tempPumpBoundaryItem: any;
    tempBoundaryItems: any[] = [];
    @ViewChild('ePayment') ePaymentComponent: EPaymentComponent;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private locationService: LocationService,
                private orderService: OrderService,
                private productService: ProductService,
                private productRateService: ProductRateService,
                private alertService: JhiAlertService,
                private countryService: CountryService,
                private eventManager: JhiEventManager,
                private translateService: TranslateService,
                private customerTypeService: CustomerTypeService,
                private customerService: CustomerService,
                private currencyService: CurrencyService,
                private orderProductService: OrderProductService,
                private vehicleModelService: VehicleModelService,
                private vehicleCapacityService: VehicleCapacityService,
                private boundaryDiscountService: BoundaryDiscountService
    ) {
        this.route.params.subscribe((params) => {
            if (params['orderId']) {
                this.orderId = params['orderId'];
                this.activeIndex = Number(params['activeIndex']);
                if (this.activeIndex === 2) {
                    this.identifier = this.route.snapshot.params['payId'] ? this.route.snapshot.params['payId'] : '';
                }
            }
            if (params['mode'] === 'transit') {
                this.orderType = this.OrderType[this.OrderType.BOUNDARY_TRANSIT];
            } else {
                this.orderType = this.OrderType[this.OrderType.BOUNDARY_TRANSHIP];
            }
        });

    }

    ngOnInit(): void {
        this.items = [
            {
                label: 'اطلاعات ماشین',
                command: (event: any) => {
                    this.activeIndex = 0;
                }
            },
            {
                label: 'اطلاعات حواله',
                command: (event: any) => {
                    this.activeIndex = 1;
                }
            },
            {
                label: 'پرداخت',
                command: (event: any) => {
                    this.activeIndex = 2;
                }
            }
        ];
        // todo check active index
        if (this.orderId) {
            this.orderService.findForBoundary(this.orderId).subscribe((boundaryResponse) => {
                this.boundaryDTO = boundaryResponse.body;
                if (this.boundaryDTO.orderDiscount && this.boundaryDTO.orderDiscount.boundaryDiscountId) {
                    this.boundaryDiscountId = this.boundaryDTO.orderDiscount.boundaryDiscountId;
                }
                if (this.boundaryDTO.orderDiscount) {
                    this.boundaryDiscountId = this.boundaryDTO.orderDiscount.boundaryDiscountId;
                }
                if (this.boundaryDTO.status === this.OrderStatus[OrderStatus.PAID]) {
                    this.isView = true;
                }
                this.customerService.find(this.boundaryDTO.customerId)
                    .subscribe((customerResponse) => {
                        this.customer = customerResponse.body;
                        this.vehicleModel.id = this.customer.vehicleModelId;
                        this.vehicleModel.title = this.customer.vehicleModelTitle;
                        this.vehicleModel.havePrimitiveMeasure = this.customer.vehicleModelHavePrimitiveMeasure;
                        this.existCustomer = true;
                        if (!this.vehicleModel.havePrimitiveMeasure && this.boundaryDTO.orderId) {
                            this.boundaryDTO.boundaryItems.forEach((value) => {
                                this.productService.find(value.productId).subscribe((p) => {
                                    value.productTitle = p.body.title;
                                });
                            });
                        }
                        if (this.vehicleModel.havePrimitiveMeasure) {
                            for (let i = 0; i < this.boundaryDTO.boundaryItems.length; i++) {
                                if (this.boundaryDTO.boundaryItems[i].amountType === this.AmountType[this.AmountType.NORMAL]) {
                                    this.boundaryDTO.boundaryItems[i].carTank = this.customer.carTanks.find((value) => value.id === this.boundaryDTO.boundaryItems[i].carTankId);
                                }
                            }
                        }
                        if (this.activeIndex === 1) {
                            this.nextStep();
                        }
                        this.customer.carTanks.forEach((carTank) => {
                            this.getCarTankTitle(carTank);
                        });
                    });
            });
        }
    }

    onChangeRfId(data) {
        if (this.searchRfId) {
            this.searchPlaque = '';
            this.customerService.findByRfId(this.searchRfId)
                .subscribe((value) => {
                    if (value.body.id) {
                        this.customer = value.body;
                        this.customer.carTanks.forEach((carTank) => {
                            this.getCarTankTitle(carTank);
                        });
                        this.vehicleModel.id = this.customer.vehicleModelId;
                        this.vehicleModel.title = this.customer.vehicleModelTitle;
                        this.vehicleModel.havePrimitiveMeasure = this.customer.vehicleModelHavePrimitiveMeasure;
                        this.existCustomer = true;
                    } else {
                        this.existCustomer = false;
                        this.customer = new Customer();
                        /*this.loadCustomerTypes();*/
                        this.loadProducts();
                        this.loadVehicleModels();
                        this.alertService.error('error.customer.not.found');
                    }
                });
        }
    }

    onChangePlaque(data) {
        if (this.searchPlaque) {
            this.searchRfId = '';
            this.customerService.findByPlaque(this.searchPlaque, this.orderType)
                .subscribe((value) => {
                    if (value.body.id) {
                        this.customer = value.body;
                        this.customer.carTanks.forEach((carTank) => {
                            this.getCarTankTitle(carTank);
                        });
                        this.vehicleModel.id = this.customer.vehicleModelId;
                        this.vehicleModel.title = this.customer.vehicleModelTitle;
                        this.vehicleModel.havePrimitiveMeasure = this.customer.vehicleModelHavePrimitiveMeasure;
                        this.existCustomer = true;
                    } else {
                        this.existCustomer = false;
                        this.customer = new Customer();
                        /*this.loadCustomerTypes();*/
                        this.loadProducts();
                        this.loadVehicleModels();
                    }
                });
        }
    }

    /*
        onChangeTransitPlaque(data) {
            if (this.searchTransitPlaque) {
                this.searchRfId = '';
                this.customerService.findByTransitPlaque(this.searchTransitPlaque, this.orderType)
                    .subscribe((value) => {
                        if (value.body.id) {
                            this.customer = value.body;
                            this.customer.carTanks.forEach((carTank) => {
                                this.getCarTankTitle(carTank);
                            });
                            this.vehicleModel.id = this.customer.vehicleModelId;
                            this.vehicleModel.title = this.customer.vehicleModelTitle;
                            this.vehicleModel.havePrimitiveMeasure = this.customer.vehicleModelHavePrimitiveMeasure;
                            this.existCustomer = true;
                        } else {
                            this.existCustomer = false;
                            this.customer = new Customer();
                            /!* this.loadCustomerTypes();*!/
                            this.loadProducts();
                            this.loadVehicleModels();
                            this.alertService.error('error.customer.not.found');
                        }
                    });
            }
        }*/

    loadLocation() {
        this.locationService.queryByLevel(3)
            .subscribe((value) => {
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

                if (this.boundaryDTO.locationId) {
                    this.onChangeLocation(this.boundaryDTO.locationId);
                } else {
                    this.boundaryDTO.locationId = this.locations[0].id;
                    this.onChangeLocation(this.boundaryDTO.locationId);
                }

            });
    }

    /*  loadCustomerTypes() {
          this.customerTypeService.queryByCustomerGroup(CustomerGroup[CustomerGroup.BOUNDARY])
              .subscribe(value => {
                  this.customerTypes = value.body;
              });
      }*/

    loadCurrencies() {
        this.currencyService.queryByConfig(this.ConfigType[this.ConfigType.BOUNDARY_SELL])
            .subscribe((value) => {
                this.currencies = value.body;
                if (!this.orderId) {
                    this.currencies.forEach((currency) => {
                        if (currency.nationalCurrency) {
                            this.boundaryDTO.currencyId = currency.id;
                        }
                    });
                }
            });
    }

    loadVehicleModels() {
        if (this.orderType === this.OrderType[this.OrderType.BOUNDARY_TRANSHIP]) { // this query for load vehicle models that's have tank.
            this.vehicleModelService.query({
                query: 'havePrimitiveMeasure;true&customerGroup#CustomerGroup.BOUNDARY'
            })
                .subscribe((res) => {
                    this.vehicleModels = res.body;
                    const vehicleModel = {
                        value: '',
                        label: ''
                    };
                    this.customVehicleModels = [];
                    this.customVehicleModels.push(vehicleModel);
                    for (let i = 0; i < this.vehicleModels.length; i++) {
                        this.customVehicleModels.push({
                            value: this.vehicleModels[i].id,
                            label: this.vehicleModels[i].title
                        });
                    }
                }, (res) => this.onError(res.message));

        } else if (this.orderType === this.OrderType[this.OrderType.BOUNDARY_TRANSIT]) {
            this.vehicleModelService.query({query: 'customerGroup#CustomerGroup.BOUNDARY'})
                .subscribe((res) => {
                    this.vehicleModels = res.body;
                    const vehicleModel = {
                        value: '',
                        label: ''
                    };
                    this.customVehicleModels = [];
                    this.customVehicleModels.push(vehicleModel);
                    for (let i = 0; i < this.vehicleModels.length; i++) {
                        this.customVehicleModels.push({
                            value: this.vehicleModels[i].id,
                            label: this.vehicleModels[i].title
                        });
                    }
                }, (res) => this.onError(res.message));
        }
    }

    loadProducts() {
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

    clear() {
        this.router.navigate(['/boundary-sell']);
    }

    newCustomer() {
        this.showSearch = false;
        this.customerCreate = true;
        this.customer = new Customer();
    }

    editCustomer() {
        this.customerEdit = true;
        this.customer = this.customers[0];
    }

    deleteCustomer() {
        this.customers = [];
    }

    cancelCustomer() {
        if (this.customerCreate) {
            this.customer = new Customer();
            this.customerCreate = false;
        } else {
            this.customer = this.customers[0];
            this.customerEdit = false;
        }
    }

    saveCustomer() {
        if (this.customer.typeId) {
            this.customer.typeTitle = this.customerTypes.find((value) => value.id === this.customer.typeId).title;
        }
        if (this.vehicleModel.havePrimitiveMeasure) {
            this.customer.productTitle = this.products.find((value) => value.id === this.customer.productId).title;
        }
        this.customers[0] = this.customer;
        this.customerCreate = false;
        this.customerEdit = false;
        this.customer = new Customer();
    }

    newCarTank() {
        this.carTankCreate = true;
        this.carTank = new CarTank();
    }

    editCarTank(item) {
        this.carTankEdit = true;
        this.tempEditCarTank = this.carTanks[this.carTanks.indexOf(item)];
        this.carTank = this.carTanks[this.carTanks.indexOf(item)];
    }

    deleteCarTank(item) {
        this.carTanks.remove(item);
    }

    cancelCarTank() {
        if (this.carTankCreate) {
            this.carTank = new CarTank();
            this.carTankCreate = false;
        } else {
            this.customer = this.customers[0];
            this.customerEdit = false;
        }
    }

    saveCarTank() {
        if (this.carTankCreate) {
            this.carTanks.push(this.carTank);
            this.getCarTankTitle(this.carTank);
            this.carTankCreate = false;
        } else {
            this.carTanks[this.carTanks.indexOf(this.tempEditCarTank)] = this.carTank;
            this.carTankEdit = false;
        }
        this.carTank = new CarTank();
    }

    changeTankType() {
        this.carTank.radius = null;
        this.carTank.longitude = null;
        this.carTank.latitude = null;
    }

    trackCustomerTypeById(index: number, item: CustomerType) {
        return item.id;
    }

    trackCurrencyById(index: number, item: Currency) {
        return item.id;
    }

    save() {
        if (this.customer.id) {
            this.nextStep();
        } else {
            this.customer = this.customers[0];
            if (this.vehicleModel.havePrimitiveMeasure) {
                this.carRfId.active = true;
                this.customer.carRfIds = [];
                this.customer.carRfIds.push(this.carRfId);
                this.customer.carTanks = this.carTanks;
            }
            if (this.customer.id !== undefined) {
                this.subscribeToSaveResponse(
                    this.customerService.updateCar(this.customer));
            } else {
                this.subscribeToSaveResponse(
                    this.customerService.createCar(this.customer));
            }
        }
    }

    previousStep() {
        if (this.activeIndex > 0) {
            if (this.orderId) {
                const index = this.activeIndex--;
                if (this.orderType === this.OrderType[this.OrderType.BOUNDARY_TRANSIT]) {
                    this.router.navigate([`/boundary-sell/${this.orderId}/edit/transit/${index}`]);
                } else {
                    this.router.navigate([`/boundary-sell/${this.orderId}/edit/tranship/${index}`]);
                }
            } else {
                this.activeIndex--;
            }
        }
    }

    saveOrder(payment, refresh) {
        this.boundaryDTO.orderType = this.orderType;

        if (this.activeIndex === 1) {
            if (!payment) {
                this.orderService.createBoundary(this.boundaryDTO)
                    .subscribe((value) => {
                        this.boundaryDTO = value.body;
                        this.router.navigate(['/boundary-sell']);
                    });
            } else {
                this.orderService.createBoundaryForPayment(this.boundaryDTO)
                    .subscribe((identifierResponse) => {
                        this.identifier = identifierResponse.body;
                    });
                this.activeIndex = 2;
            }
        } else if (this.activeIndex === 2) {
            if (refresh) {
                this.orderService.createBoundaryForPayment(this.boundaryDTO)
                    .subscribe((identifierResponse) => {
                        this.identifier = identifierResponse.body;
                        this.payStatus = '';
                    });
            } else {
                this.ePaymentComponent.pay();
            }
        }
    }

    calculatePrice() {
        this.productRateService.getPriceForBoundarySell(this.boundaryDTO)
            .subscribe((value) => {
                this.showPriceTable = true;
                this.responseBoundaryDTO = value.body;
                this.responseBoundaryDTO.boundaryItems.sort((a, b) => {
                    return a.price - b.price;
                });
                this.responseBoundaryDTO.boundaryItems.forEach((boundaryItem: BoundaryItemDTO) => {
                    if (boundaryItem.carTank) {
                        this.getCarTankTitle(boundaryItem.carTank);
                    }
                });
            });
    }

    onPayStatus(status) {
        this.payStatus = status;
    }

    onChangeVehicleModel(vehicleModelId) {
        this.carRfId = new CarRfId();
        this.customer.productId = null;
        this.customer.transitPlaque = '';
        this.vehicleModel = this.vehicleModels.find((value) => value.id === vehicleModelId);
        this.customer.vehicleModelTitle = this.vehicleModel.title;
        this.customer.vehicleModelHavePrimitiveMeasure = this.vehicleModel.havePrimitiveMeasure;
        this.boundaryDTO.vehicleModelId = vehicleModelId;
    }

    onChangeLocation(locationId) {
        this.selectedLocation = this.locations.find((l) => l.id === locationId);
        if (this.selectedLocation.country) {
            this.boundaryDTO.targetCountryId = this.selectedLocation.country.id;
            this.country = this.selectedLocation.country;
        } else {
            this.country = new Country();
            this.boundaryDTO.targetCountryId = null;
            this.alertService.error('error.boundary.country.not.found');
        }
        if (this.boundaryDTO.locationId !== locationId) {
            this.boundaryDiscountId = null;
        }
        this.boundaryDTO.orderDiscount = new OrderDiscountDTO();
        if (locationId && this.boundaryDTO.targetCountryId && this.boundaryDTO.vehicleModelId && this.customer.productId) {
            this.boundaryDiscountService.query(locationId, this.boundaryDTO.targetCountryId, this.boundaryDTO.vehicleModelId, this.customer.productId)
                .subscribe((res) => {
                    this.boundaryDiscounts = res.body;
                    const boundaryDiscount = {
                        value: '',
                        label: ''
                    };
                    this.customBoundaryDiscounts = [];
                    this.customBoundaryDiscounts.push(boundaryDiscount);
                    for (let i = 0; i < this.boundaryDiscounts.length; i++) {
                        this.customBoundaryDiscounts.push({
                            value: this.boundaryDiscounts[i].id,
                            label: `تا ${this.boundaryDiscounts[i].kilometer} کیلومتر - ${this.boundaryDiscounts[i].liter} لیتر `
                        });
                    }
                });
        }

        if (!this.vehicleModel.havePrimitiveMeasure && this.boundaryDTO.orderId) {
            this.boundaryDTO.boundaryItems.forEach((value) => {
                this.productService.find(value.productId).subscribe((p) => {
                    value.productTitle = p.body.title;
                });
            });
        }
        this.locationService.isDay(locationId).subscribe((locationDate) => {
            this.locationDate = locationDate.body.locationDay;
            this.serverDate = locationDate.body.serverDate;
            this.isDay = locationDate.body.day;
        });

        this.tempPumpBoundaryItem = this.boundaryDTO.boundaryItems.find((value) => value.amountType === this.AmountType[this.AmountType.PUMP_NOZZLE_AMOUNT]);
        if (this.tempBoundaryItems.length === 0) {
            this.tempBoundaryItems = JSON.parse(JSON.stringify(this.boundaryDTO.boundaryItems));
        }
        if (this.selectedLocation.transhipType === this.TranshipType[this.TranshipType.INSIDE_TO_OUT] &&
            this.tempPumpBoundaryItem &&
            this.orderType === this.OrderType[this.OrderType.BOUNDARY_TRANSHIP]) {
            // const temp = this.boundaryDTO.boundaryItems.find((value) => value.amountType === this.tempPumpBoundaryItem.amountType);
            // const index = this.boundaryDTO.boundaryItems.indexOf(temp);
            // this.boundaryDTO.boundaryItems.splice(index, 1);
            delete this.boundaryDTO.boundaryItems[this.tempPumpBoundaryItem];
        } else if (this.selectedLocation.transhipType === this.TranshipType[this.TranshipType.ONLY_PUMP_NOZZLE] &&
            this.orderType === this.OrderType[this.OrderType.BOUNDARY_TRANSHIP]) {
            this.boundaryDTO.boundaryItems = [];
            this.boundaryDTO.boundaryItems.push(this.tempPumpBoundaryItem);
        } else {
            // if (!tempPumpBoundaryItem) {
            this.boundaryDTO.boundaryItems = this.tempBoundaryItems;
            // }
        }

    }

    getCarTankTitle(carTank: CarTank) {
        if (carTank) {
            let tankTitle = '';
            if (carTank.tankType === this.TankType[this.TankType.CUBE]) {
                tankTitle = ` (${carTank.longitude} × ${carTank.latitude} × ${carTank.height})`;
            } else {
                tankTitle = ` (${carTank.radius} × ${carTank.height})`;
            }

            this.translateService.get('samtagatewayApp.TankType.' + carTank.tankType).subscribe((title) => {
                carTank.title = title + tankTitle;
            });
        }
    }

    validateAmounts() {
        this.showCalculatePrice = true;
        const carTank4 = this.boundaryDTO.boundaryItems.find((value) => value.amountType === this.AmountType[this.AmountType.CAR_TANK_4_AMOUNT] &&
            (value.amount !== undefined || value !== ''));
        const pumpNozzle = this.boundaryDTO.boundaryItems.find((value) => value.amountType === this.AmountType[this.AmountType.PUMP_NOZZLE_AMOUNT] &&
            (value.amount !== undefined || value !== ''));
        const emptyCarTank = this.boundaryDTO.boundaryItems.find((value) => value.amountType === this.AmountType[this.AmountType.NORMAL] && value.height === undefined);

        if (this.orderType === this.OrderType[this.OrderType.BOUNDARY_TRANSIT]) {

            if (this.vehicleModel.havePrimitiveMeasure) {
                if (!carTank4 || !pumpNozzle || emptyCarTank) {
                    this.showCalculatePrice = false;
                    return null;
                }
            }
            return null;

        } else if (this.orderType === this.OrderType[this.OrderType.BOUNDARY_TRANSHIP]) {

            if (this.selectedLocation.transhipType === this.TranshipType[this.TranshipType.INSIDE_TO_OUT]) {
                if (emptyCarTank || !carTank4) {
                    this.showCalculatePrice = false;
                    return null;
                }
                return null;
            } else if (this.selectedLocation.transhipType === this.TranshipType[this.TranshipType.OUT_TO_INSIDE_WHIT_OUT_PRIMITIVE] ||
                this.selectedLocation.transhipType === this.TranshipType[this.TranshipType.OUT_TO_INSIDE_WHIT_PRIMITIVE]) {
                if (!carTank4 || !pumpNozzle || emptyCarTank) {
                    this.showCalculatePrice = false;
                    return null;
                }
                return null;
            } else if (this.selectedLocation.transhipType === this.TranshipType[this.TranshipType.ONLY_PUMP_NOZZLE]) {
                if (!pumpNozzle) {
                    this.showCalculatePrice = false;
                    return null;
                }
                return null;
            } else {
                this.showCalculatePrice = false;
                return null;
            }
        }
    }

    search() {
        if (this.searchRfId) {
            this.onChangeRfId(this.searchRfId);
        } else if (this.searchPlaque) {
            this.onChangePlaque(this.searchPlaque);
        }
    }

    create() {
        this.existCustomer = false;
        this.customer = new Customer();
        /* this.loadCustomerTypes();*/
        this.loadProducts();
        this.loadVehicleModels();
    }

    private onError(error: any) {
        this.alertService.error(error.message, null, null);
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Customer>>) {
        result.subscribe((res: HttpResponse<Customer>) =>
            this.onSaveSuccess(res.body));
    }

    private onSaveSuccess(result: Customer) {
        this.customer = result;
        this.customer.carTanks.forEach((carTank) => {
            this.getCarTankTitle(carTank);
        });
        // if (this.customer.typeId) {
        //     this.customer.typeTitle = this.customerTypes.find((value) => value.id === this.customer.typeId).title;
        // }
        if (this.vehicleModel.havePrimitiveMeasure) {
            this.customer.productTitle = this.products.find((value) => value.id === this.customer.productId).title;
        }
        this.nextStep();
        this.eventManager.broadcast({name: 'customerListModification', content: 'OK'});
    }

    private nextStep() {
        this.activeIndex = 1;
        /*this.loadCountries();*/
        this.loadCurrencies();
        this.loadLocation();
        if (!this.boundaryDTO.orderId) {
            this.boundaryDTO = new BoundaryDTO();
            this.boundaryDTO.boundaryItems = [];
            this.boundaryDTO.customerId = this.customer.id;
            this.boundaryDTO.vehicleModelId = this.vehicleModel.id;
            this.boundaryDTO.orderType = this.orderType;
            if (this.vehicleModel.havePrimitiveMeasure) {
                this.customer.carTanks.forEach((value) => {
                    const boundaryItem = new BoundaryItemDTO();
                    boundaryItem.carTankId = value.id;
                    boundaryItem.carTank = value;
                    boundaryItem.amountType = this.AmountType[this.AmountType.NORMAL];
                    boundaryItem.productId = this.customer.productId;
                    this.boundaryDTO.boundaryItems.push(boundaryItem);
                });
                this.boundaryDTO.boundaryItems.push({ // create init boundary item for pump.
                    productId: this.customer.productId,
                    amountType: this.AmountType[this.AmountType.PUMP_NOZZLE_AMOUNT]
                });
                this.boundaryDTO.boundaryItems.push({ // create init boundary item for car tank 4.
                    productId: this.customer.productId,
                    amountType: this.AmountType[this.AmountType.CAR_TANK_4_AMOUNT]
                });
            } else {
                this.vehicleCapacityService.query(this.vehicleModel.id)
                    .subscribe((value) => {
                        value.body.forEach((vehicleCapacity: VehicleCapacity) => {
                            this.boundaryDTO.boundaryItems.push({
                                amount: vehicleCapacity.capacity,
                                maxAmount: vehicleCapacity.capacity,
                                productId: vehicleCapacity.productId,
                                productTitle: vehicleCapacity.productTitle
                            });
                        });

                    });
            }
        } else {
            if (this.boundaryDTO.totalPrice) {
                this.calculatePrice();
            }
        }
        this.boundaryDTO.boundaryItems.forEach((boundaryItem) => {
            this.getCarTankTitle(boundaryItem.carTank);
        });
        this.validateAmounts();
    }

    onChangeSelector(data) {
        if (data) {
            this.boundaryDiscountId = data;
            this.boundaryDTO.orderDiscount = new OrderDiscountDTO();
            this.boundaryDTO.orderDiscount.boundaryDiscountId = this.boundaryDiscountId;
        } else {
            this.boundaryDTO.orderDiscount = new OrderDiscountDTO();
        }
    }
}
