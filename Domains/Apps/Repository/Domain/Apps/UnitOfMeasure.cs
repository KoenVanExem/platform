namespace Allors.Repository
{
    using System;

    using Allors.Repository.Attributes;

    #region Allors
    [Id("5cd7ea86-8bc6-4b72-a8f6-788e6453acdc")]
    #endregion
    [Plural("UnitsOfMeasure")]
    public partial class UnitOfMeasure : IUnitOfMeasure, UniquelyIdentifiable, AccessControlledObject, Enumeration 
    {
        #region inherited properties
        public string Description { get; set; }

        public UnitOfMeasureConversion[] UnitOfMeasureConversions { get; set; }

        public string Abbreviation { get; set; }

        public Permission[] DeniedPermissions { get; set; }

        public SecurityToken[] SecurityTokens { get; set; }

        public Guid UniqueId { get; set; }

        public LocalisedText[] LocalisedNames { get; set; }

        public string Name { get; set; }

        public bool IsActive { get; set; }

        #endregion


        #region inherited methods


        public void OnBuild(){}

        public void OnPostBuild(){}

        public void OnPreDerive(){}

        public void OnDerive(){}

        public void OnPostDerive(){}

        public void Delete() { }


        #endregion
    }
}