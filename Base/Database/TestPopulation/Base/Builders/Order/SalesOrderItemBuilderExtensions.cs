// <copyright file="SalesOrderItemBuilderExtensions.cs" company="Allors bvba">
// Copyright (c) Allors bvba. All rights reserved.
// Licensed under the LGPL license. See LICENSE file in the project root for full license information.
// </copyright>
// <summary>Defines the MediaTests type.</summary>

namespace Allors.Domain.TestPopulation
{
    public static partial class SalesOrderItemBuilderExtensions
    {
        public static SalesOrderItemBuilder WithSerializedProductDefaults(this SalesOrderItemBuilder @this, Organisation internalOrganisation)
        {
            var faker = @this.Session.Faker();

            var serializedProduct = new UnifiedGoodBuilder(@this.Session).WithSerialisedDefaults(internalOrganisation).Build();
            var serializedItem = new SerialisedItemBuilder(@this.Session).WithDefaults(internalOrganisation).Build();

            var quoteItem = new QuoteItemBuilder(@this.Session).WithSerializedDefaults(internalOrganisation).Build();
            var customer = faker.Random.ListItem(internalOrganisation.ActiveCustomers);
            var postalAddress = new PostalAddressBuilder(@this.Session).WithDefaults().Build();

            @this.WithDescription(faker.Lorem.Sentences(2));
            @this.WithComment(faker.Lorem.Sentence());
            @this.WithInternalComment(faker.Lorem.Sentence());
            @this.WithInvoiceItemType(new InvoiceItemTypes(@this.Session).ProductItem);
            @this.WithProduct(serializedProduct);
            @this.WithSerialisedItem(serializedItem);
            @this.WithQuantityOrdered(faker.Random.UInt(5, 15));
            @this.WithQuoteItem(quoteItem);
            @this.WithAssignedDeliveryDate(@this.Session.Now().AddDays(5));
            @this.WithShippingInstruction(faker.Lorem.Sentences(3));
            @this.WithMessage(faker.Lorem.Sentence());
            @this.WithShipFromAddress(postalAddress);
            @this.WithAssignedShipToAddress(postalAddress);
            @this.WithQuantityReturned(faker.Random.Decimal());
            @this.WithAssignedShipToParty(customer);

            return @this;
        }

        public static SalesOrderItemBuilder WithSerializedNonProductDefaults(this SalesOrderItemBuilder @this, Organisation internalOrganisation)
        {
            var faker = @this.Session.Faker();

            var serializedProduct = new UnifiedGoodBuilder(@this.Session).WithSerialisedDefaults(internalOrganisation).Build();
            var serializedItem = new SerialisedItemBuilder(@this.Session).WithDefaults(internalOrganisation).Build();

            var quoteItem = new QuoteItemBuilder(@this.Session).WithSerializedDefaults(internalOrganisation).Build();
            var customer = faker.Random.ListItem(internalOrganisation.ActiveCustomers);
            var postalAddress = new PostalAddressBuilder(@this.Session).WithDefaults().Build();

            @this.WithDescription(faker.Lorem.Sentences(2));
            @this.WithComment(faker.Lorem.Sentence());
            @this.WithInternalComment(faker.Lorem.Sentence());

            // TODO: Select a random item except ProductItem
            @this.WithInvoiceItemType(new InvoiceItemTypes(@this.Session).ProductItem);
            @this.WithProduct(serializedProduct);
            @this.WithSerialisedItem(serializedItem);
            @this.WithQuantityOrdered(faker.Random.UInt(5, 15));
            @this.WithQuoteItem(quoteItem);
            @this.WithAssignedDeliveryDate(@this.Session.Now().AddDays(5));
            @this.WithShippingInstruction(faker.Lorem.Sentences(3));
            @this.WithMessage(faker.Lorem.Sentence());
            @this.WithShipFromAddress(postalAddress);
            @this.WithAssignedShipToAddress(postalAddress);
            @this.WithQuantityReturned(faker.Random.Decimal());
            @this.WithAssignedShipToParty(customer);

            return @this;
        }
    }
}