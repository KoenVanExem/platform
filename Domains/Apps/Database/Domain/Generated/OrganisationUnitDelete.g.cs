// Allors generated file. 
// Do not edit this file, changes will be overwritten.
namespace Allors.Domain
{
	public partial class OrganisationUnitDelete : Allors.Meta.Method
	{
	    private static readonly Allors.Meta.MethodInvocation OrganisationUnitDeleteInvocation = new Allors.Meta.MethodInvocation(Allors.Meta.M.OrganisationUnit.ObjectType, Allors.Meta.M.OrganisationUnit.Delete); 

		public OrganisationUnitDelete(OrganisationUnit @object) : base(@object)
		{
		}

		public override Allors.Meta.MethodInvocation MethodInvocation
		{
			get
			{
				return OrganisationUnitDeleteInvocation;
			}
		}
	}
}