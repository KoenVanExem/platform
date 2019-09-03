// <copyright file="DatabaseExtensions.cs" company="Allors bvba">
// Copyright (c) Allors bvba. All rights reserved.
// Licensed under the LGPL license. See LICENSE file in the project root for full license information.
// </copyright>

namespace Allors.Api
{
    using System.Linq;

    using Allors.Data;
    using Allors.Meta;
    using Allors.Services;


    public static class DatabaseExtensions
    {
        public static Tree FullTree(this IDatabase @this, IComposite composite, ITreeService treeService)
        {
            var tree = treeService.Get(composite);
            if (tree == null)
            {
                tree = new Tree(composite);
                foreach (var compositeRoleType in composite.RoleTypes.Where(v => v.ObjectType.IsComposite && ((RoleType)v).Workspace))
                {
                    tree.Add(compositeRoleType);
                }

                treeService.Set(composite, tree);
            }

            return tree;
        }
    }
}
