// <copyright file="CustomerShipments.cs" company="Allors bvba">
// Copyright (c) Allors bvba. All rights reserved.
// Licensed under the LGPL license. See LICENSE file in the project root for full license information.
// </copyright>

namespace Allors.Domain
{
    using Meta;

    public partial class CustomerShipments
    {
        protected override void BasePrepare(Setup setup)
        {
            base.BasePrepare(setup);

            setup.AddDependency(this.ObjectType, M.ShipmentState);
        }

        protected override void BaseSecure(Security config)
        {
            var created = new ShipmentStates(this.Session).Created;
            var picked = new ShipmentStates(this.Session).Picked;
            var packed = new ShipmentStates(this.Session).Packed;
            var shipped = new ShipmentStates(this.Session).Shipped;
            var delivered = new ShipmentStates(this.Session).Delivered;
            var cancelled = new ShipmentStates(this.Session).Cancelled;
            var onHold = new ShipmentStates(this.Session).OnHold;

            var hold = this.Meta.Hold;
            var @continue = this.Meta.Continue;
            var ship = this.Meta.Ship;

            config.Deny(this.ObjectType, shipped, hold, @continue);
            config.Deny(this.ObjectType, onHold, ship, hold, @continue);
            config.Deny(this.ObjectType, created, hold, @continue);
            config.Deny(this.ObjectType, picked, @continue);
            config.Deny(this.ObjectType, packed, @continue);

            config.Deny(this.ObjectType, cancelled, Operations.Execute, Operations.Write);
            config.Deny(this.ObjectType, shipped, Operations.Execute, Operations.Write);
            config.Deny(this.ObjectType, delivered, Operations.Execute, Operations.Write);
        }
    }
}