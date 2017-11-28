// Allors generated file.
// Do not edit this file, changes will be overwritten.
/* tslint:disable */
import { SessionObject, Method } from "@allors/framework";

import { Service } from './Service.g';
import { Product } from './Product.g';
import { Commentable } from './Commentable.g';
import { UniquelyIdentifiable } from './UniquelyIdentifiable.g';
import { Deletable } from './Deletable.g';
import { ProductCategory } from './ProductCategory.g';
import { LocalisedText } from './LocalisedText.g';
import { ProductFeature } from './ProductFeature.g';
import { Document } from './Document.g';
import { UnitOfMeasure } from './UnitOfMeasure.g';
import { EstimatedProductCost } from './EstimatedProductCost.g';
import { VatRate } from './VatRate.g';
import { PriceComponent } from './PriceComponent.g';
import { GeneralLedgerAccount } from './GeneralLedgerAccount.g';
import { Good } from './Good.g';
import { QuoteItemVersion } from './QuoteItemVersion.g';
import { RequestItemVersion } from './RequestItemVersion.g';
import { SalesInvoiceItemVersion } from './SalesInvoiceItemVersion.g';
import { SalesOrderItemVersion } from './SalesOrderItemVersion.g';
import { OrganisationGlAccount } from './OrganisationGlAccount.g';
import { QuoteItem } from './QuoteItem.g';
import { RequestItem } from './RequestItem.g';
import { SalesInvoiceItem } from './SalesInvoiceItem.g';
import { SalesOrderItem } from './SalesOrderItem.g';

export class DeliverableBasedService extends SessionObject implements Service {
    get CanReadInternalComment(): boolean {
        return this.canRead('InternalComment');
    }

    get CanWriteInternalComment(): boolean {
        return this.canWrite('InternalComment');
    }

    get InternalComment(): string {
        return this.get('InternalComment');
    }

    set InternalComment(value: string) {
        this.set('InternalComment', value);
    }

    get CanReadPrimaryProductCategory(): boolean {
        return this.canRead('PrimaryProductCategory');
    }

    get CanWritePrimaryProductCategory(): boolean {
        return this.canWrite('PrimaryProductCategory');
    }

    get PrimaryProductCategory(): ProductCategory {
        return this.get('PrimaryProductCategory');
    }

    set PrimaryProductCategory(value: ProductCategory) {
        this.set('PrimaryProductCategory', value);
    }

    get CanReadSupportDiscontinuationDate(): boolean {
        return this.canRead('SupportDiscontinuationDate');
    }

    get CanWriteSupportDiscontinuationDate(): boolean {
        return this.canWrite('SupportDiscontinuationDate');
    }

    get SupportDiscontinuationDate(): Date {
        return this.get('SupportDiscontinuationDate');
    }

    set SupportDiscontinuationDate(value: Date) {
        this.set('SupportDiscontinuationDate', value);
    }

    get CanReadSalesDiscontinuationDate(): boolean {
        return this.canRead('SalesDiscontinuationDate');
    }

    get CanWriteSalesDiscontinuationDate(): boolean {
        return this.canWrite('SalesDiscontinuationDate');
    }

    get SalesDiscontinuationDate(): Date {
        return this.get('SalesDiscontinuationDate');
    }

    set SalesDiscontinuationDate(value: Date) {
        this.set('SalesDiscontinuationDate', value);
    }

    get CanReadLocalisedNames(): boolean {
        return this.canRead('LocalisedNames');
    }

    get CanWriteLocalisedNames(): boolean {
        return this.canWrite('LocalisedNames');
    }

    get LocalisedNames(): LocalisedText[] {
        return this.get('LocalisedNames');
    }

    AddLocalisedName(value: LocalisedText) {
        return this.add('LocalisedNames', value);
    }

    RemoveLocalisedName(value: LocalisedText) {
        return this.remove('LocalisedNames', value);
    }

    set LocalisedNames(value: LocalisedText[]) {
        this.set('LocalisedNames', value);
    }

    get CanReadLocalisedDescriptions(): boolean {
        return this.canRead('LocalisedDescriptions');
    }

    get CanWriteLocalisedDescriptions(): boolean {
        return this.canWrite('LocalisedDescriptions');
    }

    get LocalisedDescriptions(): LocalisedText[] {
        return this.get('LocalisedDescriptions');
    }

