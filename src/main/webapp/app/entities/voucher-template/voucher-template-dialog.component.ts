import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {VoucherTemplate} from './voucher-template.model';
import {VoucherTemplatePopupService} from './voucher-template-popup.service';
import {VoucherTemplateService} from './voucher-template.service';
import {VoucherType, VoucherTypeService} from '../voucher-type';
import {VoucherMapping} from '../voucher-mapping/voucher-mapping.model';
import {BaseQuery, BaseQueryService} from '../base-query/.';
import {UsefulId} from "../order/order-dialog.component";

// import { QueryBuilderConfig } from "angular2-query-builder";

@Component({
    selector: 'jhi-voucher-template-dialog',
    templateUrl: './voucher-template-dialog.component.html'
})
export class VoucherTemplateDialogComponent implements OnInit {

    voucherTemplate: VoucherTemplate;
    isSaving: boolean;
    isView: boolean;
    voucherTypes: VoucherType[];
    voucherMapping: VoucherMapping;
    voucherMappingCreate: Boolean;
    baseQueries: BaseQuery[];
    config: any;
    query: any;
    voucherMappingCreateExtraMap: Boolean;
    extraMap: any;
    extraMapTemp: any;
    voucherMappingCreateSpecialMap: Boolean;
    specialMap: any;
    specialMapTemp: any;
    voucherMappingCreateCreditMap: Boolean;
    creditMap: any;
    creditMapTemp: any;
    voucherMappingCreateDebitMap: Boolean;
    debitMap: any;
    debitMapTemp: any;
    voucherMappingCreateDescriptionMap: Boolean;
    descriptionMap: any;
    descriptionMapTemp: any;
    voucherMappingCreateAccountNoMap: Boolean;
    accountNoMap: any;
    accountNoMapTemp: any;
    voucherMappingCreateSuffixMap: Boolean;
    suffixMap: any;
    suffixMapTemp: any;
    voucherMappingCreateKeyMap: Boolean;
    keyMap: any;
    keyMapTemp: any;
    cols: any;
    mapCols: any;
    baseQueryResult: any;
    mapQueryResult: any;
    resultList: any;
    mapResultList: any;
    baseQueryFields: any;
    mapQueryFields: any;
    locationId: any;
    dateTime: any;



    constructor(private jhiAlertService: JhiAlertService,
                private router: Router,
                private voucherTemplateService: VoucherTemplateService,
                private baseQueryService: BaseQueryService,
                private voucherTypeService: VoucherTypeService,
                private eventManager: JhiEventManager,
                private route: ActivatedRoute,
                private voucherTemplatePopupService: VoucherTemplatePopupService) {
    }

    trackBaseQueryById(index: number, item: VoucherType) {
        return item.id;
    }


    runQuery() {
        this.baseQueryService.resultList(this.voucherMapping.baseQueryId,this.dateTime,this.locationId).subscribe((baseQueryResult) => {
            this.baseQueryResult = baseQueryResult.body;
            this.resultList = [];
            this.baseQueryResult.resultList.forEach((value) => {
                let column: any;
                column = {};
                for (let i = 0; i < this.baseQueryResult.header.length; i++) {
                    column[this.baseQueryResult.header[i]] = value[i];
                }
                this.resultList.push(column);

            });

            this.cols = [];
            this.config = {};
            this.config.fields = {};
            this.baseQueryFields = [];
            this.baseQueryResult.header.forEach((value) => {
                let header: any;
                this.baseQueryFields.push(value);
                header = {};
                header.field = value;
                this.config.fields[value] =
                    {
                        name: value,
                        type: 'string',
                        operators: [
                            '=',
                            '<>',
                            '<=',
                            '>=',
                            '>',
                            '<',
                            'like',
                            'is null',
                            'is not null'
                        ]
                    };
                header.header = value;
                this.cols.push(header);
            });
            this.cols = this.cols.reverse();

        });
    }

