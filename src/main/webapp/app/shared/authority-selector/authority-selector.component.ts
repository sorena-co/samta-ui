/**
 * Created by mehrabi-s on 29/05/2017.
 */
import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange} from '@angular/core';
import {TreeNode} from 'primeng/primeng';
import {ParentAuthority} from '../../entities/parent-authority/parent-authority.model';
import {MainAuthority} from '../../entities/main-authority/main-authority.model';

@Component({
    selector: 'app-authority-selector',
    templateUrl: 'authority-selector.component.html'
})
export class AuthoritySelectorComponent implements OnChanges, OnInit, AfterViewInit {
    isAdmin: boolean;

    // filesTree5: TreeNode[];
    @Input() disabled = false;
    @Input() authGroup: ParentAuthority[];
    @Input() authorities;
    @Input() roleAuthorities;
    @Input() denyAuthorities;
    @Input() denyRoleAuthorities;
    @Input() disabledAuthorities;
    @Input() enableAuthorities: MainAuthority[];
    @Output() onAuthorities = new EventEmitter();
    @Output() onDenyAuthorities = new EventEmitter();
    _authGroup: TreeNode[];
    value: any;

    constructor() {
        // this.changeAuthGroup();
    }

    ngAfterViewInit(): void {
        // this.changeAuthGroup();
    }

    ngOnInit(): void {
        // this.changeAuthGroup();

    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (changes['authGroup'] && this.authGroup || changes['roleAuthorities'] && this.roleAuthorities || changes['denyRoleAuthorities'] && this.denyRoleAuthorities || changes['enableAuthorities'] && this.enableAuthorities) {
            const all: MainAuthority[] = [];
            if (this.authGroup && this.authGroup.length > 0) {
                this.authGroup.forEach((g) => {
                        if (g.authorities && g.authorities.length > 0) {
                            g.authorities.forEach((s) => all.push(s));
                        }
                    }
                );
            }
            this.isAdmin = this.enableAuthorities && this.enableAuthorities.length && this.enableAuthorities.find((as) => as.name === 'ROLE_ADMIN') != null;
            this.disabledAuthorities = all.filter((a) => (this.enableAuthorities && this.enableAuthorities.length && this.enableAuthorities.find((as) => as.name === a.name || this.isAdmin) != null));

            this.changeAuthGroup();
        }
    }

    private changeAuthGroup() {
        if (this.authGroup != null && this.authGroup.length > 0) {
            this._authGroup = this.authGroup.map((g) => {
                const group: TreeNode = {label: g.persianName, data: {item: g, state: null}};

                group.children = (g.authorities != null && g.authorities.length > 0) ?
                    g.authorities.map((a) => {
                        return {

                            label: a.persianName, data: {
                                item: a,
                                state:
                                    (this.authorities != null && this.authorities.length > 0 && this.authorities.find((auth) => auth.name === a.name)) ||
                                    (this.roleAuthorities != null && this.roleAuthorities.length > 0 && this.roleAuthorities.find((auth) => auth.name === a.name))
                                        ? true :
                                        (this.denyAuthorities && this.denyAuthorities.length > 0 && this.denyAuthorities.find((auth) => auth.name === a.name)) ||
                                        (this.denyRoleAuthorities && this.denyRoleAuthorities.length > 0 && this.denyRoleAuthorities.find((auth) => auth.name === a.name))
                                            ? false : null,
                                disabled: (this.disabledAuthorities && this.disabledAuthorities.length > 0 && this.disabledAuthorities.find((auth) => auth.name === a.name) == null)

                            },
                            parent: group
                        }
                            ;
                    }) : null;
                if (group.children && group.children.length > 0) {
                    this.onChangeCheckbox(group.children[0].data.state, group.children[0]);
                }
                group.children = group.children.filter(value1 => value1.data.disabled == false);

                // if (child) {
                return group;
                // }
            });
            // console.log(this._authGroup);
            this._authGroup = this._authGroup.filter(value1 => value1.data.disabled == false || (value1.children.filter(value2 => value2.data.disabled == false).length > 0));
        }
        this.emit();
    }

    onChangeCheckbox(event, node: TreeNode) {
        if (node && node.children && node.children.length > 0) {
            for (const no of node.children) {
                no.data.state = node.data.state;
            }
        }
        if (node && node.parent && node.parent.children) {
            const parentSet = node.parent.children.find((i) => i.data.state !== node.data.state) == null;

            const parentEnabled = node.parent.children.find((i) => i.data.disabled !== false) == null;
            if (parentEnabled === true) {
                node.parent.data.disabled = false;
            } else {
                node.parent.data.disabled = true;
            }
            if (parentSet === true) {
                node.parent.data.state = node.data.state;
            } else {
                node.parent.data.state = null;
            }
        }
        this.emit();
    }

    private emit() {
        const auth = Array<any>();
        if (this._authGroup && this._authGroup.length > 0) {
            this._authGroup.forEach((g) => {
                if (g.children && g.children.length > 0) {
                    g.children.filter((a) => a.data.state === true).map((a) => a.data.item).forEach((a) => auth.push(a));
                }
            });
        }
        this.onAuthorities.emit(auth);

        const dauth = Array<any>();
        if (this._authGroup && this._authGroup.length > 0) {
            this._authGroup.forEach((g) => {
                if (g.children && g.children.length > 0) {
                    g.children.filter((a) => a.data.state === false).map((a) => a.data.item).forEach((a) => dauth.push(a));
                }
            });
        }
        this.onDenyAuthorities.emit(dauth);
    }

}
