// Allors generated file. 
// Do not edit this file, changes will be overwritten.
namespace Allors.Domain
{
	public partial interface Order :  Printable,Commentable,Localised,Auditable,Transitional, Allors.IObject
	{


		global::System.String InternalComment 
		{
			get;
			set;
		}

		bool ExistInternalComment{get;}

		void RemoveInternalComment();


		Currency CustomerCurrency
		{ 
			get;
			set;
		}

		bool ExistCustomerCurrency
		{
			get;
		}

		void RemoveCustomerCurrency();


		global::System.Decimal TotalBasePriceCustomerCurrency 
		{
			get;
			set;
		}

		bool ExistTotalBasePriceCustomerCurrency{get;}

		void RemoveTotalBasePriceCustomerCurrency();


		global::System.Decimal TotalIncVatCustomerCurrency 
		{
			get;
			set;
		}

		bool ExistTotalIncVatCustomerCurrency{get;}

		void RemoveTotalIncVatCustomerCurrency();


		global::System.Decimal TotalDiscountCustomerCurrency 
		{
			get;
			set;
		}

		bool ExistTotalDiscountCustomerCurrency{get;}

		void RemoveTotalDiscountCustomerCurrency();


		global::System.String CustomerReference 
		{
			get;
			set;
		}

		bool ExistCustomerReference{get;}

		void RemoveCustomerReference();


		Fee Fee
		{ 
			get;
			set;
		}

		bool ExistFee
		{
			get;
		}

		void RemoveFee();


		global::System.Decimal TotalExVat 
		{
			get;
			set;
		}

		bool ExistTotalExVat{get;}

		void RemoveTotalExVat();


		global::Allors.Extent<OrderTerm> OrderTerms
		{ 
			get;
			set;
		}

		void AddOrderTerm (OrderTerm value);

		void RemoveOrderTerm (OrderTerm value);

		bool ExistOrderTerms
		{
			get;
		}

		void RemoveOrderTerms();


		global::System.Decimal TotalVat 
		{
			get;
			set;
		}

		bool ExistTotalVat{get;}

		void RemoveTotalVat();


		global::System.Decimal TotalSurcharge 
		{
			get;
			set;
		}

		bool ExistTotalSurcharge{get;}

		void RemoveTotalSurcharge();


		global::Allors.Extent<OrderItem> ValidOrderItems
		{ 
			get;
			set;
		}

		void AddValidOrderItem (OrderItem value);

		void RemoveValidOrderItem (OrderItem value);

		bool ExistValidOrderItems
		{
			get;
		}

		void RemoveValidOrderItems();


		global::System.String OrderNumber 
		{
			get;
			set;
		}

		bool ExistOrderNumber{get;}

		void RemoveOrderNumber();


		global::System.Decimal TotalVatCustomerCurrency 
		{
			get;
			set;
		}

		bool ExistTotalVatCustomerCurrency{get;}

		void RemoveTotalVatCustomerCurrency();


		global::System.Decimal TotalDiscount 
		{
			get;
			set;
		}

		bool ExistTotalDiscount{get;}

		void RemoveTotalDiscount();


		global::System.String Message 
		{
			get;
			set;
		}

		bool ExistMessage{get;}

		void RemoveMessage();


		global::System.String Description 
		{
			get;
			set;
		}

		bool ExistDescription{get;}

		void RemoveDescription();


		global::System.Decimal TotalShippingAndHandlingCustomerCurrency 
		{
			get;
			set;
		}

		bool ExistTotalShippingAndHandlingCustomerCurrency{get;}

		void RemoveTotalShippingAndHandlingCustomerCurrency();


		global::System.DateTime EntryDate 
		{
			get;
			set;
		}

		bool ExistEntryDate{get;}

		void RemoveEntryDate();


		DiscountAdjustment DiscountAdjustment
		{ 
			get;
			set;
		}

		bool ExistDiscountAdjustment
		{
			get;
		}

		void RemoveDiscountAdjustment();


		OrderKind OrderKind
		{ 
			get;
			set;
		}

		bool ExistOrderKind
		{
			get;
		}

		void RemoveOrderKind();


		global::System.Decimal TotalIncVat 
		{
			get;
			set;
		}

		bool ExistTotalIncVat{get;}