    newVoucherMapping() {
        this.voucherMapping = new VoucherMapping();
        this.voucherMapping.extraMap = [];
        this.voucherMapping.specialMap = [];
        this.voucherMapping.creditMap = [];
        this.voucherMapping.debitMap = [];
        this.voucherMapping.descriptionMap = [];
        this.voucherMapping.accountNoMap = [];
        this.voucherMapping.suffixMap = [];
        this.voucherMapping.keyMap = [];
        this.voucherMapping.baseQueryId = null;
        this.locationId = null;
        this.dateTime = null;
        this.voucherMappingCreate = true;
        this.resultList = null;
        this.init();
    }
    addVoucherMapping() {
        if (!this.voucherTemplate.voucherMappings) {
            this.voucherTemplate.voucherMappings = [];
        }
        const voucherMapping = new VoucherMapping();
        voucherMapping.extraMap = JSON.stringify(this.voucherMapping.extraMap);
        voucherMapping.specialMap = JSON.stringify(this.voucherMapping.specialMap);
        voucherMapping.creditMap = JSON.stringify(this.voucherMapping.creditMap);
        voucherMapping.debitMap = JSON.stringify(this.voucherMapping.debitMap);
        voucherMapping.descriptionMap = JSON.stringify(this.voucherMapping.descriptionMap);
        voucherMapping.accountNoMap = JSON.stringify(this.voucherMapping.accountNoMap);
        voucherMapping.suffixMap = JSON.stringify(this.voucherMapping.suffixMap);
        voucherMapping.keyMap = JSON.stringify(this.voucherMapping.keyMap);
        voucherMapping.baseQueryId = this.voucherMapping.baseQueryId;
        voucherMapping.rowNo = this.voucherMapping.rowNo;
        voucherMapping.voucherTemplateId = this.voucherMapping.voucherTemplateId;
        voucherMapping.id = this.voucherMapping.id;

        if (this.voucherMapping.id != null)
            this.voucherTemplate.voucherMappings.splice(
                this.voucherTemplate.voucherMappings
                    .findIndex((value) => value.id === this.voucherMapping.id)
                , 1
            );
        this.voucherTemplate.voucherMappings.push(voucherMapping);
        this.voucherMappingCreate = false;
    }
    removeVoucherMapping(item) {
        this.voucherTemplate.voucherMappings.splice(
            this.voucherTemplate.voucherMappings
                .findIndex((value) => value === item)
            , 1
        );
    }
    updateVoucherMapping(item) {
        this.voucherMapping.extraMap = JSON.parse(item.extraMap);
        this.voucherMapping.specialMap = JSON.parse(item.specialMap);
        this.voucherMapping.creditMap = JSON.parse(item.creditMap);
        this.voucherMapping.debitMap = JSON.parse(item.debitMap);
        this.voucherMapping.descriptionMap = JSON.parse(item.descriptionMap);
        this.voucherMapping.accountNoMap = JSON.parse(item.accountNoMap);
        this.voucherMapping.suffixMap = JSON.parse(item.suffixMap);
        this.voucherMapping.keyMap = JSON.parse(item.keyMap);
        this.voucherMapping.baseQueryId = item.baseQueryId;
        this.voucherMapping.rowNo = item.rowNo;
        this.voucherMapping.voucherTemplateId = item.voucherTemplateId;
        this.voucherMapping.id = item.id;
        this.resultList = null;
        this.locationId = null;
        this.dateTime = null;
        this.voucherMappingCreate = true;
        this.init();
    }
    cancelVoucherMapping() {
        this.voucherMappingCreate = false;
    }
    init(){
        this.config = null;
        this.resultList = null;
        this.mapResultList = null;
        this.mapCols = null;
        this.baseQueryFields=null;
    }


