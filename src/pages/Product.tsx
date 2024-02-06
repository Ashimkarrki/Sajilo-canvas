import { useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { populateCart } from "../redux/cartSlice";
import { useSelector, useDispatch } from "react-redux";
const Product = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.allCart);
  const { id } = useParams();
  const isPresent = () => {
    let present = false;
    cart.map((s) => {
      if (s.productId === data._id) {
        present = true;
      }
    });
    return present;
  };
  const [quantity, setQuantity] = useState(1);
  const addTocart = async () => {
    const instance = axios.create({
      withCredentials: true,
      headers: { authorization: "Bearer" },
    });
    setLoading(true);
    try {
      const res = await instance.post("/cart", {
        productId: data._id,
        quantity,
        name: data.name,
        price: data.price,
        img_url: data.img_url,
      });
      dispatch(populateCart(res.data.products));
      console.log(res.data.products);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const removeCart = async () => {
    if (!loading) {
      const instance = axios.create({
        withCredentials: true,
        headers: { authorization: "Bearer" },
      });
      setLoading(true);
      try {
        const res = await instance.delete("/cart/" + data._id);
        console.log(res.data);

        dispatch(populateCart(res.data.carts.products));
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
  };
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["singleProduct", id],
    queryFn: async () => {
      try {
        const res = await axios.get(`/product/${id}`);
        console.log(res.data.result);
        dispatch(populateCart(res.data.products));

        return res.data.result;
      } catch (err) {
        console.log(err);
        return err;
      }
    },
  });
  if (isPending) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="m-20">
      <div className="grid grid-cols-2  gap-4">
        <div>
          <img
            src="https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg"
            alt="bag"
          />
        </div>
        <div className="flex flex-col gap-2 ">
          <h1 className="text-2xl font-medium">{data.name}</h1>
          <p className="font-medium">Nrs. {data.price}</p>
          <p>{data.description}</p>

          {isPresent() ? (
            <button
              onClick={removeCart}
              className="btn btn-secondary self-start text-white"
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                " Remove From Cart"
              )}
            </button>
          ) : (
            <div className="flex gap-4">
              <div className="join">
                <button
                  className="join-item btn"
                  onClick={() => {
                    if (quantity < data.quantity) {
                      setQuantity(quantity + 1);
                    }
                  }}
                >
                  +
                </button>
                <button className="bg-white join-item btn btn-disabled">
                  {quantity}
                </button>
                <button
                  className="join-item btn"
                  onClick={() => {
                    if (quantity > 1) {
                      setQuantity(quantity - 1);
                    }
                  }}
                >
                  -
                </button>
              </div>
              <button
                onClick={addTocart}
                className="btn btn-primary self-start"
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Add To Cart"
                )}
              </button>
            </div>
          )}

          <div>
            <div tabIndex={0} className="collapse bg-base-200 collapse-plus">
              <div className="collapse-title  ">Features</div>
              <div className="collapse-content">
                <ul>
                  {data.features.map((s) => {
                    return <li key={s}>{s}</li>;
                  })}
                </ul>
              </div>
            </div>
          </div>
          {/* <div className="divider"></div> */}

          <div>
            <div tabIndex={0} className="collapse bg-base-200 collapse-plus">
              <div className="collapse-title  ">Descripton</div>
              <div className="collapse-content">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
                  in atque odio suscipit qui non dignissimos sit accusantium, ex
                  quam.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className=" divider text-center divider-primary font-medium text-xl">
          Customer Also Bought{" "}
        </p>
        <div className="flex gap-8 flex-wrap justify-center">
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </div>
  );
};

export default Product;
