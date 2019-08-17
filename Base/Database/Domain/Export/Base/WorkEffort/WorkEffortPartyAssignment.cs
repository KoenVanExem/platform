// <copyright file="WorkEffortPartyAssignment.cs" company="Allors bvba">
// Copyright (c) Allors bvba. All rights reserved.
// Licensed under the LGPL license. See LICENSE file in the project root for full license information.
// </copyright>

using Resources;

namespace Allors.Domain
{
    public partial class WorkEffortPartyAssignment
    {
        public void BaseOnDerive(ObjectOnDerive method)
        {
            var derivation = method.Derivation;

            if (this.ExistAssignmentRates)
            {
                derivation.Validation.AddError(this, this.Meta.AssignmentRates, ErrorMessages.WorkEffortRateError);
            }
        }

        public void BaseDelegateAccess(DelegatedAccessControlledObjectDelegateAccess method)
        {
            method.SecurityTokens = this.Assignment?.SecurityTokens.ToArray();
            method.DeniedPermissions = this.Assignment?.DeniedPermissions.ToArray();
        }
    }
}