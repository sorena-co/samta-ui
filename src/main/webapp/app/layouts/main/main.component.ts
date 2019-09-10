import {Component, OnInit} from '@angular/core';
import {ActivatedRouteSnapshot, NavigationEnd, Router} from '@angular/router';

import {JhiLanguageHelper, LoginModalService, LoginService, Principal} from '../../shared';
import {ProfileService} from '../profiles/profile.service';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {BankTransaction, BankTransactionService, SpentType} from '../../entities/bank-transaction';
import {BankTransactionRef} from '../../entities/bank-transaction-ref';

@Component({
    selector: 'jhi-main',
    templateUrl: './main.component.html',
    styleUrls: ['main.css']

})
export class JhiMainComponent implements OnInit {

    inProduction: boolean;
    languages: any[];
    swaggerEnabled: boolean;
    modalRef: NgbModalRef;
    version: string;

    menus = [
        {
            translate: 'global.menu.sell.title',
            name: 'sell',
            icon: 'fa-inbox',
            subMenu: [
                {
                    name: 'create_order',
                    translate: 'global.menu.sell.createOrder',
                    routerLink: 'order/order-new/order',
                    auth: 'CREATE_ORDER'
                },
                {name: 'order', translate: 'global.menu.sell.order', routerLink: 'order/order', auth: 'LIST_ORDER'},
                {
                    name: 'credit_not_deposited',
                    translate: 'global.menu.sell.creditNotDepositedOrder',
                    routerLink: 'order/credit-not-deposited',
                    auth: 'CREDIT_NOT_DEPOSITED_ORDER'
                },

                {
                    name: 'create_order_airplane',
                    translate: 'global.menu.sell.createOrderAirplane',
                    routerLink: 'order/order-new/airplane',
                    auth: 'CREATE_ORDER_AIRPLANE'
                },
                {
                    name: 'order_airplane',
                    translate: 'global.menu.sell.order_airplane',
                    routerLink: 'order/airplane',
                    auth: 'LIST_ORDER_AIRPLANE'
                },
                {
                    name: 'credit_not_deposited', translate: 'global.menu.sell.creditNotDepositedOrderAirplane',
                    routerLink: 'order/credit-not-deposited', auth: 'CREDIT_NOT_DEPOSITED_ORDER_AIRPLANE'
                },
                {
                    name: 'create_order_exchange',
                    translate: 'global.menu.sell.order_exchange_create',
                    routerLink: 'order/order-new/exchange',
                    auth: 'ORDER_EXCHANGE_CREATE'
                },
                {
                    name: 'order_exchange',
                    translate: 'global.menu.sell.order_exchange',
                    routerLink: 'order/exchange',
                    auth: 'ORDER_EXCHANGE'
                },

                {
                    name: 'order_export_create',
                    translate: 'global.menu.sell.order_export_create',
                    routerLink: 'order/order-new/export',
                    auth: 'ORDER_EXPORT_CREATE'
                },
                {
                    name: 'order_export',
                    translate: 'global.menu.sell.order_export',
                    routerLink: 'order/export',
                    auth: 'ORDER_EXPORT'
                },

                {
                    name: 'connect_depot',
                    translate: 'global.menu.sell.connectDepot',
                    routerLink: 'connect-depot',
                    auth: 'CONNECT_DEPOT_UPLOAD'
                },

                {
                    name: 'boundary_sell',
                    translate: 'global.menu.sell.boundarySell',
                    routerLink: 'boundary-sell',
                    auth: 'LIST_BOUNDARY_SELL'
                },
            ],
            count: 0,
            heights: null,
            collapseIn: false,
            collapsing: false
        },
        {
            translate: 'global.menu.entities.ao',
            name: 'ao',
            icon: 'fa-plane',
            subMenu: [
                {
                    name: 'refuelCenter',
                    translate: 'global.menu.entities.refuelCenter',
                    routerLink: 'refuel-center',
                    auth: 'LIST_REFUEL_CENTER'
                },
                {
                    name: 'airport',
                    translate: 'global.menu.entities.airport',
                    routerLink: 'airport',
                    auth: 'LIST_AIRPORT'
                },
                {
                    name: 'oilTank',
                    translate: 'global.menu.entities.oilTank',
                    routerLink: 'oil-tank',
                    auth: 'LIST_OIL_TANK'
                },
                {
                    name: 'transferType',
                    translate: 'global.menu.entities.transferType',
                    routerLink: 'transfer-type',
                    auth: 'LIST_TRANSFER_TYPE'
                },
                {
                    name: 'mainDayDepot',
                    translate: 'global.menu.entities.mainDayDepot',
                    routerLink: 'main-day-depot',
                    auth: 'LIST_MAIN_DAY_DEPOT'
                },
                {
                    name: 'mainDayOperation',
                    translate: 'global.menu.entities.mainDayOperation',
                    routerLink: 'main-day-operation',
                    auth: 'LIST_MAIN_DAY_OPERATION'
                },
                {
                    name: 'oilTankContainerEmpty',
                    translate: 'global.menu.entities.oilTankContainerEmpty',
                    routerLink: 'oil-tank-container/product-unit',
                    auth: 'LIST_OIL_TANK_CONTAINER'
                },
                {
                    name: 'oilTankContainerFull',
                    translate: 'global.menu.entities.oilTankContainerFull',
                    routerLink: 'oil-tank-container/product',
                    auth: 'LIST_OIL_TANK_PRODUCT'
                }
            ],
            count: 0,
            heights: null,
            collapseIn: false,
            collapsing: false
        },
        {
            translate: 'global.menu.entities.lab',
            name: 'lab',
            icon: 'fa-flask',
            subMenu: [
                {
                    name: 'cleaningReportOilTank', translate: 'global.menu.entities.cleaningReportOilTank',
                    routerLink: 'cleaning-report-oil-tank', auth: 'LIST_CLEANING_REPORT_OIL_TANK'
                },
                {
                    name: 'milliPoor',
                    translate: 'global.menu.entities.milliPoor',
                    routerLink: 'milli-poor',
                    auth: 'LIST_MILLI_POOR'
                },
                {
                    name: 'requestTestResult',
                    translate: 'global.menu.entities.requestTestResult',
                    routerLink: 'request-test-result',
                    auth: 'LIST_REQUEST_TEST_RESULT'
                },
                {
                    name: 'requestFilterElement',
                    translate: 'global.menu.entities.requestFilterElement',
                    routerLink: 'request-filter-element',
                    auth: 'LIST_REQUEST_FILTER_ELEMENT'
                },
                {
                    name: 'manufacture',
                    translate: 'global.menu.entities.manufacture',
                    routerLink: 'manufacture',
                    auth: 'LIST_MANUFACTURE'
                },
                {
                    name: 'requestPlunging',
                    translate: 'global.menu.entities.requestPlunging',
                    routerLink: 'request-plunging',
                    auth: 'LIST_REQUEST_PLUNGING'
                },
            ],
            count: 0,
            heights: null,
            collapseIn: false,
            collapsing: false
        },
        {
            translate: 'global.menu.entities.accounting',
            name: 'accounting',
            icon: 'fa-calculator',
            subMenu: [
                {
                    name: 'baseQuery',
                    translate: 'global.menu.entities.baseQuery',
                    routerLink: 'base-query',
                    auth: 'LIST_BASE_QUERY'
                },
                {
                    name: 'voucherMaster',
                    translate: 'global.menu.entities.voucherMaster',
                    routerLink: 'voucher-master',
                    auth: 'LIST_VOUCHER_MASTER'
                },
                {
                    name: 'voucherPayment',
                    translate: 'global.menu.entities.voucherPayment',
                    routerLink: 'voucher-payment',
                    auth: 'LIST_VOUCHER_PAYMENT'
                },
                {
                    name: 'voucherTemplate',
                    translate: 'global.menu.entities.voucherTemplate',
                    routerLink: 'voucher-template',
                    auth: 'LIST_VOUCHER_TEMPLATE'
                },
                {
                    name: 'voucherTypeGroup',
                    translate: 'global.menu.entities.voucherTypeGroup',
                    routerLink: 'voucher-type-group',
                    auth: 'LIST_VOUCHER_TYPE_GROUP'
                },
                {name: 'bill', translate: 'global.menu.entities.bill', routerLink: 'bill', auth: 'LIST_BILL'},
                {name: 'factor', translate: 'global.menu.entities.factor', routerLink: 'factor', auth: 'LIST_FACTOR'},
                {name: 'loanType', translate: 'global.menu.entities.loanType', routerLink: 'loan-type', auth: 'LIST_LOAN_TYPE'},
                {name: 'loan', translate: 'global.menu.entities.loan', routerLink: 'loan', auth: 'LIST_LOAN'},
            ],
            count: 0,
            heights: null,
            collapseIn: false,
            collapsing: false
        },
        {
            translate: 'global.menu.entities.main',
            name: 'entity',
            icon: 'fa-inbox',
            subMenu: [
                {name: 'depot', translate: 'global.menu.entities.depot', routerLink: 'depot', auth: 'LIST_DEPOT'},
                {
                    name: 'product',
                    translate: 'global.menu.entities.product',
                    routerLink: 'product',
                    auth: 'LIST_PRODUCT'
                },
                {name: 'person', translate: 'global.menu.entities.person', routerLink: 'person', auth: 'LIST_PERSON'},
                {
                    name: 'customer',
                    translate: 'global.menu.entities.customer',
                    routerLink: 'customer',
                    auth: 'LIST_CUSTOMER'
                },
                {
                    name: 'boundaryCustomer',
                    translate: 'global.menu.entities.boundaryCustomer',
                    routerLink: 'boundary-customer',
                    auth: 'LIST_BOUNDARY_CUSTOMER'
                },
                {
                    name: 'sellContract',
                    translate: 'global.menu.entities.sellContract',
                    routerLink: 'sell-contract',
                    auth: 'LIST_SELL_CONTRACT'
                },
                {
                    name: 'payment',
                    translate: 'global.menu.entities.payment',
                    routerLink: 'payment',
                    auth: 'LIST_PAYMENT'
                },
            ],
            count: 0,
            heights: null,
            collapseIn: false,
            collapsing: false
        },
        {
            translate: 'global.menu.entities.baseInformation',
            name: 'entity',
            icon: 'fa-database',
            subMenu: [
                {
                    name: 'location',
                    translate: 'global.menu.entities.location',
                    routerLink: 'location',
                    auth: 'LIST_LOCATION'
                },
                {
                    name: 'country',
                    translate: 'global.menu.entities.country',
                    routerLink: 'country',
                    auth: 'LIST_REGION'
                },
                {
                    name: 'productGroup',
                    translate: 'global.menu.entities.productGroup',
                    routerLink: 'product-group',
                    auth: 'LIST_PRODUCT_GROUP'
                },
                {
                    name: 'productUnit',
                    translate: 'global.menu.entities.productUnit',
                    routerLink: 'product-unit',
                    auth: 'LIST_PRODUCT_UNIT'
                },
                {
                    name: 'container',
                    translate: 'global.menu.entities.container',
                    routerLink: 'container',
                    auth: 'LIST_CONTAINER'
                },
                {
                    name: 'customerType',
                    translate: 'global.menu.entities.customerType',
                    routerLink: 'customer-type',
                    auth: 'LIST_CUSTOMER_TYPE'
                },
                {
                    name: 'consumption',
                    translate: 'global.menu.entities.consumption',
                    routerLink: 'consumption',
                    auth: 'LIST_CONSUMPTION'
                },
                {
                    name: 'currency',
                    translate: 'global.menu.entities.currency',
                    routerLink: 'currency',
                    auth: 'LIST_CURRENCY'
                },
                {
                    name: 'currencyRateGroup',
                    translate: 'global.menu.entities.currencyRateGroup',
                    routerLink: 'currency-rate-group',
                    auth: 'LIST_CURRENCY_RATE_GROUP'
                },
                {
                    name: 'rateGroup',
                    translate: 'global.menu.entities.rateGroup',
                    routerLink: 'rate-group',
                    auth: 'LIST_RATE_GROUP'
                },
                {
                    name: 'costGroup',
                    translate: 'global.menu.entities.costGroup',
                    routerLink: 'cost-group',
                    auth: 'LIST_COST_GROUP'
                },
                {
                    name: 'buyType',
                    translate: 'global.menu.entities.buyType',
                    routerLink: 'buy-type',
                    auth: 'LIST_BUY_TYPE'
                },
                {
                    name: 'customerDeactiveRule',
                    translate: 'global.menu.entities.customerDeactiveRule',
                    routerLink: 'customer-deactive-rule',
                    auth: 'LIST_CUSTOMER_DEACTIVE_RULE'
                },
                {
                    name: 'vehicleModel',
                    translate: 'global.menu.entities.vehicleModel',
                    routerLink: 'vehicle-model',
                    auth: 'LIST_VEHICLE_MODEL'
                },
                {
                    name: 'boundaryDiscount',
                    translate: 'global.menu.entities.boundaryDiscount',
                    routerLink: 'boundary-discount',
                    auth: 'LIST_BOUNDARY_DISCOUNT'
                },
                {
                    name: 'plaque',
                    translate: 'global.menu.entities.plaque',
                    routerLink: 'plaque',
                    auth: 'LIST_PLAQUE'
                },
            ],
            count: 0,
            heights: null,
            collapseIn: false,
            collapsing: false
        },
        {
            translate: 'global.menu.admin.main',
            name: 'main',
            icon: 'fa-cogs',
            subMenu: [
                {name: 'gateway', translate: 'global.menu.admin.gateway', routerLink: 'gateway', auth: ''},
                {
                    name: 'userManagement',
                    translate: 'global.menu.admin.userManagement',
                    routerLink: 'user-management',
                    auth: 'LIST_USER'
                },
                {
                    name: 'userToken',
                    translate: 'global.menu.admin.userToken',
                    routerLink: 'user-token',
                    auth: 'LIST_USER_TOKEN'
                },
                {name: 'role', translate: 'global.menu.admin.role', routerLink: 'role', auth: 'LIST_ROLE'},
                {
                    name: 'parentAuthority',
                    translate: 'global.menu.admin.parentAuthority',
                    routerLink: 'parent-authority',
                    auth: 'LIST_PARENT_AUTHORITY'
                },
                {name: 'metrics', translate: 'global.menu.admin.metrics', routerLink: 'jhi-metrics', auth: ''},
                {name: 'health', translate: 'global.menu.admin.health', routerLink: 'jhi-health', auth: ''},
                {
                    name: 'configuration',
                    translate: 'global.menu.admin.configuration',
                    routerLink: 'jhi-configuration',
                    auth: ''
                },
                {name: 'audits', translate: 'global.menu.admin.audits', routerLink: 'audits', auth: ''},
                {name: 'logs', translate: 'global.menu.admin.logs', routerLink: 'logs', auth: ''},
                {name: 'news', translate: 'global.menu.admin.news', routerLink: 'news', auth: 'LIST_NEWS'},
                {name: 'apidocs', translate: 'global.menu.admin.apidocs', routerLink: 'docs', auth: ''},
                {name: 'entityAudit', translate: 'global.menu.admin.entityAudit', routerLink: 'entity-audit', auth: ''},
                {
                    name: 'niopdcConfig',
                    translate: 'global.menu.admin.niopdcConfig',
                    routerLink: 'niopdc-config',
                    auth: 'LIST_NIOPDC_CONFIG'
                },
            ],
            count: 0,
            heights: null,
            collapseIn: false,
            collapsing: false
        },
        {
            translate: 'global.menu.report.main',
            name: 'report',
            icon: 'fa-list-ol',
            subMenu: [
                {
                    name: 'daily-sales',
                    translate: 'global.menu.report.dailySales',
                    routerLink: 'report/daily-sales',
                    auth: 'ROLE_REPORT_DAILY_SALES'
                },
                {
                    name: 'daily-sales-statistical', translate: 'global.menu.report.dailySalesStatistical',
                    routerLink: 'report/daily-sales-statistical', auth: 'ROLE_REPORT_DAILY_SALES_STATISTICAL'
                },
                {
                    name: 'daily-sales-summary',
                    translate: 'global.menu.report.dailySalesSummary',
                    routerLink: 'report/daily-sales-summary',
                    auth: 'ROLE_REPORT_DAILY_SALES_SUMMARY'
                },
                {
                    name: 'consumption',
                    translate: 'global.menu.report.consumption',
                    routerLink: 'report/consumption',
                    auth: 'ROLE_REPORT_CONSUMPTION'
                },
                {
                    name: 'detailsBuy',
                    translate: 'global.menu.report.detailsBuy',
                    routerLink: 'report/details-buy',
                    auth: 'ROLE_REPORT_DETAILS_BUY'
                },
            ],
            count: 0,
            heights: null,
            collapseIn: false,
            collapsing: false
        },
        {
            translate: 'global.menu.reportAo.main',
            name: 'reportAp',
            icon: 'fa-list-ol',
            subMenu: [
                {
                    name: 'moment-sheet-ao',
                    translate: 'global.menu.reportAo.momentSheetAo',
                    routerLink: 'report/moment-sheet/ao',
                    auth: 'ROLE_REPORT_MOMENT_SHEET_AO'
                },
                {
                    name: 'moment-sheet-depot',
                    translate: 'global.menu.reportAo.momentSheetDepot',
                    routerLink: 'report/moment-sheet/depot',
                    auth: 'ROLE_REPORT_MOMENT_SHEET_DEPOT'
                },
                {
                    name: 'metre-sheet',
                    translate: 'global.menu.reportAo.metreSheet',
                    routerLink: 'report/metre-sheet',
                    auth: 'ROLE_REPORT_METRE_SHEET'
                },
                {
                    name: 'aircraft-refueling-records', translate: 'global.menu.reportAo.aircraftRefuelingRecords',
                    routerLink: 'report/aircraft-refueling-records', auth: 'ROLE_AIRCRAFT_REFUELING_RECORD'
                },
                {
                    name: 'airplanes',
                    translate: 'global.menu.reportAo.airplanes',
                    routerLink: 'report/airplanes',
                    auth: 'ROLE_AIR_PLANE'
                },
                {
                    name: 'airlines',
                    translate: 'global.menu.reportAo.airlines',
                    routerLink: 'report/airlines',
                    auth: 'ROLE_AIRLINE'
                },
                {
                    name: 'airports',
                    translate: 'global.menu.reportAo.airports',
                    routerLink: 'report/airports',
                    auth: 'ROLE_AIRPORT'
                },
                {
                    name: 'bill-without-containers',
                    translate: 'global.menu.reportAo.bill-without-containers',
                    routerLink: 'report/bill-without-containers',
                    auth: 'ROLE_BILL_WITHOUT_CONTAINER'
                },
                {
                    name: 'total-sells',
                    translate: 'global.menu.reportAo.total-sell',
                    routerLink: 'report/total-sells',
                    auth: 'ROLE_TOTAL_SELL'
                },
                {
                    name: 'units',
                    translate: 'global.menu.reportAo.unit',
                    routerLink: 'report/units',
                    auth: 'ROLE_REPORT_UNIT'
                },
                {
                    name: 'metres',
                    translate: 'global.menu.reportAo.metre',
                    routerLink: 'report/metres',
                    auth: 'ROLE_REPORT_METRE'
                },
                {
                    name: 'amount-reports',
                    translate: 'global.menu.reportAo.amount-report',
                    routerLink: 'report/amount-reports',
                    auth: 'ROLE_AMOUNT_REPORT'
                },
                {
                    name: 'twenty-four-aos',
                    translate: 'global.menu.reportAo.twenty-four-ao',
                    routerLink: 'report/twenty-four-aos',
                    auth: 'ROLE_TWENTY_FOUR_AO'
                },
                {
                    name: 'sell-report-by-products',
                    translate: 'global.menu.reportAo.sell-report-by-product',
                    routerLink: 'report/sell-report-by-products',
                    auth: 'ROLE_SELL_REPORT_BY_PRODUCT'
                },
                {
                    name: 'receipt-no-details',
                    translate: 'global.menu.reportAo.receipt-no-detail',
                    routerLink: 'report/receipt-no-details',
                    auth: 'ROLE_RECEIPT_NO_DETAIL'
                },
                {
                    name: 'total-sell-grounds',
                    translate: 'global.menu.reportAo.total-sell-ground',
                    routerLink: 'report/total-sell-grounds',
                    auth: 'ROLE_TOTAL_SELL_GROUND'
                },
                {
                    name: 'ao-mount-reports',
                    translate: 'global.menu.reportAo.ao-mount-report',
                    routerLink: 'report/ao-mount-reports',
                    auth: 'ROLE_AO_MOUNT_REPORT'
                },
            ],
            count: 0,
            heights: null,
            collapseIn: false,
            collapsing: false
        }
    ];

