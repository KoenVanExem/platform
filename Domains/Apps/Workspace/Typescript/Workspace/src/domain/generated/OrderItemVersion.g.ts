// Allors generated file.
// Do not edit this file, changes will be overwritten.
/* tslint:disable */
import { SessionObject, Method } from "@allors/framework";

import { PriceableVersion } from './PriceableVersion.g';
import { Version } from './Version.g';
import { PurchaseOrder } from './PurchaseOrder.g';
import { QuoteItem } from './QuoteItem.g';
import { OrderTerm } from './OrderTerm.g';
import { OrderItem } from './OrderItem.g';

export interface OrderItemVersion extends SessionObject , PriceableVersion {
        InternalComment : string;


        QuantityOrdered : number;


        Description : string;


        CorrespondingPurchaseOrder : PurchaseOrder;


        TotalOrderAdjustmentCustomerCurrency : number;


        TotalOrderAdjustment : number;


        QuoteItem : QuoteItem;


        AssignedDeliveryDate : Date;


        DeliveryDate : Date;


        OrderTerms : OrderTerm[];
        AddOrderTerm(value: OrderTerm);
        RemoveOrderTerm(value: OrderTerm);


        ShippingInstruction : string;


        Associations : OrderItem[];
        AddAssociation(value: OrderItem);
        RemoveAssociation(value: OrderItem);


        Message : string;


}