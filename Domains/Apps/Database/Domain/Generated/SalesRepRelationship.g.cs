// Allors generated file. 
// Do not edit this file, changes will be overwritten.
namespace Allors.Domain
{
	public partial class SalesRepRelationship : Allors.IObject , Commentable, PartyRelationship
	{
		private readonly IStrategy strategy;

		public SalesRepRelationship(Allors.IStrategy strategy) 
		{
			this.strategy = strategy;
		}

		public Allors.Meta.MetaSalesRepRelationship Meta
		{
			get
			{
				return Allors.Meta.MetaSalesRepRelationship.Instance;
			}
		}

		public long Id
		{
			get { return this.strategy.ObjectId; }
		}

		public IStrategy Strategy
        {
            [System.Diagnostics.DebuggerStepThrough]
            get { return this.strategy; }
        }

		public static SalesRepRelationship Instantiate (Allors.ISession allorsSession, string allorsObjectId)
		{
			return (SalesRepRelationship) allorsSession.Instantiate(allorsObjectId);		
		}

		public override bool Equals(object obj)
        {
            var typedObj = obj as IObject;
            return typedObj != null &&
                   typedObj.Strategy.ObjectId.Equals(this.Strategy.ObjectId) &&
                   typedObj.Strategy.Session.Database.Id.Equals(this.Strategy.Session.Database.Id);
        }

		public override int GetHashCode()
        {
            return this.Strategy.ObjectId.GetHashCode();
        }



		virtual public Person SalesRepresentative
		{ 
			get
			{
				return (Person) Strategy.GetCompositeRole(Meta.SalesRepresentative.RelationType);
			}
			set
			{
				Strategy.SetCompositeRole(Meta.SalesRepresentative.RelationType, value);
			}
		}

		virtual public bool ExistSalesRepresentative
		{
			get
			{
				return Strategy.ExistCompositeRole(Meta.SalesRepresentative.RelationType);
			}
		}

		virtual public void RemoveSalesRepresentative()
		{
			Strategy.RemoveCompositeRole(Meta.SalesRepresentative.RelationType);
		}


		virtual public global::System.Decimal LastYearsCommission 
		{
			get
			{
				return (global::System.Decimal) Strategy.GetUnitRole(Meta.LastYearsCommission.RelationType);
			}
			set
			{
				Strategy.SetUnitRole(Meta.LastYearsCommission.RelationType, value);
			}
		}

		virtual public bool ExistLastYearsCommission{
			get
			{
				return Strategy.ExistUnitRole(Meta.LastYearsCommission.RelationType);
			}
		}

		virtual public void RemoveLastYearsCommission()
		{
			Strategy.RemoveUnitRole(Meta.LastYearsCommission.RelationType);
		}


		virtual public global::Allors.Extent<ProductCategory> ProductCategories
		{ 
			get
			{
				return Strategy.GetCompositeRoles(Meta.ProductCategories.RelationType);
			}
			set
			{
				Strategy.SetCompositeRoles(Meta.ProductCategories.RelationType, value);
			}
		}

		virtual public void AddProductCategory (ProductCategory value)
		{
			Strategy.AddCompositeRole(Meta.ProductCategories.RelationType, value);
		}

		virtual public void RemoveProductCategory (ProductCategory value)
		{
			Strategy.RemoveCompositeRole(Meta.ProductCategories.RelationType, value);
		}

		virtual public bool ExistProductCategories
		{
			get
			{
				return Strategy.ExistCompositeRoles(Meta.ProductCategories.RelationType);
			}
		}

		virtual public void RemoveProductCategories()
		{
			Strategy.RemoveCompositeRoles(Meta.ProductCategories.RelationType);
		}


		virtual public global::System.Decimal YTDCommission 
		{
			get
			{
				return (global::System.Decimal) Strategy.GetUnitRole(Meta.YTDCommission.RelationType);
			}
			set
			{
				Strategy.SetUnitRole(Meta.YTDCommission.RelationType, value);
			}
		}

		virtual public bool ExistYTDCommission{
			get
			{
				return Strategy.ExistUnitRole(Meta.YTDCommission.RelationType);
			}
		}

