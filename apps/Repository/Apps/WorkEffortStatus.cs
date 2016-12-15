namespace Allors.Repository.Domain
{
    using System;

    #region Allors
    [Id("90df16ba-ab97-4ec1-9db3-ab20314122bc")]
    #endregion
    public partial class WorkEffortStatus : Deletable, AccessControlledObject 
    {
        #region inherited properties
        public Permission[] DeniedPermissions { get; set; }

        public SecurityToken[] SecurityTokens { get; set; }

        #endregion

        #region Allors
        [Id("5dd27f4b-032d-4b45-86ad-ba288c26fa7c")]
        [AssociationId("2743e797-731b-404f-866a-5b9249309f60")]
        [RoleId("99022ef3-d4f2-4635-b27a-c02b554ad8ae")]
        #endregion
        [Required]

        public DateTime StartDateTime { get; set; }
        #region Allors
        [Id("f9e60388-f0da-45d9-94c2-5fe2d5ff581a")]
        [AssociationId("9bb24455-11ed-4dba-820c-fa6b03aae9a6")]
        [RoleId("6d2efe75-9b3f-449b-95f7-cbc552a2ca3c")]
        #endregion
        [Multiplicity(Multiplicity.ManyToOne)]
        [Indexed]
        [Required]

        public WorkEffortObjectState WorkEffortObjectState { get; set; }


        #region inherited methods


        public void OnBuild(){}

        public void OnPostBuild(){}

        public void OnPreDerive(){}

        public void OnDerive(){}

        public void OnPostDerive(){}


        public void Delete(){}

        #endregion

    }
}