    newVoucherMappingExtraMap() {
        this.extraMap = {};
        this.extraMap.value = '';
        this.extraMap.name = '';
        this.extraMap.map = {
            condition: 'and',
            rules: []
        };
        this.voucherMappingCreateExtraMap = true;
    }
    addVoucherMappingExtraMap() {
        if (!this.voucherMapping.extraMap) {
            this.voucherMapping.extraMap = [];
        }
        this.voucherMapping.extraMap.push(this.extraMap);
        this.extraMapTemp = null;
        this.voucherMappingCreateExtraMap = false;
    }
    removeVoucherMappingExtraMap(item) {
        this.voucherMapping.extraMap.splice(
            this.voucherMapping.extraMap
                .findIndex((value) => value === item)
            , 1
        );
    }
    updateVoucherMappingExtraMap(item) {
        this.extraMap = item;
        this.extraMapTemp = item;
        this.removeVoucherMappingExtraMap(item);
        this.voucherMappingCreateExtraMap = true;
    }
    cancelVoucherMappingExtraMap() {
        if (this.extraMapTemp != null)
            this.voucherMapping.extraMap.push(this.extraMapTemp);
        this.voucherMappingCreateExtraMap = false;
    }

    newVoucherMappingSpecialMap() {
        this.specialMap = {};
        this.specialMap.value = '';
        this.specialMap.name = '';
        this.specialMap.map = {
            condition: 'and',
            rules: []
        };
        this.voucherMappingCreateSpecialMap = true;
    }
    addVoucherMappingSpecialMap() {
        if (!this.voucherMapping.specialMap) {
            this.voucherMapping.specialMap = [];
        }
        this.voucherMapping.specialMap.push(this.specialMap);
        this.specialMapTemp = null;
        this.voucherMappingCreateSpecialMap = false;
    }
    removeVoucherMappingSpecialMap(item) {
        this.voucherMapping.specialMap.splice(
            this.voucherMapping.specialMap
                .findIndex((value) => value === item)
            , 1
        );
    }
    updateVoucherMappingSpecialMap(item) {
        this.specialMap = item;
        this.specialMapTemp = item;
        this.removeVoucherMappingSpecialMap(item);
        this.voucherMappingCreateSpecialMap = true;
    }
    cancelVoucherMappingSpecialMap() {
        if (this.specialMapTemp != null) {
            this.voucherMapping.specialMap.push(this.specialMapTemp);
        }
        this.voucherMappingCreateSpecialMap = false;
    }

    newVoucherMappingCreditMap() {
        this.creditMap = {};
        this.creditMap.value = '';
        this.creditMap.name = '';
        this.creditMap.map = {
            condition: 'and',
            rules: []
        };
        this.voucherMappingCreateCreditMap = true;
    }
    addVoucherMappingCreditMap() {
        if (!this.voucherMapping.creditMap) {
            this.voucherMapping.creditMap = [];
        }
        this.voucherMapping.creditMap.push(this.creditMap);
        this.creditMapTemp = null;
        this.voucherMappingCreateCreditMap = false;
    }
    removeVoucherMappingCreditMap(item) {
        this.voucherMapping.creditMap.splice(
            this.voucherMapping.creditMap
                .findIndex((value) => value === item)
            , 1
        );
    }
    updateVoucherMappingCreditMap(item) {
        this.creditMap = item;
        this.creditMapTemp = item;
        this.removeVoucherMappingCreditMap(item);
        this.voucherMappingCreateCreditMap = true;
    }
    cancelVoucherMappingCreditMap() {
        if (this.creditMapTemp != null) {
            this.voucherMapping.creditMap.push(this.creditMapTemp);
        }
        this.voucherMappingCreateCreditMap = false;
    }

