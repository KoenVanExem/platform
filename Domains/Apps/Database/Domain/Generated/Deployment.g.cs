// Allors generated file. 
// Do not edit this file, changes will be overwritten.
namespace Allors.Domain
{
	public partial class Deployment : Allors.IObject , AccessControlledObject, Period
	{
		private readonly IStrategy strategy;

		public Deployment(Allors.IStrategy strategy) 
		{
			this.strategy = strategy;
		}

		public Allors.Meta.MetaDeployment Meta
		{
			get
			{
				return Allors.Meta.MetaDeployment.Instance;
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

		public static Deployment Instantiate (Allors.ISession allorsSession, string allorsObjectId)
		{
			return (Deployment) allorsSession.Instantiate(allorsObjectId);		
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



		virtual public Good ProductOffering
		{ 
			get
			{
				return (Good) Strategy.GetCompositeRole(Meta.ProductOffering.RelationType);
			}
			set
			{
				Strategy.SetCompositeRole(Meta.ProductOffering.RelationType, value);
			}
		}

		virtual public bool ExistProductOffering
		{
			get
			{
				return Strategy.ExistCompositeRole(Meta.ProductOffering.RelationType);
			}
		}

		virtual public void RemoveProductOffering()
		{
			Strategy.RemoveCompositeRole(Meta.ProductOffering.RelationType);
		}


		virtual public DeploymentUsage DeploymentUsage
		{ 
			get
			{
				return (DeploymentUsage) Strategy.GetCompositeRole(Meta.DeploymentUsage.RelationType);
			}
			set
			{
				Strategy.SetCompositeRole(Meta.DeploymentUsage.RelationType, value);
			}
		}

		virtual public bool ExistDeploymentUsage
		{
			get
			{
				return Strategy.ExistCompositeRole(Meta.DeploymentUsage.RelationType);
			}
		}

		virtual public void RemoveDeploymentUsage()
		{
			Strategy.RemoveCompositeRole(Meta.DeploymentUsage.RelationType);
		}


		virtual public SerialisedInventoryItem SerializedInventoryItem
		{ 
			get
			{
				return (SerialisedInventoryItem) Strategy.GetCompositeRole(Meta.SerializedInventoryItem.RelationType);
			}
			set
			{
				Strategy.SetCompositeRole(Meta.SerializedInventoryItem.RelationType, value);
			}
		}

		virtual public bool ExistSerializedInventoryItem
		{
			get
			{
				return Strategy.ExistCompositeRole(Meta.SerializedInventoryItem.RelationType);
			}
		}

		virtual public void RemoveSerializedInventoryItem()
		{
			Strategy.RemoveCompositeRole(Meta.SerializedInventoryItem.RelationType);
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



		public ObjectOnBuild OnBuild()
		{ 
			var method = new DeploymentOnBuild(this);
            method.Execute();
            return method;
		}

		public ObjectOnBuild OnBuild(System.Action<ObjectOnBuild> action)
		{ 
			var method = new DeploymentOnBuild(this);
            action(method);
            method.Execute();
            return method;
		}

		public ObjectOnPostBuild OnPostBuild()
		{ 
			var method = new DeploymentOnPostBuild(this);
            method.Execute();
            return method;
		}

		public ObjectOnPostBuild OnPostBuild(System.Action<ObjectOnPostBuild> action)
		{ 
			var method = new DeploymentOnPostBuild(this);
            action(method);
            method.Execute();
            return method;
		}

		public ObjectOnPreDerive OnPreDerive()
		{ 
			var method = new DeploymentOnPreDerive(this);
            method.Execute();
            return method;
		}

		public ObjectOnPreDerive OnPreDerive(System.Action<ObjectOnPreDerive> action)
		{ 
			var method = new DeploymentOnPreDerive(this);
            action(method);
            method.Execute();
            return method;
		}

		public ObjectOnDerive OnDerive()
		{ 
			var method = new DeploymentOnDerive(this);
            method.Execute();
            return method;
		}

		public ObjectOnDerive OnDerive(System.Action<ObjectOnDerive> action)
		{ 
			var method = new DeploymentOnDerive(this);
            action(method);
            method.Execute();
            return method;
		}

		public ObjectOnPostDerive OnPostDerive()
		{ 
			var method = new DeploymentOnPostDerive(this);
            method.Execute();
            return method;
		}

		public ObjectOnPostDerive OnPostDerive(System.Action<ObjectOnPostDerive> action)
		{ 
			var method = new DeploymentOnPostDerive(this);
            action(method);
            method.Execute();
            return method;
		}
	}

	public partial class DeploymentBuilder : Allors.ObjectBuilder<Deployment> , AccessControlledObjectBuilder, PeriodBuilder, global::System.IDisposable
	{		
		public DeploymentBuilder(Allors.ISession session) : base(session)
	    {
	    }

		protected override void OnBuild(Deployment instance)
		{
			

			if(this.FromDate.HasValue)
			{
				instance.FromDate = this.FromDate.Value;
			}			
		
		
			

			if(this.ThroughDate.HasValue)
			{
				instance.ThroughDate = this.ThroughDate.Value;
			}			
		
		

			instance.ProductOffering = this.ProductOffering;

		

			instance.DeploymentUsage = this.DeploymentUsage;

		

			instance.SerializedInventoryItem = this.SerializedInventoryItem;

		
			if(this.DeniedPermissions!=null)
			{
				instance.DeniedPermissions = this.DeniedPermissions.ToArray();
			}
		
			if(this.SecurityTokens!=null)
			{
				instance.SecurityTokens = this.SecurityTokens.ToArray();
			}
		
		}


				public Good ProductOffering {get; set;}

				/// <exclude/>
				public DeploymentBuilder WithProductOffering(Good value)
		        {
		            if(this.ProductOffering!=null){throw new global::System.ArgumentException("One multicplicity");}
					this.ProductOffering = value;
		            return this;
		        }		

				
				public DeploymentUsage DeploymentUsage {get; set;}

				/// <exclude/>
				public DeploymentBuilder WithDeploymentUsage(DeploymentUsage value)
		        {
		            if(this.DeploymentUsage!=null){throw new global::System.ArgumentException("One multicplicity");}
					this.DeploymentUsage = value;
		            return this;
		        }		

				
				public SerialisedInventoryItem SerializedInventoryItem {get; set;}

				/// <exclude/>
				public DeploymentBuilder WithSerializedInventoryItem(SerialisedInventoryItem value)
		        {
		            if(this.SerializedInventoryItem!=null){throw new global::System.ArgumentException("One multicplicity");}
					this.SerializedInventoryItem = value;
		            return this;
		        }		

				
				public global::System.Collections.Generic.List<Permission> DeniedPermissions {get; set;}	

				/// <exclude/>
				public DeploymentBuilder WithDeniedPermission(Permission value)
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
				public DeploymentBuilder WithSecurityToken(SecurityToken value)
		        {
					if(this.SecurityTokens == null)
					{
						this.SecurityTokens = new global::System.Collections.Generic.List<SecurityToken>(); 
					}
		            this.SecurityTokens.Add(value);
		            return this;
		        }		

				
				public global::System.DateTime? FromDate {get; set;}

				/// <exclude/>
				public DeploymentBuilder WithFromDate(global::System.DateTime? value)
		        {
				    if(this.FromDate!=null){throw new global::System.ArgumentException("One multicplicity");}
		            this.FromDate = value;
		            return this;
		        }	

				public global::System.DateTime? ThroughDate {get; set;}

				/// <exclude/>
				public DeploymentBuilder WithThroughDate(global::System.DateTime? value)
		        {
				    if(this.ThroughDate!=null){throw new global::System.ArgumentException("One multicplicity");}
		            this.ThroughDate = value;
		            return this;
		        }	


	}

	public partial class Deployments : global::Allors.ObjectsBase<Deployment>
	{
		public Deployments(Allors.ISession session) : base(session)
		{
		}

		public Allors.Meta.MetaDeployment Meta
		{
			get
			{
				return Allors.Meta.MetaDeployment.Instance;
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