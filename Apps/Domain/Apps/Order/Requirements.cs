// --------------------------------------------------------------------------------------------------------------------
// <copyright file="Requirements.cs" company="Allors bvba">
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
    public partial class Requirements
    {
       protected override void AppsPrepare(Setup setup)
        {
            base.AppsPrepare(setup);

            setup.AddDependency(this.ObjectType, RequirementObjectStates.Meta.ObjectType);
        }

        protected override void AppsSecure(Domain.Security config)
        {
            base.AppsSecure(config);

            var full = new[] { Operations.Read, Operations.Write, Operations.Execute };

            config.GrantAdministrator(this.ObjectType, full);

            var openedState = new WorkEffortObjectStates(Session).NeedsAction;
            var cancelledState = new WorkEffortObjectStates(Session).Cancelled;
            var finishedState = new WorkEffortObjectStates(Session).Completed;

            config.Deny(this.ObjectType, openedState, WorkEfforts.Meta.Reopen);

            config.Deny(this.ObjectType, cancelledState, Operation.Execute, Operations.Write);
            config.Deny(this.ObjectType, finishedState, Operation.Execute, Operations.Read);
        }
    }
}
