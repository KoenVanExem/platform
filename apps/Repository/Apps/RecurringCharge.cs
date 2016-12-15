namespace Allors.Repository.Domain
{
    using System;

    #region Allors
    [Id("a71e670c-f089-4ec1-8295-dda8e7b62a19")]
    #endregion
    public partial class RecurringCharge : PriceComponent 
    {
        #region inherited properties
        public GeographicBoundary GeographicBoundary { get; set; }

        public decimal Rate { get; set; }

        public RevenueValueBreak RevenueValueBreak { get; set; }

        public PartyClassification PartyClassification { get; set; }

        public OrderQuantityBreak OrderQuantityBreak { get; set; }

        public PackageQuantityBreak PackageQuantityBreak { get; set; }

        public Product Product { get; set; }

        public RevenueQuantityBreak RevenueQuantityBreak { get; set; }

        public Party SpecifiedFor { get; set; }

        public ProductFeature ProductFeature { get; set; }

        public AgreementPricingProgram AgreementPricingProgram { get; set; }

        public string Description { get; set; }

        public Currency Currency { get; set; }

        public OrderKind OrderKind { get; set; }

        public OrderValue OrderValue { get; set; }

        public decimal Price { get; set; }

        public ProductCategory ProductCategory { get; set; }

        public SalesChannel SalesChannel { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ThroughDate { get; set; }

        public Permission[] DeniedPermissions { get; set; }

        public SecurityToken[] SecurityTokens { get; set; }

        public string Comment { get; set; }

        #endregion

        #region Allors
        [Id("f95e774f-239e-4136-a964-c3d1841a43ba")]
        [AssociationId("46b2864f-5c9b-43b9-a6b0-0bcf907adbc8")]
        [RoleId("97a9949b-6266-4fa2-a33a-3b13eaf21a93")]
        #endregion
        [Multiplicity(Multiplicity.ManyToOne)]
        [Indexed]

        public TimeFrequency TimeFrequency { get; set; }


        #region inherited methods


        public void OnBuild(){}

        public void OnPostBuild(){}

        public void OnPreDerive(){}

        public void OnDerive(){}

        public void OnPostDerive(){}




        #endregion

    }
}