    AddLocalisedDescription(value: LocalisedText) {
        return this.add('LocalisedDescriptions', value);
    }

    RemoveLocalisedDescription(value: LocalisedText) {
        return this.remove('LocalisedDescriptions', value);
    }

    set LocalisedDescriptions(value: LocalisedText[]) {
        this.set('LocalisedDescriptions', value);
    }

    get CanReadLocalisedComments(): boolean {
        return this.canRead('LocalisedComments');
    }

    get CanWriteLocalisedComments(): boolean {
        return this.canWrite('LocalisedComments');
    }

    get LocalisedComments(): LocalisedText[] {
        return this.get('LocalisedComments');
    }

    AddLocalisedComment(value: LocalisedText) {
        return this.add('LocalisedComments', value);
    }

    RemoveLocalisedComment(value: LocalisedText) {
        return this.remove('LocalisedComments', value);
    }

    set LocalisedComments(value: LocalisedText[]) {
        this.set('LocalisedComments', value);
    }

    get CanReadDescription(): boolean {
        return this.canRead('Description');
    }

    get Description(): string {
        return this.get('Description');
    }


    get CanReadProductComplement(): boolean {
        return this.canRead('ProductComplement');
    }

    get CanWriteProductComplement(): boolean {
        return this.canWrite('ProductComplement');
    }

    get ProductComplement(): Product {
        return this.get('ProductComplement');
    }

    set ProductComplement(value: Product) {
        this.set('ProductComplement', value);
    }

    get CanReadOptionalFeatures(): boolean {
        return this.canRead('OptionalFeatures');
    }

    get CanWriteOptionalFeatures(): boolean {
        return this.canWrite('OptionalFeatures');
    }

    get OptionalFeatures(): ProductFeature[] {
        return this.get('OptionalFeatures');
    }

    AddOptionalFeature(value: ProductFeature) {
        return this.add('OptionalFeatures', value);
    }

    RemoveOptionalFeature(value: ProductFeature) {
        return this.remove('OptionalFeatures', value);
    }

    set OptionalFeatures(value: ProductFeature[]) {
        this.set('OptionalFeatures', value);
    }

    get CanReadVariants(): boolean {
        return this.canRead('Variants');
    }

    get CanWriteVariants(): boolean {
        return this.canWrite('Variants');
    }

    get Variants(): Product[] {
        return this.get('Variants');
    }

    AddVariant(value: Product) {
        return this.add('Variants', value);
    }

    RemoveVariant(value: Product) {
        return this.remove('Variants', value);
    }

    set Variants(value: Product[]) {
        this.set('Variants', value);
    }

    get CanReadName(): boolean {
        return this.canRead('Name');
    }

    get Name(): string {
        return this.get('Name');
    }


    get CanReadIntroductionDate(): boolean {
        return this.canRead('IntroductionDate');
    }

    get CanWriteIntroductionDate(): boolean {
        return this.canWrite('IntroductionDate');
    }

    get IntroductionDate(): Date {
        return this.get('IntroductionDate');
    }

    set IntroductionDate(value: Date) {
        this.set('IntroductionDate', value);
    }

    get CanReadDocuments(): boolean {
        return this.canRead('Documents');
    }

    get CanWriteDocuments(): boolean {
        return this.canWrite('Documents');
    }

    get Documents(): Document[] {
        return this.get('Documents');
    }

    AddDocument(value: Document) {
        return this.add('Documents', value);
    }

    RemoveDocument(value: Document) {
        return this.remove('Documents', value);
    }

    set Documents(value: Document[]) {
        this.set('Documents', value);
    }

    get CanReadStandardFeatures(): boolean {
        return this.canRead('StandardFeatures');
    }

    get CanWriteStandardFeatures(): boolean {
        return this.canWrite('StandardFeatures');
    }

    get StandardFeatures(): ProductFeature[] {
        return this.get('StandardFeatures');
    }

    AddStandardFeature(value: ProductFeature) {
        return this.add('StandardFeatures', value);
    }

    RemoveStandardFeature(value: ProductFeature) {
        return this.remove('StandardFeatures', value);
    }

    set StandardFeatures(value: ProductFeature[]) {
        this.set('StandardFeatures', value);
    }

