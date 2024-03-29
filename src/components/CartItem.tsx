import { Link } from "react-router-dom";
const CartItem = ({ qty, name, price, img_url, id }) => {
  return (
    // <div>
    <Link
      to={"/product/" + id}
      className="relative card card-side bg-base-100  "
    >
      <figure className="w-64 ">
        <img
          className=" w-full object-cover aspect-square"
          src={img_url}
          alt={name}
        />
      </figure>
      <div className="card-body ">
        <h2 className="card-title">
          {name} ( x{qty} )
        </h2>
        <p className="font-medium">Nrs. {price}</p>
      </div>
    </Link>
    // </div>
  );
};

export default CartItem;
