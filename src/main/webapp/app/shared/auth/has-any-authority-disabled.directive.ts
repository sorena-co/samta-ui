import {Directive, Input, Renderer2, TemplateRef, ViewContainerRef} from '@angular/core';
import { Principal } from './principal.service';

/**
 * @whatItDoes Conditionally includes an HTML element if current user has any
 * of the authorities passed as the `expression`.
 *
 * @howToUse
 * ```
 *     <some-element *jhiHasAnyAuthority="'ROLE_ADMIN'">...</some-element>
 *
 *     <some-element *jhiHasAnyAuthority="['ROLE_ADMIN', 'ROLE_USER']">...</some-element>
 * ```
 */
@Directive({
    selector: '[jhiHasAnyAuthorityDisabled]'
})
export class HasAnyAuthorityDisabledDirective {

    private authorities: string[];

    constructor(private principal: Principal, private _renderer: Renderer2, private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) {
    }

    @Input()
    set jhiHasAnyAuthorityDisabled(value: string|string[]) {
        this.authorities = typeof value === 'string' ? [ <string> value ] : <string[]> value;
        this.updateView();
        // Get notified each time authentication state changes.
        this.principal.getAuthenticationState().subscribe((identity) => this.updateView());
    }

    private updateView(): void {
        this.principal.hasAnyAuthority(this.authorities).then((result) => {
            this.viewContainerRef.clear();
            const view = this.viewContainerRef.createEmbeddedView(this.templateRef);
            if (!result) {
                const rootElem = view.rootNodes[0];
                if (rootElem) {
                    // rootElem.style.visibility = 'hidden';
                    this._renderer.setProperty(rootElem, 'disabled', true);
                }
            }
        });
    }
}