    get CanReadUnitOfMeasure(): boolean {
        return this.canRead('UnitOfMeasure');
    }

    get CanWriteUnitOfMeasure(): boolean {
        return this.canWrite('UnitOfMeasure');
    }

    get UnitOfMeasure(): UnitOfMeasure {
        return this.get('UnitOfMeasure');
    }

    set UnitOfMeasure(value: UnitOfMeasure) {
        this.set('UnitOfMeasure', value);
    }

    get CanReadEstimatedProductCosts(): boolean {
        return this.canRead('EstimatedProductCosts');
    }

    get CanWriteEstimatedProductCosts(): boolean {
        return this.canWrite('EstimatedProductCosts');
    }

    get EstimatedProductCosts(): EstimatedProductCost[] {
        return this.get('EstimatedProductCosts');
    }

    AddEstimatedProductCost(value: EstimatedProductCost) {
        return this.add('EstimatedProductCosts', value);
    }

    RemoveEstimatedProductCost(value: EstimatedProductCost) {
        return this.remove('EstimatedProductCosts', value);
    }

    set EstimatedProductCosts(value: EstimatedProductCost[]) {
        this.set('EstimatedProductCosts', value);
    }

    get CanReadProductObsolescences(): boolean {
        return this.canRead('ProductObsolescences');
    }

    get CanWriteProductObsolescences(): boolean {
        return this.canWrite('ProductObsolescences');
    }

    get ProductObsolescences(): Product[] {
        return this.get('ProductObsolescences');
    }

    AddProductObsolescence(value: Product) {
        return this.add('ProductObsolescences', value);
    }

    RemoveProductObsolescence(value: Product) {
        return this.remove('ProductObsolescences', value);
    }

    set ProductObsolescences(value: Product[]) {
        this.set('ProductObsolescences', value);
    }

    get CanReadSelectableFeatures(): boolean {
        return this.canRead('SelectableFeatures');
    }

    get CanWriteSelectableFeatures(): boolean {
        return this.canWrite('SelectableFeatures');
    }

    get SelectableFeatures(): ProductFeature[] {
        return this.get('SelectableFeatures');
    }

    AddSelectableFeature(value: ProductFeature) {
        return this.add('SelectableFeatures', value);
    }

    RemoveSelectableFeature(value: ProductFeature) {
        return this.remove('SelectableFeatures', value);
    }

    set SelectableFeatures(value: ProductFeature[]) {
        this.set('SelectableFeatures', value);
    }

    get CanReadVatRate(): boolean {
        return this.canRead('VatRate');
    }

    get CanWriteVatRate(): boolean {
        return this.canWrite('VatRate');
    }

    get VatRate(): VatRate {
        return this.get('VatRate');
    }

    set VatRate(value: VatRate) {
        this.set('VatRate', value);
    }

    get CanReadBasePrices(): boolean {
        return this.canRead('BasePrices');
    }

    get BasePrices(): PriceComponent[] {
        return this.get('BasePrices');
    }


    get CanReadProductCategories(): boolean {
        return this.canRead('ProductCategories');
    }

    get CanWriteProductCategories(): boolean {
        return this.canWrite('ProductCategories');
    }

    get ProductCategories(): ProductCategory[] {
        return this.get('ProductCategories');
    }

    AddProductCategory(value: ProductCategory) {
        return this.add('ProductCategories', value);
    }

    RemoveProductCategory(value: ProductCategory) {
        return this.remove('ProductCategories', value);
    }

    set ProductCategories(value: ProductCategory[]) {
        this.set('ProductCategories', value);
    }

    get CanReadComment(): boolean {
        return this.canRead('Comment');
    }

    get CanWriteComment(): boolean {
        return this.canWrite('Comment');
    }

    get Comment(): string {
        return this.get('Comment');
    }

    set Comment(value: string) {
        this.set('Comment', value);
    }

    get CanReadUniqueId(): boolean {
        return this.canRead('UniqueId');
    }

    get CanWriteUniqueId(): boolean {
        return this.canWrite('UniqueId');
    }

    get UniqueId(): string {
        return this.get('UniqueId');
    }

    set UniqueId(value: string) {
        this.set('UniqueId', value);
    }


    get CanExecuteDelete(): boolean {
        return this.canExecute('Delete');
    }

    get Delete(): Method {
        return new Method(this, 'Delete');
    }
}
