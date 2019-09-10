import {
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostListener,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';

import {ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator} from '@angular/forms';
import {TreeNode} from 'primeng/components/common/api';
import {HttpResponse} from '@angular/common/http';
import {Location, LocationService} from '../../../entities/location';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputLocationSelectorComponent),
    multi: true
};

export const CUSTOM_INPUT_CONTROL_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => InputLocationSelectorComponent),
    multi: true
};

@Component({
    selector: 'input-location-selector',
    templateUrl: './inout-location-selector.component.html',
    styleUrls: ['./input-location-selector.component.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR,
        CUSTOM_INPUT_CONTROL_VALIDATOR]
})

export class InputLocationSelectorComponent implements OnInit, OnChanges, ControlValueAccessor, Validator {

    @Output() selected = new EventEmitter();
    @Output() selectedObject = new EventEmitter();
    @Output() locationLoad = new EventEmitter();
    @Input() selectByPriority = false;
    @Input() message: String;
    @Input() customerIds: number[] = null;
    @Input() oneSelection = false;
    @Input() selectOfLevel: 'chiefs' | 'location' | 'sublocation' | 'none' | 'all' | 0 | 1 | 2 | -1 | 3 | number[] = 'all';
    @Input() idSelector = false;
    @Input() disabled = false;
    @Input() firstSelect = false;
    @Input() dataAccess: boolean;
    @Input() counterRangeMax;
    @Input() counterRangeMin;

    selectOfLevels: number[];
    maxSelectOfLevels: number;
    locations: TreeNode[];
    fullLocation: any[][];

    openModal: boolean;
    inputText = '';

    selectedLocations: TreeNode[];
    selectedLocation: TreeNode;
    optionsId: number[];
    valueField: Location[] | Location | number | any;
    valueObject: Location[] | Location | any;
    setLoadedLocationAfterBase: boolean;

    onChange: any = () => {
    };
    onTouched: any = () => {
    };

    constructor(private locationSelectorService: LocationService, private elementRef: ElementRef) {
    }

    get value() {
        return this.valueField;
    }

    set value(val: Location | Location[] | number | number[]) {
        this.valueField = val;
        this.onChange(val);
        this.onTouched();
    }

