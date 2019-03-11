﻿// --------------------------------------------------------------------------------------------------------------------
// <copyright file="RemoveCompositeRoleFactory.cs" company="Allors bvba">
//   Copyright 2002-2012 Allors bvba.
// 
// Dual Licensed under
//   a) the Lesser General Public Licence v3 (LGPL)
//   b) the Allors License
// 
// The LGPL License is included in the file lgpl.txt.
// The Allors License is an addendum to your contract.
// 
// Allors Platform is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// For more information visit http://www.allors.com/legal
// </copyright>
// --------------------------------------------------------------------------------------------------------------------

namespace Allors.Adapters.Database.Npgsql.Commands.Procedure
{
    using System.Collections.Generic;
    using System.Data;

    using Allors.Meta;

    using global::Npgsql;

    using Database = Database;
    using DatabaseSession = DatabaseSession;

    public class RemoveCompositeRoleFactory
    {
        internal readonly Database Database;
        private readonly Dictionary<IRoleType, string> sqlByRoleType;

        internal RemoveCompositeRoleFactory(Database database)
        {
            this.Database = database;
            this.sqlByRoleType = new Dictionary<IRoleType, string>();
        }

        public RemoveCompositeRole Create(DatabaseSession session)
        {
            return new RemoveCompositeRole(this, session);
        }

        public string GetSql(IRoleType roleType)
        {
            if (!this.sqlByRoleType.ContainsKey(roleType))
            {
                string sql;
                var associationType = roleType.AssociationType;

                if (associationType.IsMany || !roleType.RelationType.ExistExclusiveClasses)
                {
                    sql = Sql.Schema.AllorsPrefix + "R_" + roleType.SingularFullName;
                }
                else
                {
                    var compositeType = (IComposite)roleType.ObjectType;
                    sql = Sql.Schema.AllorsPrefix + "R_" + compositeType.ExclusiveClass.Name + "_" + associationType.SingularFullName;
                }
 
                this.sqlByRoleType[roleType] = sql;
            }

            return this.sqlByRoleType[roleType];
        }

        public class RemoveCompositeRole
        {
            private readonly RemoveCompositeRoleFactory factory;

            private readonly DatabaseSession session;

            private readonly Dictionary<IRoleType, NpgsqlCommand> commandByRoleType;

            public RemoveCompositeRole(RemoveCompositeRoleFactory factory, DatabaseSession session)
            {
                this.factory = factory;
                this.session = session;
                this.commandByRoleType = new Dictionary<IRoleType, NpgsqlCommand>();
            }

            public void Execute(IList<CompositeRelation> relations, IRoleType roleType)
            {
                NpgsqlCommand command;
                if (!this.commandByRoleType.TryGetValue(roleType, out command))
                {
                    command = this.session.CreateNpgsqlCommand(this.factory.GetSql(roleType));
                    command.CommandType = CommandType.StoredProcedure;
                    Commands.NpgsqlCommandExtensions.AddInTable(command, this.session.Schema.ObjectArrayParam, this.session.Database.CreateAssociationTable(relations));
                    Commands.NpgsqlCommandExtensions.AddInTable(command, this.session.Schema.CompositeRelationArrayParam, this.session.Database.CreateRoleTable(relations));

                    this.commandByRoleType[roleType] = command;
                }
                else
                {
                    Commands.NpgsqlCommandExtensions.SetInTable(command, this.session.Schema.ObjectArrayParam, this.session.Database.CreateAssociationTable(relations));
                    Commands.NpgsqlCommandExtensions.SetInTable(command, this.session.Schema.CompositeRelationArrayParam, this.session.Database.CreateRoleTable(relations));
                }

                command.ExecuteNonQuery();
            }
    }
    }
}