		virtual public void RemoveYTDCommission()
		{
			Strategy.RemoveUnitRole(Meta.YTDCommission.RelationType);
		}


		virtual public Party Customer
		{ 
			get
			{
				return (Party) Strategy.GetCompositeRole(Meta.Customer.RelationType);
			}
			set
			{
				Strategy.SetCompositeRole(Meta.Customer.RelationType, value);
			}
		}

		virtual public bool ExistCustomer
		{
			get
			{
				return Strategy.ExistCompositeRole(Meta.Customer.RelationType);
			}
		}

		virtual public void RemoveCustomer()
		{
			Strategy.RemoveCompositeRole(Meta.Customer.RelationType);
		}


		virtual public global::System.String Comment 
		{
			get
			{
				return (global::System.String) Strategy.GetUnitRole(Meta.Comment.RelationType);
			}
			set
			{
				Strategy.SetUnitRole(Meta.Comment.RelationType, value);
			}
		}

		virtual public bool ExistComment{
			get
			{
				return Strategy.ExistUnitRole(Meta.Comment.RelationType);
			}
		}

		virtual public void RemoveComment()
		{
			Strategy.RemoveUnitRole(Meta.Comment.RelationType);
		}


		virtual public global::Allors.Extent<Party> Parties
		{ 
			get
			{
				return Strategy.GetCompositeRoles(Meta.Parties.RelationType);
			}
			set
			{
				Strategy.SetCompositeRoles(Meta.Parties.RelationType, value);
			}
		}

		virtual public void AddParty (Party value)
		{
			Strategy.AddCompositeRole(Meta.Parties.RelationType, value);
		}

		virtual public void RemoveParty (Party value)
		{
			Strategy.RemoveCompositeRole(Meta.Parties.RelationType, value);
		}

		virtual public bool ExistParties
		{
			get
			{
				return Strategy.ExistCompositeRoles(Meta.Parties.RelationType);
			}
		}

		virtual public void RemoveParties()
		{
			Strategy.RemoveCompositeRoles(Meta.Parties.RelationType);
		}


		virtual public global::System.DateTime FromDate 
		{
			get
			{
				return (global::System.DateTime) Strategy.GetUnitRole(Meta.FromDate.RelationType);
			}
			set
			{
				Strategy.SetUnitRole(Meta.FromDate.RelationType, value);
			}
		}

		virtual public bool ExistFromDate{
			get
			{
				return Strategy.ExistUnitRole(Meta.FromDate.RelationType);
			}
		}

		virtual public void RemoveFromDate()
		{
			Strategy.RemoveUnitRole(Meta.FromDate.RelationType);
		}


		virtual public global::System.DateTime? ThroughDate 
		{
			get
			{
				return (global::System.DateTime?) Strategy.GetUnitRole(Meta.ThroughDate.RelationType);
			}
			set
			{
				Strategy.SetUnitRole(Meta.ThroughDate.RelationType, value);
			}
		}

		virtual public bool ExistThroughDate{
			get
			{
				return Strategy.ExistUnitRole(Meta.ThroughDate.RelationType);
			}
		}

		virtual public void RemoveThroughDate()
		{
			Strategy.RemoveUnitRole(Meta.ThroughDate.RelationType);
		}


		virtual public global::Allors.Extent<Permission> DeniedPermissions
		{ 
			get
			{
				return Strategy.GetCompositeRoles(Meta.DeniedPermissions.RelationType);
			}
			set
			{
				Strategy.SetCompositeRoles(Meta.DeniedPermissions.RelationType, value);
			}
		}

		virtual public void AddDeniedPermission (Permission value)
		{
			Strategy.AddCompositeRole(Meta.DeniedPermissions.RelationType, value);
		}

		virtual public void RemoveDeniedPermission (Permission value)
		{
			Strategy.RemoveCompositeRole(Meta.DeniedPermissions.RelationType, value);
		}

		virtual public bool ExistDeniedPermissions
		{
			get
			{
				return Strategy.ExistCompositeRoles(Meta.DeniedPermissions.RelationType);
			}
		}

