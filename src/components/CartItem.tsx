import { Link } from "react-router-dom";
const CartItem = ({ qty, name, price, img_url, id }) => {
  return (
    // <div>
    <Link
      to={"/product/" + id}
      className="relative card card-side bg-base-100  "
    >
      <figure className="w-64 aspect-square">
        <img
          className="object-cover"
          src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-01.jpg"
          alt="Movie"
        />
      </figure>
      <div className="card-body ">
        <h2 className="card-title">
          {name} ( x{qty} )
        </h2>
        <p className="font-medium">Nrs. {price}</p>
      </div>
      <button className="bg-red w-8 absolute top-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="grey"
          aria-hidden="true"
          className="nz sb"
        >
          <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"></path>
        </svg>
      </button>
    </Link>
    // </div>
  );
};

export default CartItem;