    sidebarIsActive;
    expanded;
    expandedRight;
    overlayVisible = false;
    identity: any;

    constructor(private jhiLanguageHelper: JhiLanguageHelper,
                private bankTransactionService: BankTransactionService,
                private router: Router,
                private principal: Principal,
                private loginService: LoginService,
                private languageHelper: JhiLanguageHelper,
                private loginModalService: LoginModalService,
                private profileService: ProfileService) {
    }

    private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
        let title: string = (routeSnapshot.data && routeSnapshot.data['pageTitle']) ? routeSnapshot.data['pageTitle'] : 'samtagatewayApp';
        if (routeSnapshot.firstChild) {
            title = this.getPageTitle(routeSnapshot.firstChild) || title;
        }
        return title;
    }

    ngOnInit() {
        this.principal.getAuthenticationState().subscribe((identity) => {
            this.identity = identity;
            console.log(identity);

            this.menus.forEach((value) => {
                value.count = 0;
                value.subMenu.forEach((value2) => {
                    this.principal.hasAnyAuthority(['ROLE_ADMIN', value2.auth]).then((result) => {
                        if (result) {
                            value.count++;
                        }
                    });
                });
            });
        });
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.jhiLanguageHelper.updateTitle(this.getPageTitle(this.router.routerState.snapshot.root));
            }
        });

        this.languageHelper.getAll().then((languages) => {
            this.languages = languages;
        });

        this.profileService.getProfileInfo().then((profileInfo) => {
            this.inProduction = profileInfo.inProduction;
            this.swaggerEnabled = profileInfo.swaggerEnabled;
        });
    }

    navbarToggle() {
        this.expanded = !this.expanded;
    }

    navbarRightToggle() {
        this.expandedRight = !this.expandedRight;
    }

    getClass(menu) {
        return {
            collapsing: menu.collapsing,
            collapse: !menu.collapsing,
            'in': !menu.collapsing && menu.collapseIn
        };
    }

    getStyle(menu) {
        return {height: menu.heights};
    }

    timerToggle(menu) {

        this.menus.forEach((menu1) => {
            if (menu1 !== menu) {
                menu1.collapsing = true;
                if (menu1.collapseIn) {
                    menu1.heights = ((menu1.count * 43.7) + 'px');
                }
                setTimeout(() => {
                    menu1.heights = null;
                }, 50);

                setTimeout(() => {
                    menu1.heights = null;
                    menu1.collapsing = false;
                    menu1.collapseIn = false;
                }, 500);
            }
        });

        menu.collapsing = true;
        if (menu.collapseIn) {
            menu.heights = ((menu.count * 43.7) + 'px');
        }

        setTimeout(() => {
            menu.heights = !menu.collapseIn ? ((menu.count * 43.7) + 'px') : null;
        }, 50);

        setTimeout(() => {
            menu.heights = null;
            menu.collapsing = false;
            menu.collapseIn = !menu.collapseIn;
        }, 500);
    }

    sidebarActive(active) {
        this.sidebarIsActive = active;
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    chargeWallet() {
        const bt = new BankTransaction();
        bt.type = SpentType.WALLET;
        bt.bankTransactionRefs = [];
        const btr = new BankTransactionRef();
        btr.personId = this.identity.personId;
        bt.bankTransactionRefs.push(btr);
        this.bankTransactionService.createRequestIdentifier(bt).subscribe((value) => {
            this.router.navigate(['/e-payment/', value.body]);
        });
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    register() {
        this.router.navigateByUrl('/person/register');
    }

    logout() {
        this.loginService.logout();
        this.router.navigate(['']);
    }
}
