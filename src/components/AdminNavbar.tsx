import { Link } from "react-router-dom";
const AdminNavbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Sajilo</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to={"/admin/allproducts"}>Products</Link>
          </li>
          <li>
            <Link to={"/admin/user-req"}>User Requests</Link>
          </li>
          <li>
            <Link to={"/admin/des-req"}>Designer Requests</Link>
          </li>{" "}
          <li>
            <Link to={"/admin/nvo"}>Not Verified Orders</Link>
          </li>{" "}
          <li>
            <Link to={"/admin/vo"}> Verified Orders</Link>
          </li>{" "}
          <li>
            <Link to={"/admin/ding"}> On Delivery</Link>
          </li>{" "}
          <li>
            <Link to={"/admin/ded"}> Delivered</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminNavbar;
