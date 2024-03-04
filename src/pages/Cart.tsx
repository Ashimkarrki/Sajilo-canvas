import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { populateCart } from "../redux/cartSlice";
import axios from "axios";
const Cart = () => {
  const dispatch = useDispatch();
  const totalAmt = () => {
    let total = 0;
    data?.products?.forEach((element) => {
      total += element.price * element.quantity;
    });
    return total;
  };
  const concatName = () => {
    let name = "";
    data?.products?.forEach((element) => {
      name += element.name;
    });
    return name;
  };
  const fetchCart = async () => {
    const instance = axios.create({
      withCredentials: true,
      headers: { authorization: "Bearer" },
    });
    try {
      const res = await instance.get("/cart");
      if (res.data.success) {
        dispatch(populateCart(res.data.carts.products));
        console.log(res.data.carts.products);

        return res.data.carts;
      } else {
        dispatch(populateCart([]));
        return { products: [] };
      }
    } catch (err) {
      console.log(err);
    }
  };
  const { isPending, data, refetch, error } = useQuery({
    queryFn: fetchCart,
    queryKey: ["cart"],
  });

  if (isPending) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="m-8">
      {data?.products?.length == 0 ? (
        <h1 className="text-center font-bold text-xl">Cart Is Empty</h1>
      ) : (
        <>
          <h1 className="text-xl font-medium">Shopping Cart</h1>
          <div className="grid grid-cols-3 gap-8 items-start">
            <div className="grid col-span-2">
              <div className="divider"></div>
              <div className="flex flex-col gap-8">
                {data?.products?.map((s) => {
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
              </div>
            </div>
            <OrderSummary
              amt={totalAmt()}
              cartId={data._id}
              name={concatName()}
              refetch={refetch}
              products={data.products}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
