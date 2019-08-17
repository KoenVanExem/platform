// <copyright file="InventoryItemExtensions.cs" company="Allors bvba">
// Copyright (c) Allors bvba. All rights reserved.
// Licensed under the LGPL license. See LICENSE file in the project root for full license information.
// </copyright>

using System.Diagnostics;

namespace Allors.Domain
{
    using System.Linq;

    public static partial class InventoryItemExtensions
    {
        public static void BaseOnBuild(this InventoryItem @this, ObjectOnBuild method)
        {
            //TODO: Let Sync set Unit of Measure
            if (!@this.ExistUnitOfMeasure)
            {
                @this.UnitOfMeasure = @this.Part?.UnitOfMeasure;
            }
        }

        public static void BaseOnPreDerive(this InventoryItem @this, ObjectOnPreDerive method)
        {
            var derivation = method.Derivation;
            derivation.AddDependency(@this.Part, @this);
        }

        public static void BaseOnDerive(this InventoryItem @this, ObjectOnDerive method)
        {
            var session = @this.Strategy.Session;
            var now = session.Now();

            if (!@this.ExistFacility && @this.ExistPart && @this.Part.ExistDefaultFacility)
            {
                @this.Facility = @this.Part.DefaultFacility;
            }

            Party owner = (Organisation)@this.Facility.Owner;
            if (@this is SerialisedInventoryItem item)
            {
                owner = item.SerialisedItem?.OwnedBy;
            }

            foreach (var inventoryOwnership in @this.InventoryOwnershipsWhereInventoryItem.Where(v => v.FromDate < now && (!v.ExistThroughDate || v.ThroughDate >= now)))
            {
                if (!Equals(inventoryOwnership.Owner, owner))
                {
                    inventoryOwnership.ThroughDate = now;
                }
            }

            var ownerInventoryOwnership = @this.InventoryOwnershipsWhereInventoryItem.FirstOrDefault(v => v.Owner.Equals(owner) && v.FromDate < now && (!v.ExistThroughDate || v.ThroughDate >= now));
            if (ownerInventoryOwnership == null && owner != null)
            {
                new InventoryOwnershipBuilder(session)
                    .WithInventoryItem(@this)
                    .WithOwner(owner)
                    .Build();
            }

            //TODO: Let Sync set Unit of Measure
            if (!@this.ExistUnitOfMeasure)
            {
                @this.UnitOfMeasure = @this.Part?.UnitOfMeasure;
            }
        }
    }
}