// --------------------------------------------------------------------------------------------------------------------
// <copyright file="PackageRevenue.cs" company="Allors bvba">
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
    using Meta;

    public partial class PackageRevenue
    {
        public void AppsOnDerive(ObjectOnDerive method)
        {
            var derivation = method.Derivation;

            this.AppsOnDeriveRevenue();
        }

        public void AppsOnDeriveRevenue()
        {
            this.Revenue = 0;

            var partyPackageRevenues = this.Package.PartyPackageRevenuesWherePackage;
            partyPackageRevenues.Filter.AddEquals(M.PartyPackageRevenue.Year, this.Year);
            partyPackageRevenues.Filter.AddEquals(M.PartyPackageRevenue.Month, this.Month);

            foreach (PartyPackageRevenue productCategoryRevenue in partyPackageRevenues)
            {
                this.Revenue += productCategoryRevenue.Revenue;
            }
        }
    }
}