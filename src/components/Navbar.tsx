import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    // <nav className="bg-slate-300 px-4 py-5 flex  flex-row gap-4">
    <nav className="navbar bg-base-300 px-4 py-5">
      <Link to={"/"} className="navbar-start">
        Sajilo
      </Link>
      <div className="navbar-end flex flex-row gap-4">
        <Link to="/shop/1/no/no/no/no">Shop</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/hireus">Hire us</Link>
        <Link to="/my-sub">My Submissions</Link>
        <Link to="/my-ord">My Orders</Link>
      </div>
    </nav>
  );
};

export default Navbar;
