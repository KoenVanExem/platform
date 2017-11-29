import { AfterViewInit, ChangeDetectorRef, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import 'rxjs/add/observable/combineLatest';
import { TdDialogService, TdMediaService } from "@covalent/core";
import { ProductQuote } from "@allors/workspace";
import { WorkspaceService, ErrorService } from "@allors/base-angular";
export declare class ProductQuotesOverviewComponent implements AfterViewInit, OnDestroy {
    private workspaceService;
    private errorService;
    private formBuilder;
    private titleService;
    private router;
    dialogService: TdDialogService;
    media: TdMediaService;
    private changeDetectorRef;
    searchForm: FormGroup;
    title: string;
    data: ProductQuote[];
    filtered: ProductQuote[];
    total: number;
    private refresh$;
    private subscription;
    private scope;
    private page$;
    constructor(workspaceService: WorkspaceService, errorService: ErrorService, formBuilder: FormBuilder, titleService: Title, router: Router, dialogService: TdDialogService, media: TdMediaService, changeDetectorRef: ChangeDetectorRef);
    goBack(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    onView(quote: ProductQuote): void;
    private more();
}
