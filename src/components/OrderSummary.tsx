import { Link } from "react-router-dom";
const OrderSummary = () => {
  return (
    <div
      className="flex flex-col  mt-8
"
    >
      <h1 className="text-xl mb-8">Order Summay</h1>
      <div className="flex">
        Sub Total
        <span className="ml-auto">Nrs 200</span>
      </div>
      <div className="divider"></div>
      <div className="flex">
        Shipping Estimate
        <span className="ml-auto">Nrs 10</span>
      </div>
      <div className="divider"></div>

      <div className="flex mb-8">
        Order Total
        <span className="ml-auto">Nrs 3000</span>
      </div>
      <button className="btn">
        <Link to={"/checkout"}>Checkout</Link>
      </button>
    </div>
  );
};

export default OrderSummary;
