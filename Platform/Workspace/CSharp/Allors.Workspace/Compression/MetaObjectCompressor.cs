// <copyright file="WorkspaceObject.cs" company="Allors bvba">
// Copyright (c) Allors bvba. All rights reserved.
// Licensed under the LGPL license. See LICENSE file in the project root for full license information.
// </copyright>

namespace Allors.Workspace
{
    using Protocol;
    using Workspace.Meta;

    public class MetaObjectCompressor
    {
        private readonly Compressor compressor;

        public MetaObjectCompressor(Compressor compressor) => this.compressor = compressor;

        public string Write(IMetaObject metaObject)
        {
            var value = metaObject?.Id.ToString("D").ToLower();
            return this.compressor.Write(value);
        }
    }
}