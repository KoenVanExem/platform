// Allors generated file.
// Do not edit this file, changes will be overwritten.
/* tslint:disable */
import { SessionObject, Method } from "@allors/framework";

import { Version } from './Version.g';
import { User } from './User.g';
import { Currency } from './Currency.g';
import { ShippingAndHandlingCharge } from './ShippingAndHandlingCharge.g';
import { Fee } from './Fee.g';
import { DiscountAdjustment } from './DiscountAdjustment.g';
import { BillingAccount } from './BillingAccount.g';
import { SurchargeAdjustment } from './SurchargeAdjustment.g';
import { InvoiceTerm } from './InvoiceTerm.g';
import { VatRegime } from './VatRegime.g';

export interface InvoiceVersion extends SessionObject , Version {
        Comment : string;


        CreatedBy : User;


        LastModifiedBy : User;


        CreationDate : Date;


        LastModifiedDate : Date;


        InternalComment : string;


        TotalShippingAndHandlingCustomerCurrency : number;


        CustomerCurrency : Currency;


        Description : string;


        ShippingAndHandlingCharge : ShippingAndHandlingCharge;


        TotalFeeCustomerCurrency : number;


        Fee : Fee;


        TotalExVatCustomerCurrency : number;


        CustomerReference : string;


        DiscountAdjustment : DiscountAdjustment;


        AmountPaid : number;


        TotalDiscount : number;


        BillingAccount : BillingAccount;


        TotalIncVat : number;


        TotalSurcharge : number;


        TotalBasePrice : number;


        TotalVatCustomerCurrency : number;


        InvoiceDate : Date;


        EntryDate : Date;


        TotalIncVatCustomerCurrency : number;


        TotalShippingAndHandling : number;


        TotalBasePriceCustomerCurrency : number;


        SurchargeAdjustment : SurchargeAdjustment;


        TotalExVat : number;


        InvoiceTerms : InvoiceTerm[];
        AddInvoiceTerm(value: InvoiceTerm);
        RemoveInvoiceTerm(value: InvoiceTerm);


        TotalSurchargeCustomerCurrency : number;


        InvoiceNumber : string;


        Message : string;


        VatRegime : VatRegime;


        TotalDiscountCustomerCurrency : number;


        TotalVat : number;


        TotalFee : number;


}