// --------------------------------------------------------------------------------------------------------------------
// <copyright file="Setup.cs" company="Allors bvba">
//   Copyright 2002-2013 Allors bvba.
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

using Allors.Meta;

namespace Allors
{
    using System;

    using Allors.Domain;

    public partial class Setup
    {
        private void TestOnPrePrepare()
        {
        }

        private void TestOnPostPrepare()
        {
        }

        private void TestOnPreSetup()
        {
        }

        private void TestOnPostSetup()
        {
            var singleton = Singleton.Instance(session);
            singleton.DefaultLocale = new Locales(session).EnglishGreatBritain;

            var security = new Security(session);
            foreach (var @class in this.session.Database.MetaPopulation.Classes)
            {
                if (@class.Equals(M.InternalOrganisation.Class))
                {
                    Console.WriteLine(1);   
                }

                security.GrantAdministrator(@class, Operations.Read, Operations.Write, Operations.Execute);
            }
        }
    }
}