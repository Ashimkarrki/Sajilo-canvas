import { useState } from "react";
import Filters from "../components/Filters";
// import ProductCard from "../components/ProductCard";
import Products from "./Products";
import PaginationButtonBundle from "../components/PaginationButtonBundle";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [num, setNum] = useState([]);

  const [totalPage, setTotalPage] = useState(1);
  const [query, setQuery] = useState({
    sort: "no",
    cat: "no",
    min: "no",
    max: "no",
  });

  return (
    <div className="bg-white">
      <div className="flex justify-center">
        <input type="text" className="input input-bordered input-sm mt-4" />
      </div>
      <div className=" grid grid-cols-[15%_85%]">
        <Filters />

        <Products
          currentPage={currentPage}
          setNum={setNum}
          setProducts={setProducts}
          products={products}
          setTotalPage={setTotalPage}
        />
        <PaginationButtonBundle
          setCurrentPage={setCurrentPage}
          num={num}
          currentPage={currentPage}
          total={totalPage}
          query={query}
        />
      </div>
    </div>
  );
};

export default Shop;