		void RemoveTotalIncVat();


		global::System.Decimal TotalSurchargeCustomerCurrency 
		{
			get;
			set;
		}

		bool ExistTotalSurchargeCustomerCurrency{get;}

		void RemoveTotalSurchargeCustomerCurrency();


		VatRegime VatRegime
		{ 
			get;
			set;
		}

		bool ExistVatRegime
		{
			get;
		}

		void RemoveVatRegime();


		global::System.Decimal TotalFeeCustomerCurrency 
		{
			get;
			set;
		}

		bool ExistTotalFeeCustomerCurrency{get;}

		void RemoveTotalFeeCustomerCurrency();


		global::System.Decimal TotalShippingAndHandling 
		{
			get;
			set;
		}

		bool ExistTotalShippingAndHandling{get;}

		void RemoveTotalShippingAndHandling();


		ShippingAndHandlingCharge ShippingAndHandlingCharge
		{ 
			get;
			set;
		}

		bool ExistShippingAndHandlingCharge
		{
			get;
		}

		void RemoveShippingAndHandlingCharge();


		global::System.DateTime OrderDate 
		{
			get;
			set;
		}

		bool ExistOrderDate{get;}

		void RemoveOrderDate();


		global::System.Decimal TotalExVatCustomerCurrency 
		{
			get;
			set;
		}

		bool ExistTotalExVatCustomerCurrency{get;}

		void RemoveTotalExVatCustomerCurrency();


		global::System.DateTime? DeliveryDate 
		{
			get;
			set;
		}

		bool ExistDeliveryDate{get;}

		void RemoveDeliveryDate();


		global::System.Decimal TotalBasePrice 
		{
			get;
			set;
		}

		bool ExistTotalBasePrice{get;}

		void RemoveTotalBasePrice();


		global::System.Decimal TotalFee 
		{
			get;
			set;
		}

		bool ExistTotalFee{get;}

		void RemoveTotalFee();


		SurchargeAdjustment SurchargeAdjustment
		{ 
			get;
			set;
		}

		bool ExistSurchargeAdjustment
		{
			get;
		}

		void RemoveSurchargeAdjustment();


		Person ContactPerson
		{ 
			get;
			set;
		}

		bool ExistContactPerson
		{
			get;
		}

		void RemoveContactPerson();



		OrderApprove Approve();

		OrderApprove Approve(System.Action<OrderApprove> action);

		OrderReject Reject();

		OrderReject Reject(System.Action<OrderReject> action);

		OrderHold Hold();

		OrderHold Hold(System.Action<OrderHold> action);

		OrderContinue Continue();

		OrderContinue Continue(System.Action<OrderContinue> action);

		OrderConfirm Confirm();

		OrderConfirm Confirm(System.Action<OrderConfirm> action);

		OrderCancel Cancel();

		OrderCancel Cancel(System.Action<OrderCancel> action);

		OrderComplete Complete();

		OrderComplete Complete(System.Action<OrderComplete> action);
	}

	public partial interface OrderBuilder : PrintableBuilder ,CommentableBuilder ,LocalisedBuilder ,AuditableBuilder ,TransitionalBuilder , global::System.IDisposable
	{	
		global::System.String InternalComment {get;}
		

		global::System.String CustomerReference {get;}
		

		Fee Fee {get;}

		


		global::System.Collections.Generic.List<OrderTerm> OrderTerms {get;}		

		

		global::System.String Message {get;}
		

		global::System.String Description {get;}
		

		DiscountAdjustment DiscountAdjustment {get;}

		

		OrderKind OrderKind {get;}

		

		VatRegime VatRegime {get;}

		

		ShippingAndHandlingCharge ShippingAndHandlingCharge {get;}

		

		global::System.DateTime? OrderDate {get;}
		

		global::System.DateTime? DeliveryDate {get;}
		

		SurchargeAdjustment SurchargeAdjustment {get;}

		

		Person ContactPerson {get;}

		

	}

	public partial class Orders : global::Allors.ObjectsBase<Order>
	{
		public Orders(Allors.ISession session) : base(session)
		{
		}

		public Allors.Meta.MetaOrder Meta
		{
			get
			{
				return Allors.Meta.MetaOrder.Instance;
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