import { AfterViewInit, ChangeDetectorRef, OnDestroy, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { ActivatedRoute } from "@angular/router";
import { TdMediaService } from "@covalent/core";
import 'rxjs/add/observable/combineLatest';
import { MetaDomain, Good, Singleton, Locale, ProductCategory, Organisation, ProductCharacteristic, Facility, ProductType, ProductCharacteristicValue, Brand, Model, InventoryItemKind, SerialisedInventoryItem, SerialisedInventoryItemState, VatRate, Ownership } from "@allors/workspace";
import { WorkspaceService, ErrorService, Filter } from "@allors/base-angular";
export declare class SerialisedGoodComponent implements OnInit, AfterViewInit, OnDestroy {
    private workspaceService;
    private errorService;
    private route;
    private snackBar;
    media: TdMediaService;
    private changeDetectorRef;
    m: MetaDomain;
    good: Good;
    title: string;
    subTitle: string;
    singleton: Singleton;
    facility: Facility;
    locales: Locale[];
    selectedLocaleName: string;
    categories: ProductCategory[];
    productTypes: ProductType[];
    productCharacteristicValues: ProductCharacteristicValue[];
    manufacturers: Organisation[];
    suppliers: Organisation[];
    brands: Brand[];
    selectedBrand: Brand;
    models: Model[];
    selectedModel: Model;
    inventoryItemKinds: InventoryItemKind[];
    inventoryItems: SerialisedInventoryItem[];
    inventoryItem: SerialisedInventoryItem;
    serialisedInventoryItemStates: SerialisedInventoryItemState[];
    vatRates: VatRate[];
    ownerships: Ownership[];
    manufacturersFilter: Filter;
    suppliersFilter: Filter;
    private subscription;
    private scope;
    private refresh$;
    constructor(workspaceService: WorkspaceService, errorService: ErrorService, route: ActivatedRoute, snackBar: MatSnackBar, media: TdMediaService, changeDetectorRef: ChangeDetectorRef);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    imageSelected(id: string): void;
    save(): void;
    update(): void;
    refresh(): void;
    goBack(): void;
    localisedName(productCharacteristic: ProductCharacteristic): string;
    setProductCharacteristicValues(): void;
    readonly locale: Locale;
    brandSelected(brand: Brand): void;
}
