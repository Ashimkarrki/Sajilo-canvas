import React from "react";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to={"/admin/allproducts"}>Products</Link>
          </li>
          <li>
            <Link to={"/admin/usr-req"}>User Requests</Link>
          </li>
          <li>
            <Link to={"/admin/des-req"}>Designer Requests</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminNavbar;