    newVoucherMappingDebitMap() {
        this.debitMap = {};
        this.debitMap.value = '';
        this.debitMap.name = '';
        this.debitMap.map = {
            condition: 'and',
            rules: []
        };
        this.voucherMappingCreateDebitMap = true;
    }
    addVoucherMappingDebitMap() {
        if (!this.voucherMapping.debitMap) {
            this.voucherMapping.debitMap = [];
        }
        this.voucherMapping.debitMap.push(this.debitMap);
        this.debitMapTemp = null;
        this.voucherMappingCreateDebitMap = false;
    }
    removeVoucherMappingDebitMap(item) {
        this.voucherMapping.debitMap.splice(
            this.voucherMapping.debitMap
                .findIndex((value) => value === item)
            , 1
        );
    }
    updateVoucherMappingDebitMap(item) {
        this.debitMap = item;
        this.debitMapTemp = item;
        this.removeVoucherMappingDebitMap(item);
        this.voucherMappingCreateDebitMap = true;
    }
    cancelVoucherMappingDebitMap() {
        if (this.debitMapTemp != null) {
            this.voucherMapping.debitMap.push(this.debitMapTemp);
        }
        this.voucherMappingCreateDebitMap = false;
    }

    newVoucherMappingDescriptionMap() {
        this.descriptionMap = {};
        this.descriptionMap.value = '';
        this.descriptionMap.name = '';
        this.descriptionMap.map = {
            condition: 'and',
            rules: []
        };
        this.voucherMappingCreateDescriptionMap = true;
    }
    addVoucherMappingDescriptionMap() {
        if (!this.voucherMapping.descriptionMap) {
            this.voucherMapping.descriptionMap = [];
        }
        this.voucherMapping.descriptionMap.push(this.descriptionMap);
        this.descriptionMapTemp = null;
        this.voucherMappingCreateDescriptionMap = false;
    }
    removeVoucherMappingDescriptionMap(item) {
        this.voucherMapping.descriptionMap.splice(
            this.voucherMapping.descriptionMap
                .findIndex((value) => value === item)
            , 1
        );
    }
    updateVoucherMappingDescriptionMap(item) {
        this.descriptionMap = item;
        this.descriptionMapTemp = item;
        this.removeVoucherMappingDescriptionMap(item);
        this.voucherMappingCreateDescriptionMap = true;
    }
    cancelVoucherMappingDescriptionMap() {
        if (this.descriptionMapTemp != null) {
            this.voucherMapping.descriptionMap.push(this.descriptionMapTemp);
        }
        this.voucherMappingCreateDescriptionMap = false;
    }

    newVoucherMappingAccountNoMap() {
        this.accountNoMap = {};
        this.accountNoMap.value = '';
        this.accountNoMap.name = '';
        this.accountNoMap.map = {
            condition: 'and',
            rules: []
        };
        this.voucherMappingCreateAccountNoMap = true;
    }
    addVoucherMappingAccountNoMap() {
        if (!this.voucherMapping.accountNoMap) {
            this.voucherMapping.accountNoMap = [];
        }
        this.voucherMapping.accountNoMap.push(this.accountNoMap);
        this.accountNoMapTemp = null;
        this.voucherMappingCreateAccountNoMap = false;
    }
    removeVoucherMappingAccountNoMap(item) {
        this.voucherMapping.accountNoMap.splice(
            this.voucherMapping.accountNoMap
                .findIndex((value) => value === item)
            , 1
        );
    }
    updateVoucherMappingAccountNoMap(item) {
        this.accountNoMap = item;
        this.accountNoMapTemp = item;
        this.removeVoucherMappingAccountNoMap(item);
        this.voucherMappingCreateAccountNoMap = true;
    }
    cancelVoucherMappingAccountNoMap() {
        if (this.accountNoMapTemp != null) {
            this.voucherMapping.accountNoMap.push(this.accountNoMapTemp);
        }
        this.voucherMappingCreateAccountNoMap = false;
    }

