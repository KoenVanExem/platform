// --------------------------------------------------------------------------------------------------------------------
// <copyright file="SerialisedInventoryItemStates.cs" company="Allors bvba">
//   Copyright 2002-2012 Allors bvba.
// Dual Licensed under
//   a) the General Public Licence v3 (GPL)
//   b) the Allors License
// The GPL License is included in the file gpl.txt.
// The Allors License is an addendum to your contract.
// Allors Applications is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// For more information visit http://www.allors.com/legal
// </copyright>
// --------------------------------------------------------------------------------------------------------------------
namespace Allors.Domain
{
    using System;

    public partial class SerialisedInventoryItemStates
    {
        private static readonly Guid GoodId = new Guid("CD80FC9B-BF25-4587-8D52-57E491E74104");
        private static readonly Guid BeingReparedId = new Guid("4584A95F-60BA-478c-8E09-E6AFC88CF683");
        private static readonly Guid SlightlyDamagedId = new Guid("9CA506D4-ACB1-40ac-BEEC-83F080E6029E");
        private static readonly Guid DefectiveId = new Guid("36F94BB5-D93E-44cc-8F10-37A046002E5B");
        private static readonly Guid ScrapId = new Guid("9D02749B-A30E-4bb4-B016-E1CF96A5F99B");
        private static readonly Guid AvailableId = new Guid("E5AD6F2D-2EDF-4563-8AD4-59EF1211273F");
        private static readonly Guid SoldId = new Guid("FECCF869-98D7-4E9C-8979-5611A43918BC");
        private static readonly Guid InRentId = new Guid("9ACC6C05-60B5-4085-8B43-EB730939DB47");
        private static readonly Guid AssignedId = new Guid("3AD2DEC0-65AB-4E31-BDE0-3227727D9329");

        private UniquelyIdentifiableSticky<SerialisedInventoryItemState> stateCache;

        public SerialisedInventoryItemState Good => this.StateCache[GoodId];

        public SerialisedInventoryItemState BeingRepared => this.StateCache[BeingReparedId];

        public SerialisedInventoryItemState SlightlyDamaged => this.StateCache[SlightlyDamagedId];

        public SerialisedInventoryItemState Defective => this.StateCache[DefectiveId];

        public SerialisedInventoryItemState Scrap => this.StateCache[ScrapId];

        public SerialisedInventoryItemState Available => this.StateCache[AvailableId];

        public SerialisedInventoryItemState Sold => this.StateCache[SoldId];

        public SerialisedInventoryItemState InRent => this.StateCache[InRentId];

        public SerialisedInventoryItemState Assigned => this.StateCache[AssignedId];

        private UniquelyIdentifiableSticky<SerialisedInventoryItemState> StateCache => this.stateCache ?? (this.stateCache = new UniquelyIdentifiableSticky<SerialisedInventoryItemState>(this.Session));

        protected override void AppsSetup(Setup setup)
        {
            base.AppsSetup(setup);

            new SerialisedInventoryItemStateBuilder(this.Session)
                .WithUniqueId(GoodId)
                .WithName("In good order")
                .Build();

            new SerialisedInventoryItemStateBuilder(this.Session)
                .WithUniqueId(BeingReparedId)
                .WithName("Being Repared")
                .Build();

            new SerialisedInventoryItemStateBuilder(this.Session)
                .WithUniqueId(SlightlyDamagedId)
                .WithName("Slightly Damaged")
                .Build();

            new SerialisedInventoryItemStateBuilder(this.Session)
                .WithUniqueId(DefectiveId)
                .WithName("Defective")
                .Build();

            new SerialisedInventoryItemStateBuilder(this.Session)
                .WithUniqueId(ScrapId)
                .WithName("Scrap")
                .Build();

            new SerialisedInventoryItemStateBuilder(this.Session)
                .WithUniqueId(AvailableId)
                .WithName("Available")
                .Build();

            new SerialisedInventoryItemStateBuilder(this.Session)
                .WithUniqueId(SoldId)
                .WithName("Sold")
                .Build();

            new SerialisedInventoryItemStateBuilder(this.Session)
                .WithUniqueId(InRentId)
                .WithName("InRent")
                .Build();

            new SerialisedInventoryItemStateBuilder(this.Session)
                .WithUniqueId(AssignedId)
                .WithName("Assigned")
                .Build();
        }
    }
}