// import { Fragment, useState } from "react";
import Filters from "../components/Filters";
import ProductCard from "../components/ProductCard";

const Shop = () => {
  return (
    <div className="bg-white grid grid-cols-[15%_85%]">
      <Filters />
      <ProductCard />
      <div className="join col-start-2 ml-auto mr-auto mb-4">
        <button className="join-item btn">1</button>
        <button className="join-item btn btn-active">2</button>
        <button className="join-item btn">3</button>
        <button className="join-item btn">4</button>
      </div>
    </div>
  );
};

export default Shop;
