// --------------------------------------------------------------------------------------------------------------------
// <copyright file="CustomerReturnObjectStates.cs" company="Allors bvba">
//   Copyright 2002-2012 Allors bvba.
// 
// Dual Licensed under
//   a) the General Public Licence v3 (GPL)
//   b) the Allors License
// 
// The GPL License is included in the file gpl.txt.
// The Allors License is an addendum to your contract.
// 
// Allors Applications is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// For more information visit http://www.allors.com/legal
// </copyright>
// --------------------------------------------------------------------------------------------------------------------

namespace Allors.Domain
{
    using System;

    public partial class CustomerReturnObjectStates
    {
        public static readonly Guid ReceivedId = new Guid("32790FE5-69E3-46b1-BD23-D0A59D3B3794");

        private UniquelyIdentifiableCache<CustomerReturnObjectState> stateCache;

        public CustomerReturnObjectState Received
        {
            get { return this.StateCache.Get(ReceivedId); }
        }

        private UniquelyIdentifiableCache<CustomerReturnObjectState> StateCache
        {
            get
            {
                return this.stateCache ?? (this.stateCache = new UniquelyIdentifiableCache<CustomerReturnObjectState>(this.Session));
            }
        }

        protected override void AppsSecure(Domain.Security config)
        {
            base.AppsSecure(config);

            var full = new[] { Operations.Read, Operations.Write, Operations.Execute };

            config.GrantAdministrator(this.ObjectType, full);
        }
    }
}