		virtual public void RemoveDeniedPermissions()
		{
			Strategy.RemoveCompositeRoles(Meta.DeniedPermissions.RelationType);
		}


		virtual public global::Allors.Extent<SecurityToken> SecurityTokens
		{ 
			get
			{
				return Strategy.GetCompositeRoles(Meta.SecurityTokens.RelationType);
			}
			set
			{
				Strategy.SetCompositeRoles(Meta.SecurityTokens.RelationType, value);
			}
		}

		virtual public void AddSecurityToken (SecurityToken value)
		{
			Strategy.AddCompositeRole(Meta.SecurityTokens.RelationType, value);
		}

		virtual public void RemoveSecurityToken (SecurityToken value)
		{
			Strategy.RemoveCompositeRole(Meta.SecurityTokens.RelationType, value);
		}

		virtual public bool ExistSecurityTokens
		{
			get
			{
				return Strategy.ExistCompositeRoles(Meta.SecurityTokens.RelationType);
			}
		}

		virtual public void RemoveSecurityTokens()
		{
			Strategy.RemoveCompositeRoles(Meta.SecurityTokens.RelationType);
		}



		public ObjectOnBuild OnBuild()
		{ 
			var method = new SalesRepRelationshipOnBuild(this);
            method.Execute();
            return method;
		}

		public ObjectOnBuild OnBuild(System.Action<ObjectOnBuild> action)
		{ 
			var method = new SalesRepRelationshipOnBuild(this);
            action(method);
            method.Execute();
            return method;
		}

		public ObjectOnPostBuild OnPostBuild()
		{ 
			var method = new SalesRepRelationshipOnPostBuild(this);
            method.Execute();
            return method;
		}

		public ObjectOnPostBuild OnPostBuild(System.Action<ObjectOnPostBuild> action)
		{ 
			var method = new SalesRepRelationshipOnPostBuild(this);
            action(method);
            method.Execute();
            return method;
		}

		public ObjectOnPreDerive OnPreDerive()
		{ 
			var method = new SalesRepRelationshipOnPreDerive(this);
            method.Execute();
            return method;
		}

		public ObjectOnPreDerive OnPreDerive(System.Action<ObjectOnPreDerive> action)
		{ 
			var method = new SalesRepRelationshipOnPreDerive(this);
            action(method);
            method.Execute();
            return method;
		}

		public ObjectOnDerive OnDerive()
		{ 
			var method = new SalesRepRelationshipOnDerive(this);
            method.Execute();
            return method;
		}

		public ObjectOnDerive OnDerive(System.Action<ObjectOnDerive> action)
		{ 
			var method = new SalesRepRelationshipOnDerive(this);
            action(method);
            method.Execute();
            return method;
		}

		public ObjectOnPostDerive OnPostDerive()
		{ 
			var method = new SalesRepRelationshipOnPostDerive(this);
            method.Execute();
            return method;
		}

		public ObjectOnPostDerive OnPostDerive(System.Action<ObjectOnPostDerive> action)
		{ 
			var method = new SalesRepRelationshipOnPostDerive(this);
            action(method);
            method.Execute();
            return method;
		}

		public DeletableDelete Delete()
		{ 
			var method = new SalesRepRelationshipDelete(this);
            method.Execute();
            return method;
		}

		public DeletableDelete Delete(System.Action<DeletableDelete> action)
		{ 
			var method = new SalesRepRelationshipDelete(this);
            action(method);
            method.Execute();
            return method;
		}
	}

	public partial class SalesRepRelationshipBuilder : Allors.ObjectBuilder<SalesRepRelationship> , CommentableBuilder, PartyRelationshipBuilder, global::System.IDisposable
	{		
		public SalesRepRelationshipBuilder(Allors.ISession session) : base(session)
	    {
	    }

