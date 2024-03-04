import { Link } from "react-router-dom";
const ProductCard = ({ name, img_url, price, category, desc, id }) => {
  return (
    <div className="flex flex-wrap p-8 justify-center">
      <div className="card card-compact w-72 bg-base-100 shadow-xl">
        <figure>
          <img
            className="w-full aspect-video object-cover"
            src={img_url}
            alt={name}
          />
        </figure>
        <div className="card-body">
          <h3 className="card-title ">{name}</h3>
          <p className="text-sm">{desc}</p>
          <p className="font-medium">Nrs. {price}</p>
          <div className="card-actions justify-end">
            <Link to={"/product/" + id}>
              <button className="btn btn-primary btn-sm">See Details</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
