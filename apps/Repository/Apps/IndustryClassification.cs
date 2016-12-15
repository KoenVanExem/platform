namespace Allors.Repository.Domain
{
    using System;

    #region Allors
    [Id("da27b432-85e4-4c83-bdb0-64cefb347e8a")]
    #endregion
    public partial class IndustryClassification : OrganisationClassification 
    {
        #region inherited properties
        public string Name { get; set; }

        public Permission[] DeniedPermissions { get; set; }

        public SecurityToken[] SecurityTokens { get; set; }

        #endregion


        #region inherited methods


        public void OnBuild(){}

        public void OnPostBuild(){}

        public void OnPreDerive(){}

        public void OnDerive(){}

        public void OnPostDerive(){}



        #endregion

    }
}