    ngOnInit(): void {
        this.optionsId = [];
        switch (this.selectOfLevel) {
            case 'chiefs':
                this.selectOfLevels = [0];
                break;
            case 'location':
                this.selectOfLevels = [1];
                break;
            case 'sublocation':
                this.selectOfLevels = [2];
                break;
            case 'none' :
            case -1:
                this.selectOfLevels = null;
                break;
            case 3:
            case 'all':
                this.selectOfLevels = [0, 1, 2];
                break;
        }

        if (typeof this.selectOfLevel === 'number' && this.selectOfLevel >= 0 && this.selectOfLevel < 3) {
            this.selectOfLevels = [this.selectOfLevel];
        } else if (this.selectOfLevel instanceof Array) {
            this.selectOfLevels = this.selectOfLevel;
        }

        this.maxSelectOfLevels = Math.max(...this.selectOfLevels);

        this.locations = [];

        this.locationSelectorService.querySelector(-1, {
            dataAccess: this.dataAccess,
            customerIds: this.customerIds
        }).subscribe((r: HttpResponse<Location[]>) => {
            this.locations = r.body.map((c: Location) => {
                return <TreeNode> {
                    data: {item: c, level: 0},
                    label: c.name,
                    leaf: this.maxSelectOfLevels <= 0 || false,
                };
            });
            if (!this.oneSelection && this.firstSelect && this.selectedLocations && !this.selectedLocations.length) {
                this.value = (this.idSelector) ? r.body.map((l: Location) => l.id) : r.body;
            }
            if (this.setLoadedLocationAfterBase){
                for (let value2 in  this.fullLocation) {
                    this.setLoadedLocationToLocationsTree(this.locations, this.fullLocation[value2]);
                }
            }
            this.checkSelectedRoot();
        });

    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.customerIds && !changes.customerIds.isFirstChange()) {
            this.selectedLocation = this.selectedLocations = null;
            this.fullLocation = [];
            this.value = null;
            this.inputText = '';
            this.ngOnInit();
        }
    }

    writeValue(val: any) {
        if (val == null) {
            val = this.oneSelection ? null : [];
        }

        if (val !== this.value) {
            this.value = val;
            this.select();
        }
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    nodeExpand(event) {
        if (event.node && !event.node.children) {
            this.locationSelectorService.querySelector(event.node.data.item.id, {
                dataAccess: this.dataAccess,
                customerIds: this.customerIds
            }).toPromise()
                .then((nodes) => {
                        event.node.children = nodes.body
                            .map((c) => {
                                return <TreeNode> {
                                    data: {item: c, level: event.node.data.level + 1},
                                    label: c.name,
                                    leaf: this.maxSelectOfLevels <= event.node.data.level + 1 || false,
                                    parent: event.node
                                };
                            });

                        this.load(event);
                        this.checkSelectedRoot();
                    }
                );
        }
    }

    load(event) {
        if (this.value instanceof Array &&
            this.selectedLocations.length < this.value.length) {
            for (const node of event.node.children) {
                this.checkSelected(node);
            }
        } else if ((!(this.value instanceof Array) || typeof(this.value) === 'number') && !this.selectedLocation) {
            for (const node of event.node.children) {
                if (!this.selectedLocation) {
                    this.checkSelected(node);
                }
            }
        }
    }

    clearSelected() {
        this.selectedLocation = this.selectedLocations = null;
        this.valueObject = null;
        this.fullLocation = [];
        this.inputText = '';
        this.value = null;
        this.selected.emit(this.oneSelection ? this.selectedLocation : this.selectedLocations);
        this.selectedObject.emit(this.valueObject);
        this.generateText();
    }

    nodeSelect(event) {
        if (!this.oneSelection) {
            this.fullLocation[event.node.data.item.id] = this.getParent(event.node);
            this.nodeExpand(event);
        }
        this.selectedByLevel();
        if (this.oneSelection) {
            this.openModal = false;
        }
    }

    getParent(node: TreeNode): number[] {
        if (node.parent) {
            const parent1 = this.getParent(node.parent);
            parent1.push(node.data.item.id);
            return parent1;
        }
        return [node.data.item.id];
    }

    nodeUnSelect(event) {
        if (!this.oneSelection) {
            delete this.fullLocation[event.node.data.item.id];
        }
        this.selectedByLevel();
    }

    selectedByLevel() {
        if (!this.oneSelection) {
            this.valueField = [];
            this.valueObject = [];
        }

        // در حالت یک انتخابی باشد
        if (this.oneSelection) {
            if (this.selectedLocation && this.selectedLocation.data
                && this.selectOfLevels.indexOf(this.selectedLocation.data.level) >= 0) {
                this.value = typeof(this.value) === 'number' || this.idSelector === true
                    ? this.selectedLocation.data.item.id
                    : this.selectedLocation.data.item;
                this.valueObject = this.selectedLocation.data.item;
            } else {
                this.selectedLocation = null;
                this.value = null;
                this.valueObject = null;
            }
        } else if (this.valueField instanceof Array && this.locations && this.locations.length) {
            if (this.selectByPriority) {
                // منطقه ها بارگذاری شده باشند
                if (this.locations && this.locations.length) {
                    for (const l of this.locations) {
                        // آیا ایتم در لیست انتخاب شده ها وجود دارد.
                        let ex = false;
                        if (this.selectedLocations && this.selectedLocations.length) {
                            for (const sel of this.selectedLocations) {
                                if (sel.data.item.id === l.data.item.id) {
                                    ex = true;
                                }
                            }
                        }
                        // در صورت وجود و لول آن در لیست لول ها باشد اضافه شود
                        if (ex && this.selectOfLevels.indexOf(l.data.level) >= 0) {
                            this.valueField.push(this.idSelector ? l.data.item.id : l.data.item);
                            this.valueObject.push(l.data.item);
                        } else if (l.children && l.children.length && l.children.length > 0) {
                            this.addChildrenSelected(l);
                        }
                    }
                }
            } else {
                if (this.selectedLocations && this.selectedLocations.length) {
                    if (this.valueField instanceof Array) {
                        for (const l of this.selectedLocations) {
                            if (this.selectOfLevels.indexOf(l.data.level) >= 0) {
                                this.valueField.push(this.idSelector ? l.data.item.id : l.data.item);
                                this.valueObject.push(l.data.item);
                            }
                        }
                    }
                }
            }
        }
        this.value = this.valueField;
        this.selected.emit(this.oneSelection ? this.selectedLocation : this.selectedLocations);
        this.selectedObject.emit(this.valueObject);
        this.generateText();
    }

    addChildrenSelected(treenode: TreeNode) {
        if (this.valueField instanceof Array && treenode.children && treenode.children.length) {
            for (const l of treenode.children) {
                let ex = false;
                if (this.selectedLocations && this.selectedLocations.length) {
                    for (const sel of this.selectedLocations) {
                        if (sel.data.item.id === l.data.item.id) {
                            ex = true;
                        }
                    }
                }

                if (ex && this.selectOfLevels.indexOf(l.data.level) >= 0) {
                    this.valueField.push(this.idSelector ? l.data.item.id : l.data.item);
                    this.valueObject.push(l.data.item);
                } else if (l.children && l.children.length && l.children.length > 0) {
                    this.addChildrenSelected(l);
                }

            }
        }
    }

    validate() {
        const err = {
            rangeError: {
                given: this.value,
                max: this.counterRangeMax || 10,
                min: this.counterRangeMin || 0
            }
        };

        return (this.value instanceof Array) ? (this.value.length > +this.counterRangeMax || this.value.length < +this.counterRangeMin) ? err : null : null;
    }

    clickInput() {
        this.openModal = true;
    }

    @HostListener('document:click', ['$event'])
    blurInput(event) {
        let clickedComponent = event.target;
        let inside = false;
        do {
            if (clickedComponent === this.elementRef.nativeElement) {
                inside = true;
            }
            clickedComponent = clickedComponent.parentNode;
        } while (clickedComponent);
        if (!inside) {
            this.openModal = false;
        }
    }

    private generateText() {
        this.inputText = '';
        if (this.oneSelection) {
            this.inputText = this.valueObject.name;
        } else {
            if (this.valueObject) {
                this.valueObject.forEach((location) => {
                    this.inputText += location.name + '،';
                });
                this.inputText = this.inputText.slice(0, -1);
            }
        }
    }

    private select() {
        if (this.value) {
            let valueOfArrayList = this.getValueOfArrayList();
            if (valueOfArrayList && valueOfArrayList.length) {
                this.locationSelectorService.findAllRecursiveParent(
                    valueOfArrayList, {customerIds: this.customerIds}).subscribe((value1) => {
                    this.fullLocation = value1.body;
                    for (let value2 in  this.fullLocation) {
                        if (!this.locations || !this.locations.length) {
                            console.log('empty locations ----------------------------------------');
                            this.setLoadedLocationAfterBase = true;
                        }
                        this.setLoadedLocationToLocationsTree(this.locations, this.fullLocation[value2]);
                    }
                    this.checkSelectedRoot();
                });
            } else {
                this.clearSelected();
            }

        }
    }

    setLoadedLocationToLocationsTree(locations: TreeNode[], loadedLocations: Location[]) {
        locations.forEach(treeNode => {
            loadedLocations.forEach((location: Location) => {
                if (treeNode.data.item.id === location.id) {
                    if (treeNode && (!treeNode.children || !treeNode.children.length)) {
                        treeNode.children = location.subLocations
                            .map((c) => {
                                return <TreeNode> {
                                    data: {item: c, level: treeNode.data.level + 1},
                                    label: c.name,
                                    leaf: this.maxSelectOfLevels <= treeNode.data.level + 1 || false,
                                    parent: treeNode
                                };
                            });
                    }
                }
            });
            if (treeNode.children && treeNode.children.length)
                this.setLoadedLocationToLocationsTree(treeNode.children, loadedLocations);
        });


    }

    private getValueOfArrayList(): number[] {
        if (this.value) {
            return (this.value instanceof Array && this.oneSelection === false) ?
                this.valueField.map((val) => {
                    return (typeof val === 'number') ? val : val.id;
                }) : typeof this.value !== 'number' && !(this.value instanceof Array) ? [this.value.id] : [this.value];
        }
    }

    private checkSelectedRoot() {
        this.selectedLocations = [];
        if (this.fullLocation && this.value) {
            const valueOfArrayList = this.getValueOfArrayList();
            let allLoaded = true;
            for (const id of valueOfArrayList) {
                if (this.fullLocation[id] && this.fullLocation[id][0]) {
                    if (!this.findNodeExpand(this.fullLocation[id], this.fullLocation[id][0], 0, this.locations)) {
                        allLoaded = false;
                        break;
                    }
                }
            }
            if (allLoaded && ((!this.oneSelection && this.selectedLocations && this.selectedLocations.length) || (this.oneSelection && this.selectedLocation))) {
                this.selectedByLevel();
            }
        }
    }

    private findNodeExpand(fullLocation: Location[], location: Location, locationIndex: number, locations: TreeNode[]) {
        for (const node of locations) {
            if (node.data.level === locationIndex && node.data.item.id === location.id) {
                if (this.getValueOfArrayList().includes(location.id)) {
                    this.checkSelected(node);
                } else {
                    if (node && !node.children) {
                        this.nodeExpand({node});
                        return false;
                    } else if (node.children && node.children.length) {
                        node.expanded = true;
                        if (!this.findNodeExpand(fullLocation, fullLocation[locationIndex + 1], locationIndex + 1, node.children)) {
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    }

    private checkSelected(node) {
        if (this.value) {
            if (this.value instanceof Array && this.oneSelection === false) {

                let pushed = false;
                for (const select of this.value) {
                    if (node.data.item.id === ((typeof select === 'number') ? select : select.id)) {
                        this.selectedLocations.push(node);
                        pushed = true;
                        break;
                    }
                }
                // آیا آیتمی که باز میشود قبلا انتخاب شده است...
                let is_selected = false;

                if (this.selectedLocations && this.selectedLocations.length) {
                    for (const sel of this.selectedLocations) {
                        if (sel.data.item.id === node.data.item.id) {
                            is_selected = true;
                            break;
                        }
                    }
                }

                // انتخاب آیتم های فرزند در صورتی که ایتم پدر انتخاب شده باشد.
                if (is_selected && node.children && node.children.length) {
                    for (const loc of node.children) {
                        this.selectedLocations.push(loc);
                        this.checkSelected(loc);
                    }
                }

            } else if (!(this.value instanceof Array) || typeof this.value === 'number') {
                if (node.data.item.id === (typeof this.value !== 'number' ? this.value.id : this.value)) {
                    this.selectedLocation = node;
                }
                /*else {
                                   this.expandRecursive(node, true);
                               }*/
            }
        }
    }

    private expandRecursive(node: TreeNode, isExpand: boolean) {
        node.expanded = isExpand;
        // this.nodeExpand({node});
        if (node.children) {
            node.children.forEach((childNode) => {
                this.expandRecursive(childNode, isExpand);
            });
        }
    }
}
