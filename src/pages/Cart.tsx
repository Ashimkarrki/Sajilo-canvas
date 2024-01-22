import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";
const Cart = () => {
  return (
    <div className="m-20">
      <h1 className="text-xl font-medium">Shopping Cart</h1>
      <div className="grid grid-cols-3 gap-8 items-start">
        <div className="grid col-span-2">
          <div className="divider"></div>
          <div className="flex flex-col gap-8">
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
          </div>
        </div>
        <OrderSummary />
      </div>
    </div>
  );
};

export default Cart;
