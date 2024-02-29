import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { populateCart } from "../redux/cartSlice";
import axios from "axios";
const Cart = () => {
  const dispatch = useDispatch();

  const fetchCart = async () => {
    const instance = axios.create({
      withCredentials: true,
      headers: { authorization: "Bearer" },
    });
    try {
      const res = await instance.get("/cart");
      console.log(res.data);
      dispatch(populateCart(res.data.carts.products));
      return res.data.carts.products;
    } catch (err) {
      console.log(err);
    }
  };
  const { isPending, data, error } = useQuery({
    queryFn: fetchCart,
    queryKey: ["cart"],
  });
  if (isPending) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="m-20">
      <h1 className="text-xl font-medium">Shopping Cart</h1>
      <div className="grid grid-cols-3 gap-8 items-start">
        <div className="grid col-span-2">
          <div className="divider"></div>
          <div className="flex flex-col gap-8">
            {data.map((s) => {
              return (
                <CartItem
                  key={s._id}
                  id={s.productId}
                  qty={s.quantity}
                  name={s.name}
                  price={s.price}
                  img_url={s.img_url}
                />
              );
            })}
            {/* <CartItem />
            <CartItem />
            <CartItem />
            <CartItem /> */}
          </div>
        </div>
        <OrderSummary />
      </div>
    </div>
  );
};

export default Cart;