    newVoucherMappingSuffixMap() {
        this.suffixMap = {};
        this.suffixMap.value = '';
        this.suffixMap.name = '';
        this.suffixMap.map = {
            condition: 'and',
            rules: []
        };
        this.voucherMappingCreateSuffixMap = true;
    }
    addVoucherMappingSuffixMap() {
        if (!this.voucherMapping.suffixMap) {
            this.voucherMapping.suffixMap = [];
        }
        this.voucherMapping.suffixMap.push(this.suffixMap);
        this.suffixMapTemp = null;
        this.voucherMappingCreateSuffixMap = false;
    }
    removeVoucherMappingSuffixMap(item) {
        this.voucherMapping.suffixMap.splice(
            this.voucherMapping.suffixMap
                .findIndex((value) => value === item)
            , 1
        );
    }
    updateVoucherMappingSuffixMap(item) {
        this.suffixMap = item;
        this.suffixMapTemp = item;
        this.removeVoucherMappingSuffixMap(item);
        this.voucherMappingCreateSuffixMap = true;
    }
    cancelVoucherMappingSuffixMap() {
        if (this.suffixMapTemp != null) {
            this.voucherMapping.suffixMap.push(this.suffixMapTemp);
        }
        this.voucherMappingCreateSuffixMap = false;
    }

    newVoucherMappingKeyMap() {
        this.keyMap = {};
        this.keyMap.value = '';
        this.keyMap.name = '';
        this.keyMap.map = {
            condition: 'and',
            rules: []
        };
        this.voucherMappingCreateKeyMap = true;
    }
    addVoucherMappingKeyMap() {
        if (!this.voucherMapping.keyMap) {
            this.voucherMapping.keyMap = [];
        }
        this.voucherMapping.keyMap.push(this.keyMap);
        this.keyMapTemp = null;
        this.voucherMappingCreateKeyMap = false;
    }
    removeVoucherMappingKeyMap(item) {
        this.voucherMapping.keyMap.splice(
            this.voucherMapping.keyMap
                .findIndex((value) => value === item)
            , 1
        );
    }
    updateVoucherMappingKeyMap(item) {
        this.keyMap = item;
        this.keyMapTemp = item;
        this.removeVoucherMappingKeyMap(item);
        this.voucherMappingCreateKeyMap = true;
    }
    cancelVoucherMappingKeyMap() {
        if (this.keyMapTemp != null) {
            this.voucherMapping.keyMap.push(this.keyMapTemp);
        }
        this.voucherMappingCreateKeyMap = false;
    }

    showQuery() {

        const voucherMapping = new VoucherMapping();
        voucherMapping.extraMap = JSON.stringify(this.voucherMapping.extraMap);
        voucherMapping.specialMap = JSON.stringify(this.voucherMapping.specialMap);
        voucherMapping.creditMap = JSON.stringify(this.voucherMapping.creditMap);
        voucherMapping.debitMap = JSON.stringify(this.voucherMapping.debitMap);
        voucherMapping.descriptionMap = JSON.stringify(this.voucherMapping.descriptionMap);
        voucherMapping.accountNoMap = JSON.stringify(this.voucherMapping.accountNoMap);
        voucherMapping.suffixMap = JSON.stringify(this.voucherMapping.suffixMap);
        voucherMapping.keyMap = JSON.stringify(this.voucherMapping.keyMap);
        voucherMapping.baseQueryId = this.voucherMapping.baseQueryId;
        voucherMapping.voucherTemplateId = this.voucherMapping.voucherTemplateId;
        voucherMapping.id = this.voucherMapping.id;


        this.voucherTemplateService.showQuery(voucherMapping,this.dateTime,this.locationId).subscribe((baseQueryResult) => {
            this.mapQueryResult = baseQueryResult.body;
            this.mapResultList = [];
            this.mapQueryResult.resultList .forEach((value) => {
                let column: any;
                column = {};
                for (let i = 0; i < this.mapQueryResult.header.length; i++) {
                    column[this.mapQueryResult.header[i]] = value[i];
                }
                this.mapResultList.push(column);
            });
            this.mapCols = [];
            this.mapQueryFields = [];
            this.mapQueryResult.header.forEach((value) => {
                let header: any;
                this.mapQueryFields.push(value);
                header = {};
                header.field = value;
                header.header = value;
                this.mapCols.push(header);
            });
            this.mapCols = this.mapCols.reverse();

        });
    }

