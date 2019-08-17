// <copyright file="Proposal.cs" company="Allors bvba">
// Copyright (c) Allors bvba. All rights reserved.
// Licensed under the LGPL license. See LICENSE file in the project root for full license information.
// </copyright>

namespace Allors.Domain
{
    using Allors.Meta;

    public partial class Proposal
    {
        public static readonly TransitionalConfiguration[] StaticTransitionalConfigurations =
            {
                new TransitionalConfiguration(M.Proposal, M.Proposal.QuoteState),
            };

        public TransitionalConfiguration[] TransitionalConfigurations => StaticTransitionalConfigurations;

        public void BaseOnDerive(ObjectOnDerive method) => this.Sync(this.Strategy.Session);

        private void Sync(ISession session)
        {
            //session.Prefetch(this.SyncPrefetch, this);

            foreach (QuoteItem quoteItem in this.QuoteItems)
            {
                quoteItem.Sync(this);
            }
        }
    }
}