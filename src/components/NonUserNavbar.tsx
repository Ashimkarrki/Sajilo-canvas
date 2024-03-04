import { Link } from "react-router-dom";
const NonUserNavbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost text-xl">
          Sajilo
        </Link>
      </div>
      <div className="flex-none ">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to={"/shop/1/no/no/no/no"} className="font-bold">
              Shop
            </Link>
          </li>
          <li>
            <Link to={"/login"} className="font-bold">
              Login
            </Link>
          </li>
          <li>
            <Link to={"/signup"} className="font-bold">
              Signup
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NonUserNavbar;
