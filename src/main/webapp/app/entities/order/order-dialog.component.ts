import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {
    CostRateFilter,
    CreditNotDepositedInTime,
    FlightConditions,
    Order,
    SellProductAmount,
    TypeOfFuelReceipt
} from './order.model';

import {OrderPopupService} from './order-popup.service';
import {OrderService} from './order.service';
import {Customer, CustomerService} from '../customer';
import {Currency, CurrencyService} from '../currency';
import {SellContract, SellContractService} from '../sell-contract';
import {SellContractProduct, SellContractProductService} from '../sell-contract-product';
import {OrderProduct} from '../order-product';
import {Location, LocationService} from '../location';
import {Depot, DepotService} from '../depot';
import {CurrencyRateGroup, CurrencyRateGroupService} from '../currency-rate-group';
import {TranslateService} from '@ngx-translate/core';
import {MenuItem} from 'primeng/primeng';
import {CustomerCredit, CustomerCreditService} from '../customer-credit';
import {CostGroupService} from '../cost-group';
import {OrderCredit} from '../order-credit';
import {BuyGroup, BuyTypeService, BuyTypeUsage, TypeEffect} from '../buy-type';
import {Person, PersonService} from '../person';
import {CostService} from '../cost';
import {RefuelCenter} from '../refuel-center/refuel-center.model';
import {RefuelCenterService} from '../refuel-center/refuel-center.service';
import {DepotType} from '../depot/depot.model';
import {DayDepot} from '../day-depot/day-depot.model';
import {DayDepotService} from '../day-depot/day-depot.service';
import {LogBook} from '../log-book/log-book.model';
import {OilTankType} from '../oil-tank/oil-tank.model';
import {Metre} from '../metre/metre.model';
import {FuelType, MetreLog} from '../metre-log/metre-log.model';
import {MetreService} from '../metre/metre.service';
import {CostMethod} from '../cost-group/cost-group.model';
import {BankTransactionService} from '../bank-transaction/bank-transaction.service';
import {LogBookService} from '../log-book/log-book.service';
import {Airport} from '../airport/airport.model';
import {AirportService} from '../airport/airport.service';
import {CustomerPerson} from '../sell-contract/sell-contract.model';
import {EPaymentComponent} from '../../shared/e-payment/e-payment.component';

