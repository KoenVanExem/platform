// Allors generated file. 
// Do not edit this file, changes will be overwritten.
namespace Allors.Domain
{
	public partial class ShipmentMethod : Allors.IObject , Enumeration
	{
		private readonly IStrategy strategy;

		public ShipmentMethod(Allors.IStrategy strategy) 
		{
			this.strategy = strategy;
		}

		public Allors.Meta.MetaShipmentMethod Meta
		{
			get
			{
				return Allors.Meta.MetaShipmentMethod.Instance;
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

		public static ShipmentMethod Instantiate (Allors.ISession allorsSession, string allorsObjectId)
		{
			return (ShipmentMethod) allorsSession.Instantiate(allorsObjectId);		
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



		virtual public global::Allors.Extent<LocalisedText> LocalisedNames
		{ 
			get
			{
				return Strategy.GetCompositeRoles(Meta.LocalisedNames.RelationType);
			}
			set
			{
				Strategy.SetCompositeRoles(Meta.LocalisedNames.RelationType, value);
			}
		}

		virtual public void AddLocalisedName (LocalisedText value)
		{
			Strategy.AddCompositeRole(Meta.LocalisedNames.RelationType, value);
		}

		virtual public void RemoveLocalisedName (LocalisedText value)
		{
			Strategy.RemoveCompositeRole(Meta.LocalisedNames.RelationType, value);
		}

		virtual public bool ExistLocalisedNames
		{
			get
			{
				return Strategy.ExistCompositeRoles(Meta.LocalisedNames.RelationType);
			}
		}

		virtual public void RemoveLocalisedNames()
		{
			Strategy.RemoveCompositeRoles(Meta.LocalisedNames.RelationType);
		}


		virtual public global::System.String Name 
		{
			get
			{
				return (global::System.String) Strategy.GetUnitRole(Meta.Name.RelationType);
			}
			set
			{
				Strategy.SetUnitRole(Meta.Name.RelationType, value);
			}
		}

		virtual public bool ExistName{
			get
			{
				return Strategy.ExistUnitRole(Meta.Name.RelationType);
			}
		}

		virtual public void RemoveName()
		{
			Strategy.RemoveUnitRole(Meta.Name.RelationType);
		}


		virtual public global::System.Boolean IsActive 
		{
			get
			{
				return (global::System.Boolean) Strategy.GetUnitRole(Meta.IsActive.RelationType);
			}
			set
			{
				Strategy.SetUnitRole(Meta.IsActive.RelationType, value);
			}
		}

		virtual public bool ExistIsActive{
			get
			{
				return Strategy.ExistUnitRole(Meta.IsActive.RelationType);
			}
		}

		virtual public void RemoveIsActive()
		{
			Strategy.RemoveUnitRole(Meta.IsActive.RelationType);
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


		virtual public global::System.Guid UniqueId 
		{
			get
			{
				return (global::System.Guid) Strategy.GetUnitRole(Meta.UniqueId.RelationType);
			}
			set
			{
				Strategy.SetUnitRole(Meta.UniqueId.RelationType, value);
			}
		}

		virtual public bool ExistUniqueId{
			get
			{
				return Strategy.ExistUnitRole(Meta.UniqueId.RelationType);
			}
		}

		virtual public void RemoveUniqueId()
		{
			Strategy.RemoveUnitRole(Meta.UniqueId.RelationType);
		}



		virtual public global::Allors.Extent<SalesOrderVersion> SalesOrderVersionsWhereShipmentMethod
		{ 
			get
			{
				return Strategy.GetCompositeAssociations(Meta.SalesOrderVersionsWhereShipmentMethod.RelationType);
			}
		}

		virtual public bool ExistSalesOrderVersionsWhereShipmentMethod
		{
			get
			{
				return Strategy.ExistCompositeAssociations(Meta.SalesOrderVersionsWhereShipmentMethod.RelationType);
			}
		}


		virtual public global::Allors.Extent<SalesOrder> SalesOrdersWhereShipmentMethod
		{ 
			get
			{
				return Strategy.GetCompositeAssociations(Meta.SalesOrdersWhereShipmentMethod.RelationType);
			}
		}

		virtual public bool ExistSalesOrdersWhereShipmentMethod
		{
			get
			{
				return Strategy.ExistCompositeAssociations(Meta.SalesOrdersWhereShipmentMethod.RelationType);
			}
		}


		virtual public global::Allors.Extent<ShipmentRouteSegment> ShipmentRouteSegmentsWhereShipmentMethod
		{ 
			get
			{
				return Strategy.GetCompositeAssociations(Meta.ShipmentRouteSegmentsWhereShipmentMethod.RelationType);
			}
		}

		virtual public bool ExistShipmentRouteSegmentsWhereShipmentMethod
		{
			get
			{
				return Strategy.ExistCompositeAssociations(Meta.ShipmentRouteSegmentsWhereShipmentMethod.RelationType);
			}
		}


		virtual public global::Allors.Extent<ShippingAndHandlingComponent> ShippingAndHandlingComponentsWhereShipmentMethod
		{ 
			get
			{
				return Strategy.GetCompositeAssociations(Meta.ShippingAndHandlingComponentsWhereShipmentMethod.RelationType);
			}
		}

		virtual public bool ExistShippingAndHandlingComponentsWhereShipmentMethod
		{
			get
			{
				return Strategy.ExistCompositeAssociations(Meta.ShippingAndHandlingComponentsWhereShipmentMethod.RelationType);
			}
		}


		virtual public global::Allors.Extent<Store> StoresWhereDefaultShipmentMethod
		{ 
			get
			{
				return Strategy.GetCompositeAssociations(Meta.StoresWhereDefaultShipmentMethod.RelationType);
			}
		}

		virtual public bool ExistStoresWhereDefaultShipmentMethod
		{
			get
			{
				return Strategy.ExistCompositeAssociations(Meta.StoresWhereDefaultShipmentMethod.RelationType);
			}
		}


		virtual public global::Allors.Extent<PartyVersion> PartyVersionsWhereDefaultShipmentMethod
		{ 
			get
			{
				return Strategy.GetCompositeAssociations(Meta.PartyVersionsWhereDefaultShipmentMethod.RelationType);
			}
		}

		virtual public bool ExistPartyVersionsWhereDefaultShipmentMethod
		{
			get
			{
				return Strategy.ExistCompositeAssociations(Meta.PartyVersionsWhereDefaultShipmentMethod.RelationType);
			}
		}


		virtual public global::Allors.Extent<Party> PartiesWhereDefaultShipmentMethod
		{ 
			get
			{
				return Strategy.GetCompositeAssociations(Meta.PartiesWhereDefaultShipmentMethod.RelationType);
			}
		}

		virtual public bool ExistPartiesWhereDefaultShipmentMethod
		{
			get
			{
				return Strategy.ExistCompositeAssociations(Meta.PartiesWhereDefaultShipmentMethod.RelationType);
			}
		}


		virtual public global::Allors.Extent<ShipmentVersion> ShipmentVersionsWhereShipmentMethod
		{ 
			get
			{
				return Strategy.GetCompositeAssociations(Meta.ShipmentVersionsWhereShipmentMethod.RelationType);
			}
		}

		virtual public bool ExistShipmentVersionsWhereShipmentMethod
		{
			get
			{
				return Strategy.ExistCompositeAssociations(Meta.ShipmentVersionsWhereShipmentMethod.RelationType);
			}
		}


		virtual public global::Allors.Extent<Shipment> ShipmentsWhereShipmentMethod
		{ 
			get
			{
				return Strategy.GetCompositeAssociations(Meta.ShipmentsWhereShipmentMethod.RelationType);
			}
		}

		virtual public bool ExistShipmentsWhereShipmentMethod
		{
			get
			{
				return Strategy.ExistCompositeAssociations(Meta.ShipmentsWhereShipmentMethod.RelationType);
			}
		}


		virtual public global::Allors.Extent<Notification> NotificationsWhereTarget
		{ 
			get
			{
				return Strategy.GetCompositeAssociations(Meta.NotificationsWhereTarget.RelationType);
			}
		}

		virtual public bool ExistNotificationsWhereTarget
		{
			get
			{
				return Strategy.ExistCompositeAssociations(Meta.NotificationsWhereTarget.RelationType);
			}
		}



		public ShipmentMethodDelete Delete()
		{ 
			var method = new ShipmentMethodDelete(this);
            method.Execute();
            return method;
		}

		public ShipmentMethodDelete Delete(System.Action<ShipmentMethodDelete> action)
		{ 
			var method = new ShipmentMethodDelete(this);
            action(method);
            method.Execute();
            return method;
		}

		public ObjectOnBuild OnBuild()
		{ 
			var method = new ShipmentMethodOnBuild(this);
            method.Execute();
            return method;
		}

		public ObjectOnBuild OnBuild(System.Action<ObjectOnBuild> action)
		{ 
			var method = new ShipmentMethodOnBuild(this);
            action(method);
            method.Execute();
            return method;
		}

		public ObjectOnPostBuild OnPostBuild()
		{ 
			var method = new ShipmentMethodOnPostBuild(this);
            method.Execute();
            return method;
		}

		public ObjectOnPostBuild OnPostBuild(System.Action<ObjectOnPostBuild> action)
		{ 
			var method = new ShipmentMethodOnPostBuild(this);
            action(method);
            method.Execute();
            return method;
		}

		public ObjectOnPreDerive OnPreDerive()
		{ 
			var method = new ShipmentMethodOnPreDerive(this);
            method.Execute();
            return method;
		}

		public ObjectOnPreDerive OnPreDerive(System.Action<ObjectOnPreDerive> action)
		{ 
			var method = new ShipmentMethodOnPreDerive(this);
            action(method);
            method.Execute();
            return method;
		}

		public ObjectOnDerive OnDerive()
		{ 
			var method = new ShipmentMethodOnDerive(this);
            method.Execute();
            return method;
		}

		public ObjectOnDerive OnDerive(System.Action<ObjectOnDerive> action)
		{ 
			var method = new ShipmentMethodOnDerive(this);
            action(method);
            method.Execute();
            return method;
		}

		public ObjectOnPostDerive OnPostDerive()
		{ 
			var method = new ShipmentMethodOnPostDerive(this);
            method.Execute();
            return method;
		}

		public ObjectOnPostDerive OnPostDerive(System.Action<ObjectOnPostDerive> action)
		{ 
			var method = new ShipmentMethodOnPostDerive(this);
            action(method);
            method.Execute();
            return method;
		}
	}

	public partial class ShipmentMethodBuilder : Allors.ObjectBuilder<ShipmentMethod> , EnumerationBuilder, global::System.IDisposable
	{		
		public ShipmentMethodBuilder(Allors.ISession session) : base(session)
	    {
	    }

		protected override void OnBuild(ShipmentMethod instance)
		{

			instance.Name = this.Name;
		
		
			

			if(this.IsActive.HasValue)
			{
				instance.IsActive = this.IsActive.Value;
			}			
		
		
			

			if(this.UniqueId.HasValue)
			{
				instance.UniqueId = this.UniqueId.Value;
			}			
		
		
			if(this.LocalisedNames!=null)
			{
				instance.LocalisedNames = this.LocalisedNames.ToArray();
			}
		
			if(this.DeniedPermissions!=null)
			{
				instance.DeniedPermissions = this.DeniedPermissions.ToArray();
			}
		
			if(this.SecurityTokens!=null)
			{
				instance.SecurityTokens = this.SecurityTokens.ToArray();
			}
		
		}


				public global::System.Collections.Generic.List<LocalisedText> LocalisedNames {get; set;}	

				/// <exclude/>
				public ShipmentMethodBuilder WithLocalisedName(LocalisedText value)
		        {
					if(this.LocalisedNames == null)
					{
						this.LocalisedNames = new global::System.Collections.Generic.List<LocalisedText>(); 
					}
		            this.LocalisedNames.Add(value);
		            return this;
		        }		

				
				public global::System.String Name {get; set;}

				/// <exclude/>
				public ShipmentMethodBuilder WithName(global::System.String value)
		        {
				    if(this.Name!=null){throw new global::System.ArgumentException("One multicplicity");}
		            this.Name = value;
		            return this;
		        }	

				public global::System.Boolean? IsActive {get; set;}

				/// <exclude/>
				public ShipmentMethodBuilder WithIsActive(global::System.Boolean? value)
		        {
				    if(this.IsActive!=null){throw new global::System.ArgumentException("One multicplicity");}
		            this.IsActive = value;
		            return this;
		        }	

				public global::System.Collections.Generic.List<Permission> DeniedPermissions {get; set;}	

				/// <exclude/>
				public ShipmentMethodBuilder WithDeniedPermission(Permission value)
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
				public ShipmentMethodBuilder WithSecurityToken(SecurityToken value)
		        {
					if(this.SecurityTokens == null)
					{
						this.SecurityTokens = new global::System.Collections.Generic.List<SecurityToken>(); 
					}
		            this.SecurityTokens.Add(value);
		            return this;
		        }		

				
				public global::System.Guid? UniqueId {get; set;}

				/// <exclude/>
				public ShipmentMethodBuilder WithUniqueId(global::System.Guid? value)
		        {
				    if(this.UniqueId!=null){throw new global::System.ArgumentException("One multicplicity");}
		            this.UniqueId = value;
		            return this;
		        }	


	}

	public partial class ShipmentMethods : global::Allors.ObjectsBase<ShipmentMethod>
	{
		public ShipmentMethods(Allors.ISession session) : base(session)
		{
		}

		public Allors.Meta.MetaShipmentMethod Meta
		{
			get
			{
				return Allors.Meta.MetaShipmentMethod.Instance;
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