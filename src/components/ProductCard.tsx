import { Link } from "react-router-dom";
const ProductCard = ({ name, img_url, price, category, desc, id }) => {
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
          <h3 className="card-title ">{name}</h3>
          <p className="text-sm">{desc}</p>
          <p className="font-medium">Nrs. {price}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary btn-sm">
              <Link to={"/product/" + id}>See Details</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