@Component({
    selector: 'jhi-order-dialog',
    templateUrl: './order-dialog.component.html',
    styleUrls: ['./order-dialog.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class OrderDialogComponent implements OnInit {
    buyGroup = BuyGroup;
    persons: Person[];
    sourceAirports: Airport[];
    targetAirports: Airport[];
    items: MenuItem[];
    order: Order;
    // isDepot: boolean;
    depotId: number;
    depot: Depot;
    isSaving: boolean;
    isView: boolean;
    productCreate: boolean;
    customers: Customer[];
    currencies: Currency[];
    orderProduct: OrderProduct;
    tempOrderProduct: OrderProduct;
    logBook: LogBook = new LogBook();
    metreLog: MetreLog = new MetreLog();
    metres: Metre[];
    metre: Metre;
    maxEndMetreNumber: number;
    dayDepots: DayDepot[];
    sellContract: SellContract;
    buyGroups: BuyGroup[];
    sellContractProducts: SellContractProduct[];
    currencyRateGroups: CurrencyRateGroup[];
    locations: Location[];
    depots: Depot[];
    customerCredits: CustomerCredit[];
    mapSiteItems: any;
    activeIndex = 0;
    FlightConditions = FlightConditions;
    TypeOfFuelReceipt = TypeOfFuelReceipt;
    DepotType = DepotType;
    OilTankType = OilTankType;
    FuelType = FuelType;
    CostMethod = CostMethod;
    disableButtons: boolean;
    selectedCustomerCredits: CustomerCredit[];
    hasCreditNotDepositedInTime = false;
    minusAmounts = [];
    customerPerson: CustomerPerson;
    customerPersons: CustomerPerson[];

    serverDate: any;
    locationDate: any;

    // exportMode: any;
    mode: any;
    capacity: number;
    typeOfFuelReceipt: TypeOfFuelReceipt[];
    private currency: Currency;
    isDay: boolean;
    summary: string;
    payId: string;
    payStatus: string;
    @ViewChild('ePayment') ePaymentComponent: EPaymentComponent;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private translateService: TranslateService,
                private jhiAlertService: JhiAlertService,
                private sellContractService: SellContractService,
                private orderService: OrderService,
                private logBookService: LogBookService,
                private metreService: MetreService,
                private currencyService: CurrencyService,
                private costGroupService: CostGroupService,
                private customerCreditService: CustomerCreditService,
                private depotService: DepotService,
                private buyTypeService: BuyTypeService,
                private dayDepotService: DayDepotService,
                private locationService: LocationService,
                private sellContractProductService: SellContractProductService,
                private currencyRateGroupService: CurrencyRateGroupService,
                private customerService: CustomerService,
                private activatedRoute: ActivatedRoute,
                private costService: CostService,
                private refuelCenterService: RefuelCenterService,
                private airportService: AirportService,
                private personService: PersonService,
                private bankTransactionService: BankTransactionService,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {
        this.items = [
            {
                label: 'اطلاعات اولیه',
                command: (event: any) => {
                    this.activeIndex = 0;
                }
            },
            {
                label: 'اطلاعات فراورده',
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
        this.serverDate = '';
        this.locationDate = '';
        this.isDay = true;
        this.disableButtons = true;
        this.currency = new Currency();
        this.orderProduct = new OrderProduct;
        this.customerPerson = new CustomerPerson();
        this.sellContract = new SellContract;

        this.isSaving = false;
        this.buyGroups = [];
        this.order = new Order();
        this.route.params.subscribe((params) => {
            this.route.data.subscribe((data) => {
                this.isView = !!data['isView'];
            });
            this.mode = params['mode'];
            if (params['activeIndex']) {
                UsefulId.activeIndex = Number(params['activeIndex']);
            } else {
                UsefulId.activeIndex = 0;
            }
            if (params['id']) {
                this.orderService.find(params['id']).subscribe((order) => {
                    this.order = order.body;
                    this.order.productIds = this.order.orderProducts.map((value) => value.sellContractProductId);
                    if (this.mode === 'airplane') {
                        if (UsefulId.activeIndex === 1) {
                            this.customerService.find(this.order.customerId)
                                .subscribe((customer) => {
                                    this.capacity = customer.body.capacity;
                                });
                        }
                        this.order.orderProducts.forEach((value) => {
                                if (value.id != null) {
                                    this.logBookService.findByOrderProductId(value.id).subscribe((res) => {
                                        value.logBook = res.body;
                                    });
                                }
                            }
                        );

                    }
                    this.activeIndex = UsefulId.activeIndex;
                    if (UsefulId.activeIndex === 2 && this.order.buyGroup !== 'CASH') {
                        this.orderService.hasCreditNotDepositedInTime(this.order.personId, this.order.customerId).subscribe((value) => {
                            this.hasCreditNotDepositedInTime = value.body.toString() === CreditNotDepositedInTime[CreditNotDepositedInTime.SELL_LIMIT];

                            if (this.hasCreditNotDepositedInTime) {
                                this.jhiAlertService.error('error.credit.deprecated.inTime', null, null);
                            } else if (value.body.toString() === CreditNotDepositedInTime[CreditNotDepositedInTime.SELL_ALARM]) {
                                this.jhiAlertService.info('error.credit.deprecated.inTime', null);
                            } else {
                                this.customerCreditService.queryByFilter(
                                    this.order.buyGroup,
                                    this.order.customerId,
                                    this.order.personId,
                                    this.order.currencyRateGroupId,
                                    this.order.productIds,
                                    this.order.currencyId,
                                    this.order.locationId
                                )
                                    .subscribe((res: HttpResponse<CustomerCredit[]>) => {
                                        this.customerCredits = res.body;
                                        if (!this.customerCredits || this.customerCredits.length === 0) {
                                            this.jhiAlertService.error('error.credit.not.found', null, null);
                                        }
                                    }, (res: HttpErrorResponse) => this.jhiAlertService.error('error.credit.not.found', null, null));
                            }
                        });
                    } else if (UsefulId.activeIndex === 2 && this.order.buyGroup === 'CASH') {
                        this.payId = this.activatedRoute.snapshot.params['payId'] ? this.activatedRoute.snapshot.params['payId'] : '';
                    }
                    if (this.order.orderCredits == null) {
                        this.order.orderCredits = [];
                    }
                    if (UsefulId.activeIndex === 0) {
                        this.locationSet();
                    } else if (UsefulId.activeIndex === 1) {
                        this.buyTypeSet(this.order.buyGroup);
                        this.calSummary();
                    } else {
                        this.calSummary();
                    }
                    this.setBreadCrumb();
                    this.updateProductIds();

                    this.customerPerson = new CustomerPerson();
                    /* this.customerPerson.id = this.order.customerId + "/" + this.order.personId;
                     this.customerPerson.customerId = this.order.customerId;
                     this.customerPerson.personId = this.order.personId;*/
                });

            } else {
                this.customerPerson = new CustomerPerson();
                this.order.orderProducts = [];
                this.order.productIds = [];
                this.order.orderCredits = [];
                this.order.buyGroup = this.buyGroup[this.buyGroup.CREDIT];
                this.setBreadCrumb();
                this.locationService.queryByOrder()
                    .subscribe((res: HttpResponse<Location[]>) => {
                        this.order.locationId = res.body[0].id;
                        this.locationChanged();
                    }, (res: HttpErrorResponse) => this.onError(res.message));
            }
        });

        /*this.locationService.queryByLevel(2)
            .subscribe((res: HttpResponse<Location[]>) => {
                this.locations = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));*/
    }

    onPayStatus(status) {
        this.payStatus = status;
    }

    setBreadCrumb() {
        this.mapSiteItems = [];
        this.translateService.get('global.menu.home').subscribe((title) => {
            this.mapSiteItems.push({label: title, routerLink: ['/']});
        });

        this.translateService.get('global.menu.sell.order' + (this.mode === 'order' ? '' : '_' + this.mode)).subscribe((title) => {
            this.mapSiteItems.push({
                    label: title
                    , routerLink: ['/order/' + this.mode]
                }
            );
        });
        if (this.order && this.order.id) {
            this.translateService.get('niopdcgatewayApp.sellContract.home.editLabel').subscribe((title) => {
                this.mapSiteItems.push({label: title});
            });
        } else {
            this.translateService.get('niopdcgatewayApp.sellContract.home.createLabel').subscribe((title) => {
                this.mapSiteItems.push({label: title});
            });

        }
    }

    newOrderProduct() {
        this.orderProduct = new OrderProduct();
        this.logBook = new LogBook();
        this.metreLog = new MetreLog();
        this.productCreate = true;
    }

    addOrderProduct() {
        this.tempOrderProduct = null;
        if (!this.order.orderProducts) {
            this.order.orderProducts = [];
        }
        this.order.orderProducts.forEach((value) => {
            if (value.sellContractProductId === this.orderProduct.sellContractProductId) {
                return;
            }
        });
        if (this.mode === 'airplane') {
            if (this.capacity - this.orderProduct.amount >= 0 || true) {
                this.capacity = this.capacity - this.orderProduct.amount;
                this.sellContractProductService.find(this.orderProduct.sellContractProductId).subscribe(
                    (res) => {
                        this.add(res.body);
                    }, (res: HttpErrorResponse) => this.onError(res.message));
            }
        } else {
            this.sellContractProductService.find(this.orderProduct.sellContractProductId).subscribe(
                (res) => {
                    this.add(res.body);
                }, (res: HttpErrorResponse) => this.onError(res.message));
        }
    }

    add(res) {
        this.orderProduct.sellContractProductTitle = res.productTitle;
        this.orderProduct.productColor = res.productColor;
        this.orderProduct.rateGroupId = res.rateGroupId;
        this.orderProduct.rateGroupTitle = res.rateGroupTitle;
        this.orderProduct.buyGroups = res.buyGroups;
        this.orderProduct.productId = res.productId;
        this.orderProduct.currentAmount = this.orderProduct.amount;

        let productId: number;
        productId = this.orderProduct.sellContractProductId;

        if (this.mode === 'airplane') {
            if (this.order.typeOfFuelReceipt !== this.TypeOfFuelReceipt[this.TypeOfFuelReceipt.PIPE_LINE_SALES]) {
                this.metreLog.fuelType = this.order.fuelType;
                this.logBook.fuelType = this.order.fuelType;
                this.orderProduct.amount = this.metreLog.endMeter - this.metreLog.startMeter;
                this.logBook.amount = this.orderProduct.amount;
                this.metreLog.amount = this.orderProduct.amount;
                this.logBook.metreLog = this.metreLog;
                this.orderProduct.logBook = this.logBook;
            } else {
                this.logBook.amount = this.orderProduct.amount;
                this.orderProduct.logBook = this.logBook;
            }
            this.metres = null;
            this.dayDepots = null;
            this.findRateAndCost(res, this.orderProduct);

            this.productCreate = false;
            this.newOrderProduct();
        } else if (this.mode === 'exchange' || this.mode === 'export') {
            this.metres = null;
            this.dayDepots = null;
            this.findRateAndCost(res, this.orderProduct);
            this.productCreate = false;
        } else {
            if (this.order.orderProducts.length > 0 && this.order.orderProducts.findIndex(value => value.productId == this.orderProduct.productId) == -1) {
                this.jhiAlertService.error('error.order.product.not.equal', null, null);
            } else if (this.order.orderProducts.length > 0 && this.order.orderProducts.length > 0 && this.order.orderProducts.findIndex((value => value.sellContractProductId == this.orderProduct.sellContractProductId)) !== -1) {
                this.jhiAlertService.error('error.order.product.sell.contract.not.equal', null, null);
            } else {
                this.customerCreditService
                    .getAllCustomerCreditsByFilterQuota(
                        this.order.customerId,
                        productId
                    )
                    .subscribe((customerCredit: HttpResponse<CustomerCredit>) => {
                        if (customerCredit.body.currentAmount >= this.orderProduct.amount) {
                            this.metres = null;
                            this.dayDepots = null;
                            this.findRateAndCost(res, this.orderProduct);

                            this.productCreate = false;
                            this.newOrderProduct();
                        } else if (this.mode === 'order') {
                            this.jhiAlertService.error('error.credit.not.exist', null, null);
                        } else {
                            this.productCreate = false;
                            this.newOrderProduct();
                        }

                    });
            }


        }
    }

    removeProduct(sellContractProductId, amount) {
        const orderProduct = this.order.orderProducts.filter(((value) => (value.sellContractProductId === sellContractProductId && value.amount === amount)))[0];
        if (orderProduct.id != null && orderProduct.logBook != null) {
            if (orderProduct.logBook.metreLog != null) {
                this.minusAmounts.push({
                    amount: orderProduct.amount,
                    metreId: orderProduct.logBook.metreLog.metreId
                });
            }
        }
        this.order.orderProducts.splice(
            this.order.orderProducts
                .findIndex((value) => value.sellContractProductId === sellContractProductId && value.amount === amount)
            , 1
        );
        this.calPrice();
    }

    editProduct(item) {
        this.orderProduct = Object.assign({}, item);
        this.tempOrderProduct = Object.assign({}, item);
        this.removeProduct(this.tempOrderProduct.sellContractProductId, this.tempOrderProduct.amount);
        this.setProducts(item.sellContractProductId);
        if (this.mode === 'airplane') {
            this.logBook = this.orderProduct.logBook;
            this.metreLog = this.orderProduct.logBook.metreLog;
        }
        this.productCreate = true;
    }

    cancelProduct() {
        if (this.tempOrderProduct != null) {

            if (this.order.orderProducts
                .findIndex((value) => value === this.orderProduct) !== -1)
                this.order.orderProducts.splice(
                    this.order.orderProducts
                        .findIndex((value) => value === this.orderProduct)
                    , 1
                );
            if (this.tempOrderProduct != null) {
                this.order.orderProducts.push(this.tempOrderProduct);
            }
            this.tempOrderProduct = null;
            this.calPrice();
        }
        this.newOrderProduct();
        this.productCreate = false;
    }

    findRateAndCost(res, orderProduct: OrderProduct) {
        const costRateFilter = new CostRateFilter;
        costRateFilter.currencyId = this.order.currencyId;
        costRateFilter.currencyRateGroupId = this.order.currencyRateGroupId;
        const sellProductAmount = new SellProductAmount;
        sellProductAmount.sellContractProductId = res.id;
        sellProductAmount.amount = orderProduct.amount;
        costRateFilter.sellProductAmount = sellProductAmount;
        let costMethod: any;
        if (this.order.fuelType === this.FuelType[this.FuelType.FUEL]) {
            costMethod = this.CostMethod[this.CostMethod.NORMAL_SALES];
        } else if (this.order.fuelType === this.FuelType[this.FuelType.DE_FUEL]) {
            costMethod = this.CostMethod[this.CostMethod.DEFUEL];
        } else {
            costMethod = this.CostMethod[this.CostMethod.NORMAL_SALES];
        }
        this.costGroupService.getAllCostRatesByFilter(costRateFilter, costMethod)
            .subscribe((data) => {
                const rateResponse = data.body;
                orderProduct.ratePrice = rateResponse.productRate + (rateResponse.productRateContainer != null ? rateResponse.productRateContainer : 0);
                orderProduct.productRatePrice = rateResponse.productRate;
                orderProduct.containerRatePrice = rateResponse.productRateContainer;
                orderProduct.price = rateResponse.basePrice;
                orderProduct.productCost = 0;
                if (rateResponse.costResponses != null) {
                    rateResponse.costResponses.forEach((value) => {
                        orderProduct.productCost += value.price;
                    });
                }
                orderProduct.costResponses = rateResponse.costResponses;
                orderProduct.currentPrice = orderProduct.price;
                orderProduct.currentProductCost = orderProduct.productCost;
                this.order.orderProducts.push(orderProduct);
                this.calPrice();
            });
    }

    calPrice() {
        this.order.productIds = [];
        this.order.price = 0;
        this.order.productPrice = 0;
        this.order.containerPrice = 0;
        this.order.costPrice = 0;
        this.order.orderProducts.forEach((value) => {
            this.order.productPrice += value.ratePrice * value.amount;
            this.order.containerPrice += value.containerRatePrice * value.amount;
            this.order.costPrice += value.productCost;
            this.order.productIds.push(value.sellContractProductId);
        });
        this.order.price = this.order.productPrice + this.order.costPrice + this.order.containerPrice;
    }

    updateProductIds() {
        this.order.productIds = [];
        this.order.orderProducts.forEach((value) => {
            value.currentAmount = value.amount;
            value.currentPrice = value.basePrice;
            value.price = value.basePrice;
            // value.costResponses = value.orderCosts;
            value.ratePrice = value.productRatePrice + value.containerRatePrice;
            value.currentProductCost = value.productCost;
            this.order.productIds.push(value.sellContractProductId);
        });
    }

    locationChanged() {
        this.order.customerId = null;
        this.order.personId = null;
        this.order.buyGroup = null;

        if (this.mode !== 'airplane') {
            this.locationService.isDay(this.order.locationId).subscribe((locationDate) => {
                this.locationDate = locationDate.body.locationDay;
                this.serverDate = locationDate.body.serverDate;
                this.isDay = locationDate.body.day;
            });
        }

        this.sellContractService.findByLocation(this.order.locationId, this.mode)
            .subscribe((res: HttpResponse<CustomerPerson[]>) => {
                this.customerPersons = res.body;
                if (this.customerPersons.length > 0) {
                    this.changeCustomerPerson(this.customerPersons[0]);
                } else {
                    this.customerPerson = null;
                    this.changeCustomerPerson(null);
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));

    }

    locationSet() {
        if (this.mode !== 'airplane') {
            this.locationService.isDay(this.order.locationId).subscribe((locationDate) => {
                this.locationDate = locationDate.body.locationDay;
                this.serverDate = locationDate.body.serverDate;
                this.isDay = locationDate.body.day;
            });
        } else {
            this.serverDate = this.order.registerDate;
        }

        this.sellContractService.findByLocation(this.order.locationId, this.mode)
            .subscribe((res: HttpResponse<CustomerPerson[]>) => {
                this.customerPersons = res.body;
                if (this.customerPersons.length > 0) {
                    if (this.mode === 'exchange' || this.mode === 'export') {
                        this.customerPerson = this.customerPersons.find(
                            (value) =>
                                (
                                    value.personId === this.order.personId
                                    && value.sellContractId === this.order.sellContractId
                                )
                        );
                    } else {
                        this.customerPerson = this.customerPersons.find(
                            (value) =>
                                (
                                    value.customerId === this.order.customerId
                                    && value.personId === this.order.personId
                                    && value.sellContractId === this.order.sellContractId
                                )
                        );
                    }
                    this.setCustomerPerson(this.customerPerson);
                } else {
                    this.setCustomerPerson(null);
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));

    }

    changeCustomerPerson(data) {
        if (data == null) {
            this.customerPerson = new CustomerPerson();
            this.order.sellContractProductIds = null;
            this.order.depotId = null;
            this.depotChanged(null);
        } else {
            this.customerPerson = data;
            this.order.customerId = data.customerId;
            this.order.personId = data.personId;
            this.order.sellContractId = data.sellContractId;

            this.order.sellContractProductIds = null;
            this.order.depotId = null;
            this.depotService.findBySellContractCustomer(this.order.customerId, this.order.personId, this.order.sellContractId, this.mode)
                .subscribe((res1: HttpResponse<Depot[]>) => {
                    this.depots = res1.body;
                    if (this.depots.length > 0) {
                        this.order.depotId = this.depots[0].id;
                        this.depotChanged(this.order.depotId);
                    } else {
                        this.depotChanged(null);
                    }
                }, (res1: HttpErrorResponse) => this.onError(res1.message));
        }
    }

    /* personChanged(personId) {
         if (personId == null) {
             this.customerChanged(null);
         } else {
             if (this.order.customerId != null && personId != null) {
                 this.depotService.findBySellContractCustomer(this.order.customerId, personId)
                     .subscribe((res1: HttpResponse<Depot[]>) => {
                         this.depots = res1.body;
                         if (this.depots.length > 0) {
                             this.order.depotId = this.depots[0].id;
                             this.depotChanged(this.order.depotId);
                         } else {
                             this.depotChanged(null);
                         }
                     }, (res1: HttpErrorResponse) => this.onError(res1.message));

             }
         }
     }

     personSet(personId) {
         this.depots = [];
         this.depotService.findBySellContractCustomer(this.order.customerId, personId)
             .subscribe((res1: HttpResponse<Depot[]>) => {
                 this.depots = res1.body;
                 this.depotSet(this.order.depotId)
             }, (res1: HttpErrorResponse) => this.onError(res1.message));
     }

     customerChanged(customerId) {
         this.order.sellContractProductIds = null;
         this.order.depotId = null;
         if (customerId == null) {
             this.depotChanged(null);
             this.order.personId = null;
             this.persons = [];
         }
         this.depots = [];
         if (customerId != null) {
             this.personService.findByLocation(this.order.locationId, customerId)
                 .subscribe((res: HttpResponse<Person[]>) => {
                     this.persons = res.body;
                     if (this.persons.length > 0) {
                         this.order.personId = this.persons[0].id;
                         this.personChanged(this.order.personId);
                     } else {
                         this.depotChanged(null);
                     }
                 }, (res: HttpErrorResponse) => this.onError(res.message));
         }
     }

     customerSet(customerId) {
         this.persons = [];
         this.personService.findByLocation(this.order.locationId, customerId)
             .subscribe((res: HttpResponse<Person[]>) => {
                 this.persons = res.body;
                 this.personSet(this.order.personId);
             }, (res: HttpErrorResponse) => this.onError(res.message));
     }*/

    setCustomerPerson(data) {
        if (data != null) {
            this.order.customerId = data.customerId;
            this.order.personId = data.personId;

            this.depotService.findBySellContractCustomer(this.order.customerId, this.order.personId, this.order.sellContractId, this.mode)
                .subscribe((res1: HttpResponse<Depot[]>) => {
                    this.depots = res1.body;
                    this.depotSet(this.order.depotId);
                }, (res1: HttpErrorResponse) => this.onError(res1.message));
        } else {
            this.order.sellContractProductIds = null;
            this.order.depotId = null;
            this.depotSet(null);
        }

    }

    changeProducts(sellContractProductId) {
        this.sellContractProductService.find(sellContractProductId).subscribe((sellContractProductRes) => {
            const productId = sellContractProductRes.body.productId;
            this.orderProduct.productColor = sellContractProductRes.body.productColor;
            console.log(this.orderProduct.productColor);
            const oilTankTypes = [];
            // let tempDepot = this.depots.find(value => value.id == this.order.depotId);
            this.depotService.find(this.order.depotId).subscribe((depot) => {
                const tempDepot = depot.body;
                switch (this.order.typeOfFuelReceipt) {
                    case this.TypeOfFuelReceipt[this.TypeOfFuelReceipt.PIPE_LINE_SALES]: {
                        oilTankTypes.push(this.OilTankType[this.OilTankType.SERVICE_TANK]);
                        oilTankTypes.push(this.OilTankType[this.OilTankType.MAIN]);
                        this.dayDepotService.queryByProductAndOilTankType(productId, oilTankTypes, tempDepot.refuelCenterId, this.order.registerDate)
                            .subscribe((res) => {
                                this.dayDepots = res.body;
                            });
                        break;
                    }
                    case this.TypeOfFuelReceipt[this.TypeOfFuelReceipt.TANKER_SALES]: {
                        oilTankTypes.push(this.OilTankType[this.OilTankType.PLATFORM]);
                        this.dayDepotService.queryByProductAndOilTankType(productId, oilTankTypes, tempDepot.refuelCenterId, this.order.registerDate)
                            .subscribe((res) => {
                                this.dayDepots = res.body;
                            });
                        break;
                    }
                    case this.TypeOfFuelReceipt[this.TypeOfFuelReceipt.UNIT_TO_AIRPLANE]: {
                        oilTankTypes.push(this.OilTankType[this.OilTankType.UNIT]);
                        this.dayDepotService.queryByProductAndOilTankType(productId, oilTankTypes, tempDepot.refuelCenterId, this.order.registerDate)
                            .subscribe((res) => {
                                this.dayDepots = res.body;
                            });
                        break;
                    }
                    case this.TypeOfFuelReceipt[this.TypeOfFuelReceipt.UNIT_TO_CUSTOMERS]: {
                        oilTankTypes.push(this.OilTankType[this.OilTankType.UNIT]);
                        this.dayDepotService.queryByProductAndOilTankType(productId, oilTankTypes, tempDepot.refuelCenterId, this.order.registerDate)
                            .subscribe((res) => {
                                this.dayDepots = res.body;
                            });
                        break;
                    }
                }
            });
        });

    }

    setProducts(sellContractProductId) {
        this.sellContractProductService.find(sellContractProductId).subscribe((sellContractProductRes) => {
            const productId = sellContractProductRes.body.productId;
            const oilTankTypes = [];
            // const tempDepot = this.depots.find((value) => value.id === this.order.depotId);
            this.depotService.find(this.order.depotId).subscribe((depot) => {
                const tempDepot = depot.body;
                switch (this.order.typeOfFuelReceipt) {
                    case this.TypeOfFuelReceipt[this.TypeOfFuelReceipt.PIPE_LINE_SALES]: {
                        oilTankTypes.push(this.OilTankType[this.OilTankType.SERVICE_TANK]);
                        oilTankTypes.push(this.OilTankType[this.OilTankType.MAIN]);
                        this.dayDepotService.queryByProductAndOilTankType(productId, oilTankTypes, tempDepot.refuelCenterId, this.order.registerDate)
                            .subscribe((res) => {
                                this.dayDepots = res.body;
                                this.setDayDepot(this.orderProduct.logBook.dayDepotId);
                            });
                        break;
                    }
                    case this.TypeOfFuelReceipt[this.TypeOfFuelReceipt.TANKER_SALES]: {
                        oilTankTypes.push(this.OilTankType[this.OilTankType.PLATFORM]);
                        this.dayDepotService.queryByProductAndOilTankType(productId, oilTankTypes, tempDepot.refuelCenterId, this.order.registerDate)
                            .subscribe((res) => {
                                this.dayDepots = res.body;
                                this.setDayDepot(this.orderProduct.logBook.dayDepotId);
                            });
                        break;
                    }
                    case this.TypeOfFuelReceipt[this.TypeOfFuelReceipt.UNIT_TO_AIRPLANE]: {
                        oilTankTypes.push(this.OilTankType[this.OilTankType.UNIT]);
                        this.dayDepotService.queryByProductAndOilTankType(productId, oilTankTypes, tempDepot.refuelCenterId, this.order.registerDate)
                            .subscribe((res) => {
                                this.dayDepots = res.body;
                                this.setDayDepot(this.orderProduct.logBook.dayDepotId);
                            });
                        break;
                    }
                    case this.TypeOfFuelReceipt[this.TypeOfFuelReceipt.UNIT_TO_CUSTOMERS]: {
                        oilTankTypes.push(this.OilTankType[this.OilTankType.UNIT]);
                        this.dayDepotService.queryByProductAndOilTankType(productId, oilTankTypes, tempDepot.refuelCenterId, this.order.registerDate)
                            .subscribe((res) => {
                                this.dayDepots = res.body;
                                this.setDayDepot(this.orderProduct.logBook.dayDepotId);
                            });
                        break;
                    }
                }
            });
        });

    }

    depotChanged(depotId) {
        if (depotId) {
            this.depotId = depotId;
            const tempDepot = this.depots.find((value) => value.id === this.order.depotId);
            // this.depotService.find(depotId).subscribe((res) => {
            const depot: Depot = tempDepot;
            this.depot = depot;
            if (this.mode === 'airplane') {
                this.refuelCenterService.find(depot.refuelCenterId)
                    .subscribe((refuelCenterResponse: HttpResponse<RefuelCenter>) => {
                        const refuelCenter: RefuelCenter = refuelCenterResponse.body;
                        this.sourceAirports = refuelCenter.airports;
                        this.order.sourceAirport = refuelCenter.airports[0].id;
                        this.order.flightConditions = this.FlightConditions[this.FlightConditions.NORMAL];
                        this.order.typeOfFuelReceipt = this.TypeOfFuelReceipt[this.TypeOfFuelReceipt.UNIT_TO_AIRPLANE];
                        this.order.fuelType = this.FuelType[this.FuelType.FUEL];
                        this.onChangeFlightConditions(null);
                    });
            } else {
                this.order.sourceAirport = null;
                this.order.targetAirport = null;
                this.order.flightConditions = null;
                this.order.typeOfFuelReceipt = null;
                this.order.fuelType = null;
            }
            // });
        }
        this.currencies = [];
        this.order.currencyId = null;
        if (depotId == null) {
            this.currencyChanged(null);
        }
        if (depotId != null) {
            this.currencyService.findByDepotAndCustomerAndPerson(depotId, this.order.customerId, this.order.personId, this.order.sellContractId, this.mode)
                .subscribe((res: HttpResponse<Currency[]>) => {
                    this.currencies = res.body;
                    if (this.currencies.length > 0) {
                        this.order.currencyId = this.currencies[0].id;
                        this.currencyChanged(this.order.currencyId);
                    } else {
                        this.currencyChanged(null);
                    }
                }, (res: HttpErrorResponse) => this.onError(res.message));
        }
    }

    depotSet(depotId) {
        this.currencies = [];
        this.currencyService.findByDepotAndCustomerAndPerson(depotId, this.order.customerId, this.order.personId, this.order.sellContractId, this.mode)
            .subscribe((res: HttpResponse<Currency[]>) => {
                this.currencies = res.body;
                this.currencySet(this.order.currencyId);
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    currencyChanged(currencyId) {
        this.currencyRateGroups = [];
        this.order.currencyRateGroupId = null;
        if (currencyId == null) {
            this.currencyRateGroupChanged(null);
        }
        if (currencyId != null) {
            this.currencyService.find(currencyId).subscribe((response) => {
                this.currency = response.body;
            });

            this.currencyRateGroupService.findByCurrencyAndDepotAndCustomerAndPerson(currencyId, this.order.depotId,
                this.order.customerId,
                this.order.personId,
                this.order.sellContractId, this.mode)
                .subscribe((res: HttpResponse<CurrencyRateGroup[]>) => {
                    this.currencyRateGroups = res.body;
                    if (this.currencyRateGroups.length > 0) {
                        this.order.currencyRateGroupId = this.currencyRateGroups[0].id;
                        this.currencyRateGroupChanged(this.order.currencyRateGroupId);
                    } else {
                        this.currencyRateGroupChanged(null);
                    }
                }, (res: HttpErrorResponse) => this.onError(res.message));
        }
    }

    currencySet(currencyId) {
        if (currencyId != null) {
            this.currencyService.find(currencyId).subscribe((response) => {
                this.currency = response.body;
            });
        }
        this.currencyRateGroups = [];
        this.currencyRateGroupService.findByCurrencyAndDepotAndCustomerAndPerson(currencyId,
            this.order.depotId,
            this.order.customerId,
            this.order.personId,
            this.order.sellContractId, this.mode)
            .subscribe((res: HttpResponse<CurrencyRateGroup[]>) => {
                this.currencyRateGroups = res.body;
                this.currencyRateGroupSet(this.order.currencyRateGroupId);
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    currencyRateGroupChanged(currencyRateGroupId) {
        this.buyGroups = [];
        if (currencyRateGroupId != null) {
            this.buyTypeService
                .findBuyGroupByDepotAndCustomerAnd(currencyRateGroupId, this.order.currencyId,
                    this.order.depotId, this.order.customerId,
                    this.order.personId, this.order.sellContractId, this.mode)
                .subscribe((res: HttpResponse<BuyGroup[]>) => {
                    this.buyGroups = res.body;
                    if (this.buyGroups.length > 0) {
                        if (!this.order.id) {
                            this.order.buyGroup = this.buyGroup[this.buyGroup.CREDIT];
                        } else if (this.buyGroups.length === 1) {
                            this.order.buyGroup = this.buyGroups[0];
                        }
                        this.buyTypeChanged(this.order.buyGroup);
                    } else {
                        this.buyTypeChanged(null);
                    }
                }, (res: HttpErrorResponse) => this.onError(res.message));
        } else {
            this.buyTypeChanged(null);
        }
    }

    currencyRateGroupSet(currencyRateGroupId) {
        this.buyGroups = [];
        this.buyTypeService
            .findBuyGroupByDepotAndCustomerAnd(currencyRateGroupId, this.order.currencyId,
                this.order.depotId,
                this.order.customerId,
                this.order.personId, this.order.sellContractId, this.mode)
            .subscribe((res: HttpResponse<BuyGroup[]>) => {
                this.buyGroups = res.body;
                if (!this.order.id) {
                    this.order.buyGroup = this.buyGroup[this.buyGroup.CREDIT];
                }
                this.buyTypeSet(this.order.buyGroup);
            }, (res: HttpErrorResponse) => this.onError(res.message));

    }

    buyTypeChanged(buyGroup) {
        this.sellContractProducts = [];
        this.order.sellContractProductIds = [];
        this.order.orderProducts = [];
        if (buyGroup != null) {
            if (this.mode === 'airplane') {
                this.buyTypeService
                    .findTypeOfFuelReceiptByDepotAndCustomer(this.order.currencyRateGroupId,
                        this.order.currencyId, this.order.depotId, this.order.customerId,
                        this.order.personId, this.order.sellContractId, this.mode, buyGroup)
                    .subscribe((res: HttpResponse<TypeOfFuelReceipt[]>) => {
                        this.typeOfFuelReceipt = res.body;
                        if (this.buyGroups.length > 0) {
                            this.order.typeOfFuelReceipt = this.typeOfFuelReceipt[0];
                            this.changeTypeOfFuelReceipt(this.order.typeOfFuelReceipt);
                        } else {
                            this.changeTypeOfFuelReceipt(null);
                        }
                    }, (res: HttpErrorResponse) => this.onError(res.message));
            } else {
                this.filterProduct();
            }
        } else {
            this.order.buyGroup = null;
        }
    }

    buyTypeSet(buyGroup) {
        this.sellContractProducts = [];
        if (buyGroup != null) {
            if (this.mode === 'airplane') {
                this.buyTypeService
                    .findTypeOfFuelReceiptByDepotAndCustomer(this.order.currencyRateGroupId,
                        this.order.currencyId, this.order.depotId, this.order.customerId,
                        this.order.personId, this.order.sellContractId, this.mode, buyGroup)
                    .subscribe((res: HttpResponse<TypeOfFuelReceipt[]>) => {
                        this.typeOfFuelReceipt = res.body;
                        this.changeTypeOfFuelReceiptSet();
                    }, (res: HttpErrorResponse) => this.onError(res.message));
            } else {
                this.filterProduct();
            }
        }
        this.calPrice();
    }

    calSummary() {
        this.summary =
            'فروش به '
            + (this.order.customerName != null ? this.order.customerName + '(' + this.order.personName + ')' : this.order.personName) +
            'به شماره'
            + this.order.orderNo +
            'از انبار'
            + this.order.depotTitle +
            ' با ارز '
            + (this.order.CurrencyRateGroupTitle != null ? this.order.currencyTitle + '(' + this.order.CurrencyRateGroupTitle + ')' : this.order.currencyTitle) +
            ' به صورت '
            + this.order.buyGroup;

    }

    onSelect(event, selected) {
        const deletedOrderCredit = [];
        this.order.orderCredits.forEach((orderCredit) => {
            deletedOrderCredit.push(orderCredit);
            this.customerCredits.forEach((customerCredit) => {
                if (customerCredit.id === orderCredit.customerCreditId) {
                    if (customerCredit.currentAmount != null) {
                        customerCredit.currentAmount += orderCredit.decreasedAmount;
                    }
                    if (customerCredit.currentCredit != null) {
                        customerCredit.currentCredit += orderCredit.decreasedCredit;
                    }
                    if (customerCredit.currentCredit != null) {
                        customerCredit.currentCredit += orderCredit.decreasedCost;
                    }
                    this.order.orderProducts.forEach((orderProduct) => {
                        if (orderProduct.id === orderCredit.orderProductId) {
                            orderProduct.currentAmount += orderCredit.decreasedAmount;
                            orderProduct.currentPrice += orderCredit.decreasedCredit;
                            orderProduct.currentProductCost += orderCredit.decreasedCost;
                        }
                    });
                }
            });
        });
        deletedOrderCredit.forEach((value) => {
            this.order.orderCredits.splice(this.order.orderCredits.indexOf(value), 1);
        });
        this.selectCustomerCredit();

    }

    selectCustomerCredit() {
        this.selectedCustomerCredits.forEach((customerCredit) => {
            this.order.orderProducts.forEach((value) => {
                if (customerCredit.productId == null || value.sellContractProductId === customerCredit.productId) {
                    if (customerCredit.parentBuyTypeUsage.toString() !== BuyTypeUsage[BuyTypeUsage.COST]) {
                        if (customerCredit.parentTypeEffect.toString() === TypeEffect[TypeEffect.BOTH]) {
                            if (customerCredit.currentAmount <= (customerCredit.currentCredit / (value.productRatePrice + value.containerRatePrice))) {
                                if (value.currentAmount !== 0) {
                                    const amount = customerCredit.currentAmount > value.currentAmount
                                        ? value.currentAmount : customerCredit.currentAmount;
                                    value.currentAmount -= amount;
                                    value.currentPrice -= amount * (value.productRatePrice + value.containerRatePrice);
                                    customerCredit.currentAmount -= amount;
                                    customerCredit.currentCredit -= amount * (value.productRatePrice + value.containerRatePrice);

                                    const orderCredit = new OrderCredit;
                                    orderCredit.creditNumber = customerCredit.creditNumber;
                                    orderCredit.customerCreditId = customerCredit.id;
                                    orderCredit.decreasedAmount = amount;
                                    orderCredit.decreasedCredit = amount * (value.productRatePrice + value.containerRatePrice);
                                    orderCredit.decreasedCost = 0;
                                    orderCredit.orderId = this.order.id;
                                    orderCredit.orderProductId = value.id;
                                    this.order.orderCredits.push(orderCredit);
                                }
                            } else {
                                if (value.currentPrice !== 0) {
                                    const price = customerCredit.currentCredit > value.currentPrice
                                        ? value.currentPrice : customerCredit.currentCredit - (customerCredit.currentCredit % (value.productRatePrice + value.containerRatePrice));
                                    value.currentPrice -= price;
                                    value.currentAmount -= price / (value.productRatePrice + value.containerRatePrice);
                                    customerCredit.currentCredit -= price;
                                    customerCredit.currentAmount -= price / (value.productRatePrice + value.containerRatePrice);

                                    const orderCredit = new OrderCredit;
                                    orderCredit.creditNumber = customerCredit.creditNumber;
                                    orderCredit.customerCreditId = customerCredit.id;
                                    orderCredit.decreasedAmount = price / (value.productRatePrice + value.containerRatePrice);
                                    orderCredit.decreasedCredit = price;
                                    orderCredit.decreasedCost = 0;
                                    orderCredit.orderId = this.order.id;
                                    orderCredit.orderProductId = value.id;
                                    this.order.orderCredits.push(orderCredit);
                                }
                            }
                        } else if (customerCredit.parentTypeEffect.toString() === TypeEffect[TypeEffect.AMOUNT]) {
                            if (value.currentAmount !== 0 && value.currentAmount != null) {
                                const amount = customerCredit.currentAmount > value.currentAmount
                                    ? value.currentAmount : customerCredit.currentAmount;
                                value.currentAmount -= amount;
                                value.currentPrice -= amount * (value.productRatePrice + value.containerRatePrice);
                                customerCredit.currentAmount -= amount;

                                const orderCredit = new OrderCredit;
                                orderCredit.creditNumber = customerCredit.creditNumber;
                                orderCredit.customerCreditId = customerCredit.id;
                                orderCredit.decreasedAmount = amount;
                                orderCredit.decreasedCredit = amount * (value.productRatePrice + value.containerRatePrice);
                                orderCredit.decreasedCost = 0;
                                orderCredit.orderId = this.order.id;
                                orderCredit.orderProductId = value.id;
                                this.order.orderCredits.push(orderCredit);
                            }
                        } else if (customerCredit.parentTypeEffect.toString() === TypeEffect[TypeEffect.CREDIT]) {
                            if (value.currentPrice != null && value.currentPrice !== 0) {
                                const price = customerCredit.currentCredit > value.currentPrice
                                    ? value.currentPrice : customerCredit.currentCredit - (customerCredit.currentCredit % (value.productRatePrice + value.containerRatePrice));
                                value.currentPrice -= price;
                                value.currentAmount -= price / (value.productRatePrice + value.containerRatePrice);
                                customerCredit.currentCredit -= price;

                                const orderCredit = new OrderCredit;
                                orderCredit.creditNumber = customerCredit.creditNumber;
                                orderCredit.customerCreditId = customerCredit.id;
                                orderCredit.decreasedAmount = price / (value.productRatePrice + value.containerRatePrice);
                                orderCredit.decreasedAmount = Math.round(orderCredit.decreasedAmount * 100) / 100;
                                orderCredit.decreasedCredit = price;
                                orderCredit.decreasedCost = 0;
                                orderCredit.orderId = this.order.id;
                                orderCredit.orderProductId = value.id;
                                this.order.orderCredits.push(orderCredit);
                            }
                        }
                    }
                    if (customerCredit.parentBuyTypeUsage.toString() !== BuyTypeUsage[BuyTypeUsage.PRODUCT]) {
                        const price = customerCredit.currentCredit > value.currentProductCost
                            ? value.currentProductCost : customerCredit.currentCredit;
                        value.currentProductCost -= price;
                        customerCredit.currentCredit -= price;

                        const orderCredit = new OrderCredit;
                        orderCredit.creditNumber = customerCredit.creditNumber;
                        orderCredit.customerCreditId = customerCredit.id;
                        orderCredit.decreasedAmount = 0;
                        orderCredit.decreasedCredit = 0;
                        orderCredit.decreasedCost = price;
                        orderCredit.orderId = this.order.id;
                        orderCredit.orderProductId = value.id;
                        this.order.orderCredits.push(orderCredit);
                    }
                }
                value.currentAmount = Math.round(value.currentAmount * 100) / 100;

                this.disableButton(value);

            });
        });
    }

    nextStep() {
        if (this.activeIndex === 0) {
            this.reserve();
        }
        if (this.activeIndex === 1 || this.activeIndex === 2) {
            if (this.order.buyGroup !== BuyGroup[this.buyGroup.CASH]) {
                this.saveForPayment();
            } else {
                this.electronicSave();
            }
        }
    }

    /*    electronicPayment(value) {
            this.router.navigate(['/e-payment/', value]);
        }*/

    paymentFinal() {
        if (this.order.buyGroup !== 'CASH') {
            this.subscribeToSaveResponse(
                this.orderService.payment(this.order));
        } else {
            this.ePaymentComponent.pay();
        }
    }

    back() {
        UsefulId.activeIndex = this.activeIndex - 1;
        this.activeIndex = UsefulId.activeIndex;
        this.router.navigate(['/order/' + this.mode + '/' + this.order.id + '/edit/' + this.activeIndex]);
    }

    save() {
        this.isSaving = true;
        if (this.activeIndex === 0) {
            this.reserveForSave();
        }
        if (this.activeIndex === 1) {
            if (this.order.id !== undefined) {
                this.subscribeToSaveResponse(
                    this.orderService.update(this.order));
            } else {
                this.subscribeToSaveResponse(
                    this.orderService.create(this.order));
            }
        }
    }

    reserve() {
        this.subscribeToReserve(this.orderService.reserve(this.order));
    }

    reserveForSave() {
        this.subscribeToReserveForSave(this.orderService.reserve(this.order));
    }

    saveForPayment() {
        this.isSaving = true;
        if (this.order.id !== undefined) {
            this.subscribeToSaveResponsePayment(
                this.orderService.update(this.order));
        } else {
            this.subscribeToSaveResponsePayment(
                this.orderService.create(this.order));
        }
    }

    electronicSave() {
        this.isSaving = true;
        if (this.order.id !== undefined) {
            this.subscribeToSaveResponseElectronic(
                this.orderService.updateOrderForEPayment(this.order));
        } else {
            this.subscribeToSaveResponseElectronic(
                this.orderService.createOrderForEPayment(this.order));
        }
    }

    clear() {
        this.router.navigate(['/order/' + this.mode]);
        UsefulId.activeIndex = null;
    }

    changeTypeOfFuelReceiptSet() {
        this.filterProduct();
        this.setSourceRefuelCenter();
    }

    changeTypeOfFuelReceipt(data) {
        this.dayDepots = null;
        this.orderProduct = new OrderProduct();
        this.metreLog = new MetreLog();
        this.logBook = new LogBook();
        this.metres = null;
        this.order.orderProducts = [];
        this.filterProduct();
        if (this.mode === 'airplane') {
            this.dayDepotService.getOpenDate(this.depot.refuelCenterId, data).subscribe((date) => {
                this.locationDate = date.body;
                this.serverDate = date.body;
                this.isDay = true;
            });
        }
        if (data === this.TypeOfFuelReceipt[this.TypeOfFuelReceipt.TANKER_SALES]) {
            this.order.fuelType = this.FuelType[this.FuelType.FUEL];
        }
        if (data !== this.TypeOfFuelReceipt[this.TypeOfFuelReceipt.UNIT_TO_AIRPLANE]) {
            this.targetAirports = null;
            this.order.targetAirport = null;
        } else {
            this.onChangeFlightConditions(null);
        }
    }

    setSourceRefuelCenter() {
        if (this.depots != null) {
            const tempDepot = this.depots.find((value) => value.id === this.order.depotId);
            const depot: Depot = tempDepot;
            this.depot = depot;
            this.setTargetRefuelCenter();
            if (this.mode === 'airplane') {
                this.refuelCenterService.find(this.depot.refuelCenterId)
                    .subscribe((refuelCenterResponse: HttpResponse<RefuelCenter>) => {
                        const refuelCenter: RefuelCenter = refuelCenterResponse.body;
                        this.sourceAirports = refuelCenter.airports;
                    });
            } else {
                this.order.sourceAirport = null;
                this.order.targetAirport = null;
                this.order.flightConditions = null;
                this.order.typeOfFuelReceipt = null;
                this.order.fuelType = null;
            }
        } else {
            this.depotService.find(this.order.depotId).subscribe((res) => {
                this.depot = res.body;
                this.setTargetRefuelCenter();
                if (this.mode === 'airplane') {
                    this.refuelCenterService.find(this.depot.refuelCenterId)
                        .subscribe((refuelCenterResponse: HttpResponse<RefuelCenter>) => {
                            const refuelCenter: RefuelCenter = refuelCenterResponse.body;
                            this.sourceAirports = refuelCenter.airports;
                        });
                } else {
                    this.order.sourceAirport = null;
                    this.order.targetAirport = null;
                    this.order.flightConditions = null;
                    this.order.typeOfFuelReceipt = null;
                    this.order.fuelType = null;
                }
            });
        }
    }

    setTargetRefuelCenter() {
        if (this.order.flightConditions === this.FlightConditions[this.FlightConditions.NORMAL] && this.order.sourceAirport) {
            this.airportService.findTargetAirports(this.order.sourceAirport).subscribe((res) => {
                this.targetAirports = res.body;
            });
        } else {
            this.airportService.query().subscribe((res) => {
                this.targetAirports = res.body.filter((refuelCenter) => refuelCenter.id !== this.order.sourceAirport);
            });
        }
    }

    onChangeDayDepot(data) {
        this.metres = null;
        this.metreLog = new MetreLog();
        this.metre = new Metre();
        if (data != null) {
            const dayDepot = this.dayDepots.find((value) => value.id === data);
            this.metres = dayDepot.metres;
            if (this.metres.length === 1) {
                this.metreLog.metreId = this.metres[0].id;
                this.changeMetre(this.metreLog.metreId);

            }
        }

        /*if (this.order.typeOfFuelReceipt !== this.TypeOfFuelReceipt[this.TypeOfFuelReceipt.PIPE_LINE_SALES]) {
            this.dayDepotService.find(data).subscribe((dayDepotRes) => {
                const dayDepot: DayDepot = dayDepotRes.body;
                this.metreService.getMetreActiveStatus(dayDepot.oilTankId)
                    .subscribe((metreRes) => {
                        this.metres = metreRes.body;
                        if (this.order.typeOfFuelReceipt === this.TypeOfFuelReceipt[this.TypeOfFuelReceipt.TANKER_SALES]) {
                            const filteredMetres = metreRes.body.filter((metre: Metre) => metre.active);
                            this.metreLog.metreId = filteredMetres[0].id;
                            if (this.order.id) {
                                this.orderProduct.amount = filteredMetres[0].maxMetre - filteredMetres[0].amount;
                                this.metreLog.startMeter = filteredMetres[0].amount;
                            }
                        }
                    });
            });
        }*/
    }

    setDayDepot(data) {
        if (data != null) {
            const dayDepot = this.dayDepots.find((value) => value.id === data);
            this.metres = dayDepot.metres;
            this.metre = this.metres.find((value) => value.id === this.logBook.metreLog.metreId);
        }
    }

    onChangeFuelType(data) {
        this.order.orderProducts = [];
    }

    /* onChangeTargetRefuelCenter() {
         this.order.orderProducts = [];
     }*/

    onChangeFlightConditions(data) {
        this.order.orderProducts = [];
        this.targetAirports = null;
        if (this.order.flightConditions === this.FlightConditions[this.FlightConditions.NORMAL] && this.order.sourceAirport) {
            this.order.targetAirport = null;
            this.airportService.findTargetAirports(this.order.sourceAirport).subscribe((res) => {
                this.targetAirports = res.body.filter((refuelCenter) => refuelCenter !== this.order.sourceAirport);
                if (this.targetAirports.length > 0) {
                    this.order.targetAirport = this.targetAirports[0].id;
                }
            });
        } else {
            this.airportService.query().subscribe((res) => {
                this.order.targetAirport = null;
                this.targetAirports = res.body.filter((refuelCenter) => refuelCenter.id !== this.order.sourceAirport);
                if (this.targetAirports.length > 0) {
                    this.order.targetAirport = this.targetAirports[0].id;
                }
            });
        }
    }

    changeMetre(metreId) {
        this.metreService.find(metreId)
            .subscribe((metre) => {
                this.metre = metre.body;
                this.calculateMetre();
            });
    }

    private calculateMetre() {
        if (this.metre && this.metre.amount && this.orderProduct.amount) {
            const minusAmount = this.minusAmounts.filter(((value) => value.metreId === this.metre.id))[0];
            this.metreLog.startMeter = this.metre.amount - ((minusAmount) ? minusAmount.amount : 0);
            if (this.orderProduct.amount) {
                const sum = Number(this.orderProduct.amount) + this.metre.amount - ((minusAmount) ? minusAmount.amount : 0);
                if (sum > this.metre.maxMetre) {
                    const minus = sum - this.metre.maxMetre;
                    this.orderProduct.amount -= minus;
                }
                this.metreLog.endMeter = Number(this.orderProduct.amount) + this.metreLog.startMeter;

            }
            this.maxEndMetreNumber = this.metre.maxMetre - (this.metre.amount - ((minusAmount) ? minusAmount.amount : 0));
        }
    }

    onChangeAmount(data) {
        this.orderProduct.amount = +data;
        this.calculateMetre();
    }

    filterProduct() {
        const order = this.order;
        if (this.mode === 'airplane' && order.typeOfFuelReceipt) {
            this.sellContractProductService
                .findByDepotAndCustomer(
                    order.buyGroup,
                    order.currencyRateGroupId,
                    order.currencyId,
                    order.depotId,
                    order.customerId,
                    order.personId,
                    order.sellContractId,
                    order.typeOfFuelReceipt,
                    this.mode
                )
                .subscribe((res: HttpResponse<SellContractProduct[]>) => {
                    this.sellContractProducts = res.body;
                    if (this.sellContractProducts.length === 1) {
                        this.orderProduct.sellContractProductId = this.sellContractProducts[0].id;
                    }
                }, (res: HttpErrorResponse) => this.onError(res.message));
        } else {
            this.sellContractProductService
                .findByDepotAndCustomer(
                    order.buyGroup,
                    order.currencyRateGroupId,
                    order.currencyId,
                    order.depotId,
                    order.customerId,
                    order.personId,
                    order.sellContractId,
                    null,
                    this.mode
                )
                .subscribe((res: HttpResponse<SellContractProduct[]>) => {
                    this.sellContractProducts = res.body;
                    if (this.sellContractProducts.length === 1) {
                        this.orderProduct.sellContractProductId = this.sellContractProducts[0].id;
                    }
                }, (res: HttpErrorResponse) => this.onError(res.message));
        }
    }

    trackRefuelCenterById(index: number, item: RefuelCenter) {
        return item.id;
    }

    trackMetreById(index: number, item: Metre) {
        return item.id;
    }

    trackDayDepotById(index: number, item: DayDepot) {
        return item.id;
    }

    disableButton(value: OrderProduct) {
        if (UsefulId.activeIndex === 2) {
            this.disableButtons = this.hasCreditNotDepositedInTime || value.currentAmount !== 0 || value.currentPrice !== 0 || value.currentProductCost !== 0;
        }
    }

    private subscribeToSaveResponse(result: Observable<Order>) {
        result.subscribe((res: Order) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private subscribeToSaveResponsePayment(result: Observable<Order>) {
        result.subscribe((res: Order) =>
            this.onSaveSuccessPayment(res), (res: Response) => this.onSaveError());
    }

    private subscribeToReserve(result: Observable<Order>): void {
        result.subscribe((res: Order) =>
            this.onSaveSuccessReserve(res), (res: Response) => this.onSaveError());
    }

    private subscribeToReserveForSave(result: Observable<Order>): void {
        result.subscribe((res: Order) =>
            this.onSaveSuccessReserveForSave(res), (res: Response) => this.onSaveError());
    }

    private subscribeToSaveResponseElectronic(result) {
        result.subscribe((res) => {
            this.onSaveSuccessElectronic(res);

        }, (res: Response) => this.onSaveError());
    }

    private onSaveSuccessElectronic(result) {
        this.eventManager.broadcast({name: 'orderListModification', content: 'OK'});
        this.isSaving = false;
        // this.electronicPayment(result.body);
        console.log(result);
        // this.order = result.body;
        this.router.navigate(['/order/' + this.mode + '/' + this.order.id + '/edit/' + 2, {payId: result.body}]);
    }

    private onSaveSuccess(result) {
        this.eventManager.broadcast({name: 'orderListModification', content: 'OK'});
        this.isSaving = false;
        this.order = result.body;
        this.router.navigate(['/order/' + this.mode]);
    }

    private onSaveSuccessPayment(result) {
        this.eventManager.broadcast({name: 'orderListModification', content: 'OK'});
        this.isSaving = false;
        this.order = result.body;
        // this.ngOnInit();
        this.router.navigate(['/order/' + this.mode + '/' + result.body.id + '/edit/' + 2]);
    }

    private onSaveSuccessReserve(result) {
        this.eventManager.broadcast({name: 'orderListModification', content: 'OK'});
        this.isSaving = false;
        this.order = result.body;
        // this.ngOnInit();
        this.router.navigate(['/order/' + this.mode + '/' + result.body.id + '/edit/' + 1]);
    }

    private onSaveSuccessReserveForSave(result) {
        this.eventManager.broadcast({name: 'orderListModification', content: 'OK'});
        this.isSaving = false;
        this.order = result.body;
        // this.ngOnInit();
        this.router.navigate(['/order/' + this.mode]);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-order-popup',
    template: ''
})
export class OrderPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private orderPopupService: OrderPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.orderPopupService
                    .open(OrderDialogComponent as Component, params['id']);
            } else {
                this.orderPopupService
                    .open(OrderDialogComponent as Component);
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

export class UsefulId {
    static activeIndex: number;
}
