import { Link } from "react-router-dom";
const MyOrderItem = ({ qty, name, price, img_url, id }) => {
  return (
    // <div>
    <Link
      to={"/product/" + id}
      className="relative card card-side bg-base-100  "
    >
      <figure className="w-32 aspect-square">
        <img className="object-cover" src={img_url} alt="Movie" />
      </figure>
      <div className="card-body ">
        <h2 className="card-title text-sm">
          {name} ( x{qty} )
        </h2>
        <p className="font-medium">Nrs. {price}</p>
      </div>
    </Link>
    // </div>
  );
};

export default MyOrderItem;