		protected override void OnBuild(SalesRepRelationship instance)
		{
				

			instance.Comment = this.Comment;
		
		
			

			if(this.FromDate.HasValue)
			{
				instance.FromDate = this.FromDate.Value;
			}			
		
		
			

			if(this.ThroughDate.HasValue)
			{
				instance.ThroughDate = this.ThroughDate.Value;
			}			
		
		

			instance.SalesRepresentative = this.SalesRepresentative;

		
			if(this.ProductCategories!=null)
			{
				instance.ProductCategories = this.ProductCategories.ToArray();
			}
		

			instance.Customer = this.Customer;

				
			if(this.DeniedPermissions!=null)
			{
				instance.DeniedPermissions = this.DeniedPermissions.ToArray();
			}
		
			if(this.SecurityTokens!=null)
			{
				instance.SecurityTokens = this.SecurityTokens.ToArray();
			}
		
		}


				public Person SalesRepresentative {get; set;}

				/// <exclude/>
				public SalesRepRelationshipBuilder WithSalesRepresentative(Person value)
		        {
		            if(this.SalesRepresentative!=null){throw new global::System.ArgumentException("One multicplicity");}
					this.SalesRepresentative = value;
		            return this;
		        }		

				
				public global::System.Collections.Generic.List<ProductCategory> ProductCategories {get; set;}	

				/// <exclude/>
				public SalesRepRelationshipBuilder WithProductCategory(ProductCategory value)
		        {
					if(this.ProductCategories == null)
					{
						this.ProductCategories = new global::System.Collections.Generic.List<ProductCategory>(); 
					}
		            this.ProductCategories.Add(value);
		            return this;
		        }		

				
				public Party Customer {get; set;}

				/// <exclude/>
				public SalesRepRelationshipBuilder WithCustomer(Party value)
		        {
		            if(this.Customer!=null){throw new global::System.ArgumentException("One multicplicity");}
					this.Customer = value;
		            return this;
		        }		

				
				public global::System.String Comment {get; set;}

				/// <exclude/>
				public SalesRepRelationshipBuilder WithComment(global::System.String value)
		        {
				    if(this.Comment!=null){throw new global::System.ArgumentException("One multicplicity");}
		            this.Comment = value;
		            return this;
		        }	

				public global::System.DateTime? FromDate {get; set;}

				/// <exclude/>
				public SalesRepRelationshipBuilder WithFromDate(global::System.DateTime? value)
		        {
				    if(this.FromDate!=null){throw new global::System.ArgumentException("One multicplicity");}
		            this.FromDate = value;
		            return this;
		        }	

				public global::System.DateTime? ThroughDate {get; set;}

				/// <exclude/>
				public SalesRepRelationshipBuilder WithThroughDate(global::System.DateTime? value)
		        {
				    if(this.ThroughDate!=null){throw new global::System.ArgumentException("One multicplicity");}
		            this.ThroughDate = value;
		            return this;
		        }	

				public global::System.Collections.Generic.List<Permission> DeniedPermissions {get; set;}	

				/// <exclude/>
				public SalesRepRelationshipBuilder WithDeniedPermission(Permission value)
		        {
					if(this.DeniedPermissions == null)
					{
						this.DeniedPermissions = new global::System.Collections.Generic.List<Permission>(); 
					}
		            this.DeniedPermissions.Add(value);
		            return this;
		        }		

				
				public global::System.Collections.Generic.List<SecurityToken> SecurityTokens {get; set;}	

				/// <exclude/>
				public SalesRepRelationshipBuilder WithSecurityToken(SecurityToken value)
		        {
					if(this.SecurityTokens == null)
					{
						this.SecurityTokens = new global::System.Collections.Generic.List<SecurityToken>(); 
					}
		            this.SecurityTokens.Add(value);
		            return this;
		        }		

				

	}

	public partial class SalesRepRelationships : global::Allors.ObjectsBase<SalesRepRelationship>
	{
		public SalesRepRelationships(Allors.ISession session) : base(session)
		{
		}

		public Allors.Meta.MetaSalesRepRelationship Meta
		{
			get
			{
				return Allors.Meta.MetaSalesRepRelationship.Instance;
			}
		}

		public override Allors.Meta.Composite ObjectType
		{
			get
			{
				return Meta.ObjectType;
			}
		}
	}

}