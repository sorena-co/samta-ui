import {Component, OnInit} from '@angular/core';
import {JhiLanguageService} from 'ng-jhipster';

import {Principal, AccountService, JhiLanguageHelper} from '../../shared';
import {PosService} from '../../shared/e-payment/pos.service';
import {CookieService} from 'ngx-cookie';

@Component({
    selector: 'jhi-settings',
    templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
    error: string;
    success: string;
    settingsAccount: any;
    languages: any[];
    address = 'localhost:8050';
    addressInvalid = false;
    portInvalid = false;

    constructor(
        private account: AccountService,
        private principal: Principal,
        private languageService: JhiLanguageService,
        private posService: PosService,
        private cookieService: CookieService,
        private languageHelper: JhiLanguageHelper
    ) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.settingsAccount = this.copyAccount(account);
        });
        this.languageHelper.getAll().then((languages) => {
            this.languages = languages;
        });
        this.address = this.cookieService.get('posIp');
        this.checkAddress();
    }

    save() {
        if (!this.addressInvalid) {
            this.cookieService.put('posIp', this.address);
        }
        this.account.save(this.settingsAccount).subscribe(() => {
            this.error = null;
            this.success = 'OK';
            this.principal.identity(true).then((account) => {
                this.settingsAccount = this.copyAccount(account);
            });
            this.languageService.getCurrent().then((current) => {
                if (this.settingsAccount.langKey !== current) {
                    this.languageService.changeLanguage(this.settingsAccount.langKey);
                }
            });
        }, () => {
            this.success = null;
            this.error = 'ERROR';
        });
    }

    copyAccount(account) {
        return {
            activated: account.activated,
            email: account.email,
            firstName: account.firstName,
            langKey: account.langKey,
            lastName: account.lastName,
            login: account.login,
            imageUrl: account.imageUrl
        };
    }

    private checkAddress() {
        if (this.address) {
            if (this.address !== 'localhost' &&
                !this.address.startsWith('http://') &&
                !this.address.startsWith('https://')) {
                this.address = 'http://' + this.address;
            }
            this.posService.getInfo(this.address).subscribe(value => {
                this.addressInvalid = false;
            }, error1 => {
                this.addressInvalid = true;
            });
        }
    }
}
