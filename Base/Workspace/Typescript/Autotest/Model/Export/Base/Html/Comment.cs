// <copyright file="Comment.cs" company="Allors bvba">
// Copyright (c) Allors bvba. All Rights Reserved.
// Licensed under the LGPL v3 license.
// </copyright>

namespace Autotest.Html
{
    using Autotest.Angular;
    using Newtonsoft.Json.Linq;

    public partial class Comment : INode
    {
        public Comment(JToken json, Template template, INode parent)
        {
            this.Json = json;
            this.Template = template;
            this.Parent = parent;
        }

        public JToken Json { get; }

        public Template Template { get; }

        public INode Parent { get; set; }

        public string Value { get; set; }

        public Scope InScope { get; set; }

        public void BaseLoad()
        {
            this.Value = this.Json["value"]?.Value<string>();
        }

        public void SetInScope(Scope scope)
        {
            this.InScope = scope;
            scope.Nodes.Add(this);
        }
    }
}