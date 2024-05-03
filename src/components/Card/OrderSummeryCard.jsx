const OrderSummeryCard = () => {
  return (
    <div className=" pr-10">
      <h4 className="text-2xl font-bold">Order Summary</h4>
      <div className="flex justify-between">
        <div>
          <p className="text-lg my-3">Subtotal:</p>
          <p className="text-lg my-3">Shipping:</p>
          <p className="text-lg my-3">Tax:</p>
          <p className="text-lg my-3">Total:</p>
        </div>
        <div className="text-right">
          <p className="text-lg my-3">$50</p>
          <p className="text-lg my-3">$10</p>
          <p className="text-lg my-3">5%</p>
          <p className="text-lg my-3">$65</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummeryCard;
