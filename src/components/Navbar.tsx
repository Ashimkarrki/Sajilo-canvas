import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    // <nav className="bg-slate-300 px-4 py-5 flex  flex-row gap-4">
    <nav className="navbar bg-base-300 px-4 py-5">
      <Link to={"/"} className="navbar-start">
        Logo
      </Link>

      {/* <div className="navbar-center">
        <div className="form-control input-sm">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
      </div> */}
      {/* <div className="navbar-end">hllo</div> */}
      <div className="navbar-end flex flex-row gap-4">
        <Link to="/shop/1/no/no/no/no">Shop</Link>

        <Link to="/work">Our Work</Link>

        <Link to="/work">Our Work</Link>

        <Link to="/cart">Cart</Link>

        <Link to="/Notification">Notifications</Link>

        <Link to="/hireus">Hire us</Link>
      </div>
    </nav>
  );
};

export default Navbar;
