import {
    Component, OnInit, Input, forwardRef, ViewEncapsulation,
    HostListener, ElementRef
} from '@angular/core';

import { NG_VALUE_ACCESSOR} from '@angular/forms';
import {OrderCost} from '../../../entities/order-cost';
import {ITEMS_PER_PAGE} from '../../';
import {CostResponse} from '../../../entities/order';

export const CUSTOM_ORDER_COST_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => OrderCostTableComponent),
    multi: true
};

@Component({
    selector: 'app-order-cost-table',
    templateUrl: 'order-cost-table.component.html',
    styleUrls: ['order-cost-table.component.css'],
    providers: [CUSTOM_ORDER_COST_INPUT_CONTROL_VALUE_ACCESSOR],
    encapsulation: ViewEncapsulation.None

})
export class OrderCostTableComponent implements OnInit {

    @Input() companyId;

    @Input() multiSelect = false;
    @Input() disabled = false;
    @Input() widthGrid = '100%';
    @Input() costResponses: CostResponse[];
    @Input() productCost: number;
    @Input() productColor: string;

    orderCost: OrderCost = new OrderCost();
    selects: any;

    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any = 1;
    predicate: any = 'id';
    currentSearch: any = '';
    reverse = true;

    overlayVisible: boolean;

    constructor(private elementRef: ElementRef) {
        this.itemsPerPage = ITEMS_PER_PAGE;
    }

    ngOnInit() {
    }

    onChange: any = () => {
    }
    onTouched: any = () => {
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    showTable() {
        if (this.disabled == true) return;
        this.overlayVisible = !this.overlayVisible;
    }

    close() {
        this.overlayVisible = false;
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'desc' : 'asc')];

        return result;
    }
    @HostListener('document:click', ['$event'])
    handleClick(event) {
        let clickedComponent = event.target;
        let inside = false;
        do {
            if (clickedComponent === this.elementRef.nativeElement) {
                inside = true;
            }
            clickedComponent = clickedComponent.parentNode;
        } while (clickedComponent);
        if (!inside) {
            this.close();
        }
    }

}
