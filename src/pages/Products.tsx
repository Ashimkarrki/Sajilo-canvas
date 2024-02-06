import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

import ProductCard from "../components/ProductCard";
const Products = ({
  setProducts,
  setTotalPage,
  products,
  setNum,
  currentPage,
}) => {
  const x = useParams();
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["products", currentPage],
    queryFn: async () => {
      try {
        const res = await axios.get(
          `products/?${x.sort === "no" ? "" : `/&sort=${x.sort}`}${
            x.cat === "no" ? "" : `/&category=${x.cat}`
          }${x.max === "no" ? "" : `/&max=${x.max}`}${
            x.min === "no" ? "" : `/&min=${x.min}`
          }&page=${x.page}`
        );
        console.log(res.data.products);

        setProducts(res.data.products);
        setTotalPage(res.data.totalPage);
        setNum([...Array(res.data.totalPage).keys()].map((s) => s + 1));
        return res.data;
      } catch (err) {
        return err;
      }
    },
  });
  if (isPending) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h1>Error...</h1>;
  }
  return (
    <div className="flex gap-4 flex-wrap">
      {products.map((s: any) => {
        return (
          <ProductCard
            key={s._id}
            name={s.name}
            img_url={s.img_url}
            price={s.price}
            category={s.category}
            desc={s.description}
            id={s._id}
          />
        );
      })}
    </div>
  );
};

export default Products;
