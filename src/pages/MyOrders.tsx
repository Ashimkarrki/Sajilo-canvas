import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import MyOrderItem from "../components/MyOrderItem";
const MyOrders = () => {
  const fetchOrder = async () => {
    const instance = axios.create({
      withCredentials: true,
      headers: { authorization: "Bearer" },
    });
    try {
      const res = await instance.get("/orderHistory");
      console.log(res.data.order);
      return res.data.order;
    } catch (err) {
      console.log(err);
    }
  };

  const { isPending, data, error } = useQuery({
    queryFn: fetchOrder,
    queryKey: ["order"],
  });
  if (isPending) {
    return (
      <div className="flex justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  console.log(data);
  return (
    <div className="m-8">
      {data?.length === 0 ? (
        <h1 className="text-xl font-medium text-center">Order Is Empty</h1>
      ) : (
        <>
          <h1 className="text-xl font-medium">Order History</h1>
          <div className="flex w-full">
            <div className="flex w-full">
              <div>
                {data.map((s) => {
                  return (
                    <div key={s._id}>
                      <div>
                        {s.products.map((k) => {
                          return (
                            <MyOrderItem
                              key={s._id}
                              qty={k.quantity}
                              name={k.name}
                              price={k.price}
                              img_url={k.img_url}
                              id={k.productId}
                            />
                          );
                        })}
                      </div>
                      <div className="flex flex-col gap-4">
                        <div>Total : {s.totalamount}</div>
                        <div>
                          Location : {s.City} , {s.District} , {s.Pickuppoint}
                        </div>
                        <button className="btn btn-sm btn-disabled">
                          {s.status}
                        </button>
                      </div>
                      <div className="divider"></div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MyOrders;