    ngOnInit() {
        this.route.params.subscribe((params) => {
            View.isView = !!params['view'];
            if (params['id']) {
                this.voucherTemplate= new VoucherTemplate();
                this.voucherTemplate.id=params['id'];
                this.voucherTemplateService.find(params['id']).subscribe((voucherTemplate) => {
                    this.voucherTemplate = voucherTemplate.body;
                });
            } else {
                const voucherTemplate = new VoucherTemplate();
                this.voucherTemplate = voucherTemplate;
            }
        });

        this.voucherMapping = new VoucherMapping();

        this.voucherMapping.extraMap = [];
        this.voucherMapping.specialMap = [];
        this.voucherMapping.creditMap = [];
        this.voucherMapping.debitMap = [];
        this.voucherMapping.descriptionMap = [];
        this.voucherMapping.accountNoMap = [];
        this.voucherMapping.suffixMap = [];
        this.voucherMapping.keyMap = [];


        this.extraMap = {};
        this.extraMap.value = '';
        this.extraMap.name = '';
        this.extraMap.map = {
            condition: 'and',
            rules: []
        };

        this.specialMap = {};
        this.specialMap.value = '';
        this.specialMap.name = '';
        this.specialMap.map = {
            condition: 'and',
            rules: []
        };

        this.creditMap = {};
        this.creditMap.value = '';
        this.creditMap.name = '';
        this.creditMap.map = {
            condition: 'and',
            rules: []
        };

        this.debitMap = {};
        this.debitMap.value = '';
        this.debitMap.name = '';
        this.debitMap.map = {
            condition: 'and',
            rules: []
        };

        this.descriptionMap = {};
        this.descriptionMap.value = '';
        this.descriptionMap.name = '';
        this.descriptionMap.map = {
            condition: 'and',
            rules: []
        };

        this.accountNoMap = {};
        this.accountNoMap.value = '';
        this.accountNoMap.name = '';
        this.accountNoMap.map = {
            condition: 'and',
            rules: []
        };

        this.suffixMap = {};
        this.suffixMap.value = '';
        this.suffixMap.name = '';
        this.suffixMap.map = {
            condition: 'and',
            rules: []
        };

        this.keyMap = {};
        this.keyMap.value = '';
        this.keyMap.name = '';
        this.keyMap.map = {
            condition: 'and',
            rules: []
        };

        this.isView = View.isView;
        this.isSaving = false;
        this.voucherTypeService.query()
            .subscribe((res: HttpResponse<VoucherType[]>) => {
                this.voucherTypes = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.baseQueryService.query().subscribe(
            (res) => {
                this.baseQueries = res.body;
            }
        );

    }

    clear() {
        this.router.navigate(['/voucher-template']);
        // this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.voucherTemplate.id !== undefined) {
            this.subscribeToSaveResponse(
                this.voucherTemplateService.update(this.voucherTemplate));
        } else {
            this.subscribeToSaveResponse(
                this.voucherTemplateService.create(this.voucherTemplate));
        }
    }

    trackVoucherTypeById(index: number, item: VoucherType) {
        return item.id;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<VoucherTemplate>>) {
        result.subscribe((res: HttpResponse<VoucherTemplate>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: VoucherTemplate) {
        this.eventManager.broadcast({name: 'voucherTemplateListModification', content: 'OK'});
        this.isSaving = false;
        this.router.navigate(['/voucher-template']);
        // this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

}

/*@Component({
    selector: 'jhi-voucher-template-popup',
    template: ''
})
export class VoucherTemplatePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private voucherTemplatePopupService: VoucherTemplatePopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.voucherTemplatePopupService
                    .open(VoucherTemplateDialogComponent as Component, params['id']);
            } else {
                this.voucherTemplatePopupService
                    .open(VoucherTemplateDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}*/

class View {
    static isView: boolean;
}
