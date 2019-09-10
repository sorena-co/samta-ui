import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';
import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';

import {AccountService, Principal, User, UserService} from '../../shared';
import {Subscription} from 'rxjs/Subscription';
import {MainAuthority} from "../../entities/main-authority";

@Component({
    selector: 'jhi-user-mgmt',
    templateUrl: './user-management.component.html'
})
export class UserMgmtComponent implements OnInit, OnDestroy {

    currentAccount: any;
    users: User[];
    user: User = new User();
    error: any;
    success: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    breadcrumbItems: any[];
    private currentUserType: any;

    constructor(
        private userService: UserService,
        private alertService: JhiAlertService,
        private jhiAlertService: JhiAlertService,
        private accountService: AccountService,
        private principal: Principal,
        private parseLinks: JhiParseLinks,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private translateService: TranslateService,
        private eventManager: JhiEventManager
    ) {
        this.routeData = this.activatedRoute.data.subscribe((data) => {
            this.itemsPerPage = data.pagingParams.size;
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = !data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });

        this.currentSearch = activatedRoute.snapshot.queryParams['search'] ? activatedRoute.snapshot.queryParams['search'] : '';
        this.user.activated = null;

        const x = this.currentSearch.split('&');
        for (const key of x) {
            let value = key.split('$');
            if (key.lastIndexOf('#') >= 0) { // enum
                value = key.split('#');
            } else if (key.lastIndexOf(';') >= 0) { // Boolean
                value = key.split(';');
            } else if (key.lastIndexOf('☼') >= 0) { // equal number
                value = key.split('☼');
            } else if (key.lastIndexOf('>') >= 0) { // number
                value = key.split('>');
            } else if (key.lastIndexOf('<') >= 0) { // number
                value = key.split('<');
            } else if (key.lastIndexOf('→') >= 0) { // start date
                value = key.split('→');
            } else if (key.lastIndexOf('←') >= 0) { // end date
                value = key.split('←');
            }

            if (value.length > 1) {
                if (value[0] === 'activated') {
                    this.user[value[0]] = Boolean(value[1]);
                } else {
                    this.user[value[0]] = value[1];
                }
            }
        }
    }


    i

    loadAll() {
        let params = {
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        };
        /*if (this.user.login != null)
            params["username"] = this.user.login;
        if (this.user.fullName != null)
            params["fullName"] = this.user.fullName;
        if (this.user.locationName != null)
            params["locationName"] = this.user.locationName;
        if (this.user.userType != null)
            params["userType"] = this.user.userType;
        if (this.user.activated != null)
            params["activated"] = this.user.activated;*/
        this.userService.query(params,this.user).subscribe(
            (res: HttpResponse<User[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.router.navigate(['/user-management'], {
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        }).then();
        this.user = new User();
        this.user.activated = null;
        this.loadAll();
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        /*if (this.user.login) {
            this.currentSearch += 'and juser.login like \'%' + this.user.login +'%\'';
        }
      /!*  if (this.user.firstName) {
            this.currentSearch += 'firstName$' + this.user.firstName + '&';
        }*!/
        if (this.user.fullName) {
            this.currentSearch += 'and (juser.first_name like \'%' + this.user.fullName+'%\' or '+'juser.last_name like \'%' + this.user.fullName+'%\')';
        }
        if (this.user.userType) {
            this.currentSearch += 'and juser.user_type=\'' + this.user.userType + '\'';
        }
        if (this.user.activated) {
            console.log(this.user.activated);
            this.currentSearch += 'and juser.activated=' + (this.user.activated=="true"?'1':'0');
        }
        /!*if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }*!/*/

        this.router.navigate(['/user-management'], {
            queryParams: {
                search: this.currentSearch,
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.loadAll();
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe((title) => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('userManagement.home.title').subscribe((title) => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });

        this.accountService.get().subscribe(
            (res: HttpResponse<User>) => {
                this.currentUserType = res.body.userType;
                // this.canAuth = res.body.authorities.map((s) => new MainAuthority(s));
            });

        this.registerChangeInUsers();

        this.setBreadCrumb();
    }

    ngOnDestroy() {
        // this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: User) {
        return item.id;
    }

    registerChangeInUsers() {
        this.eventManager.subscribe('userListModification', (response) => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'desc' : 'asc')];

        return result;
    }

    loadLazy(event: LazyLoadEvent) {
        const predicate = this.predicate;
        const reverse = this.reverse;
        const page = this.page;
        const itemsPerPage = this.itemsPerPage;
        this.page = (event.first / event.rows) + 1;
        this.itemsPerPage = event.rows;
        if (event.sortField) {
            this.predicate = event.sortField;
            this.reverse = event.sortOrder !== 1;
        }

        if (this.page > 1 ||
            this.page !== page ||
            this.itemsPerPage !== itemsPerPage ||
            this.predicate !== predicate ||
            this.reverse !== reverse) {

            this.router.navigate(['/user-management'], {
                queryParams: {
                    page: this.page,
                    size: this.itemsPerPage,
                    search: this.currentSearch,
                    sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
                }
            });
        }

        this.loadAll();
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        this.users = data;
    }

    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }

}
