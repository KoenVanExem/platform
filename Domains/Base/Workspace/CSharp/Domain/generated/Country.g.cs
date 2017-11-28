// Allors generated file. 
// Do not edit this file, changes will be overwritten.
namespace Allors.Workspace.Domain
{
	public partial class Country : SessionObject 
	{
		public Country(Session session)
		: base(session)
		{
		}

		public Allors.Workspace.Meta.MetaCountry Meta
		{
			get
			{
				return Allors.Workspace.Meta.MetaCountry.Instance;
			}
		}

		public static Country Instantiate (Session allorsSession, long allorsObjectId)
		{
			return (Country) allorsSession.Get(allorsObjectId);		
		}

		public override bool Equals(object obj)
        {
            var that = obj as SessionObject;
		    if (that == null)
		    {
		        return false;
		    }

		    return this.Id.Equals(that.Id);
        }

		public override int GetHashCode()
        {
            return this.Id.GetHashCode();
        }


		public bool CanReadCurrency 
		{
			get
			{
				return this.CanRead(this.Meta.Currency);
			}
		}

		public bool CanWriteCurrency 
		{
			get
			{
				return this.CanWrite(this.Meta.Currency);
			}
		}



		virtual public Currency Currency
		{ 
			get
			{
				return (Currency) this.Get(Meta.Currency);
			}
			set
			{
				this.Set(Meta.Currency, value);
			}
		}

		virtual public bool ExistCurrency
		{
			get
			{
				return this.Exist(Meta.Currency);
			}
		}

		virtual public void RemoveCurrency()
		{
			this.Set(Meta.Currency, null);
		}
		public bool CanReadIsoCode 
		{
			get
			{
				return this.CanRead(this.Meta.IsoCode);
			}
		}

		public bool CanWriteIsoCode 
		{
			get
			{
				return this.CanWrite(this.Meta.IsoCode);
			}
		}



		virtual public global::System.String IsoCode 
		{
			get
			{
				return (global::System.String) this.Get(Meta.IsoCode);
			}
			set
			{
				this.Set(Meta.IsoCode, value);
			}
		}

		virtual public bool ExistIsoCode{
			get
			{
				return this.Exist(Meta.IsoCode);
			}
		}

		virtual public void RemoveIsoCode()
		{
			this.Set(Meta.IsoCode, null);
		}
		public bool CanReadName 
		{
			get
			{
				return this.CanRead(this.Meta.Name);
			}
		}

		public bool CanWriteName 
		{
			get
			{
				return this.CanWrite(this.Meta.Name);
			}
		}



		virtual public global::System.String Name 
		{
			get
			{
				return (global::System.String) this.Get(Meta.Name);
			}
			set
			{
				this.Set(Meta.Name, value);
			}
		}

		virtual public bool ExistName{
			get
			{
				return this.Exist(Meta.Name);
			}
		}

		virtual public void RemoveName()
		{
			this.Set(Meta.Name, null);
		}
		public bool CanReadLocalisedNames 
		{
			get
			{
				return this.CanRead(this.Meta.LocalisedNames);
			}
		}

		public bool CanWriteLocalisedNames 
		{
			get
			{
				return this.CanWrite(this.Meta.LocalisedNames);
			}
		}



		virtual public LocalisedText[] LocalisedNames
		{ 
			get
			{
				return (LocalisedText[])this.Get(Meta.LocalisedNames);
			}
			set
			{
				this.Set(Meta.LocalisedNames, value);
			}
		}

		virtual public void AddLocalisedName (LocalisedText value)
		{
			this.Add(Meta.LocalisedNames, value);
		}

		virtual public void RemoveLocalisedName (LocalisedText value)
		{
			this.Remove(Meta.LocalisedNames, value);
		}

		virtual public bool ExistLocalisedNames
		{
			get
			{
				return this.Exist(Meta.LocalisedNames);
			}
		}

		virtual public void RemoveLocalisedNames()
		{
			this.Set(Meta.LocalisedNames, null);
		}


	}
}