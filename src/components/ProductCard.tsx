import { Link } from "react-router-dom";
const ProductCard = () => {
  return (
    <div className="flex flex-wrap p-8 justify-center">
      <div className="card card-compact w-72 bg-base-100 shadow-xl">
        <figure>
          <img
            src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h3 className="card-title ">Shoes!</h3>
          <p className="text-sm">
            If a dog chews shoes whose shoes does he choose?
          </p>
          <p className="font-medium">Nrs. 2,000</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary btn-sm">
              <Link to={"/product"}>See Details</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;