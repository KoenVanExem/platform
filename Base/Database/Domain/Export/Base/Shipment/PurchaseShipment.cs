// <copyright file="PurchaseShipment.cs" company="Allors bvba">
// Copyright (c) Allors bvba. All rights reserved.
// Licensed under the LGPL license. See LICENSE file in the project root for full license information.
// </copyright>

using System.Linq;

namespace Allors.Domain
{
    using System;
    using Allors.Meta;

    public partial class PurchaseShipment
    {
        public static readonly TransitionalConfiguration[] StaticTransitionalConfigurations =
            {
                new TransitionalConfiguration(M.PurchaseShipment, M.PurchaseShipment.ShipmentState),
            };

        public TransitionalConfiguration[] TransitionalConfigurations => StaticTransitionalConfigurations;

        public void BaseOnBuild(ObjectOnBuild method)
        {
            if (!this.ExistShipToParty)
            {
                var internalOrganisations = new Organisations(this.Strategy.Session).InternalOrganisations();
                if (internalOrganisations.Length == 1)
                {
                    this.ShipToParty = internalOrganisations.First();
                }
            }

            if (!this.ExistShipmentState)
            {
                this.ShipmentState = new ShipmentStates(this.Strategy.Session).Created;
            }

            if (!this.ExistEstimatedArrivalDate)
            {
                this.EstimatedArrivalDate = this.strategy.Session.Now().Date;
            }
        }

        public void BaseOnPreDerive(ObjectOnPreDerive method)
        {
            var derivation = method.Derivation;

            // TODO:
            if (derivation.ChangeSet.Associations.Contains(this.Id))
            {
                foreach (ShipmentItem shipmentItem in this.ShipmentItems)
                {
                    if (shipmentItem.ShipmentReceiptWhereShipmentItem.ExistInventoryItem)
                    {
                        derivation.AddDependency(shipmentItem.ShipmentReceiptWhereShipmentItem.InventoryItem, this);
                    }

                    foreach (OrderShipment orderShipment in shipmentItem.OrderShipmentsWhereShipmentItem)
                    {
                        derivation.AddDependency(orderShipment.OrderItem, this);
                    }
                }
            }
        }

        public void BaseOnDerive(ObjectOnDerive method)
        {
            var derivation = method.Derivation;

            derivation.Validation.AssertExists(this, this.Meta.ShipFromParty);

            var internalOrganisations = new Organisations(this.Strategy.Session).Extent().Where(v => Equals(v.IsInternalOrganisation, true)).ToArray();
            var shipToParty = this.ShipToParty as InternalOrganisation;
            if (!this.ExistShipToParty && internalOrganisations.Count() == 1)
            {
                this.ShipToParty = internalOrganisations.First();
                shipToParty = internalOrganisations.First();
            }

            this.ShipToAddress = this.ShipToAddress ?? this.ShipToParty?.ShippingAddress ?? this.ShipToParty?.GeneralCorrespondence as PostalAddress;

            if (!this.ExistShipToFacility && shipToParty != null)
            {
                this.ShipToFacility = shipToParty.StoresWhereInternalOrganisation.Single().DefaultFacility;
            }

            if (!this.ExistShipmentNumber && shipToParty != null)
            {
                this.ShipmentNumber = shipToParty.NextShipmentNumber(this.Strategy.Session.Now().Year);
            }

            if (!this.ExistShipFromAddress && this.ExistShipFromParty)
            {
                this.ShipFromAddress = this.ShipFromParty.ShippingAddress;
            }

            if (this.ShipmentItems.Any() && this.ShipmentItems.All(v => v.ShipmentReceiptWhereShipmentItem.QuantityAccepted.Equals(v.ShipmentReceiptWhereShipmentItem.OrderItem?.QuantityOrdered)))
            {
                this.ShipmentState = new ShipmentStates(this.Strategy.Session).Delivered;
            }

            this.Sync(this.strategy.Session);
        }

        private void Sync(ISession session)
        {
            //session.Prefetch(this.SyncPrefetch, this);

            foreach (ShipmentItem shipmentItem in this.ShipmentItems)
            {
                shipmentItem.Sync(this);
            }
        }
    }
}