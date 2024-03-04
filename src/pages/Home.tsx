import { Link } from "react-router-dom";
import pic1 from "../assets/home-top-1.avif";
import pic2 from "../assets/home-top-2.avif";
import pic3 from "../assets/home-top-3.webp";
const Home = () => {
  return (
    <div className="flex flex-col gap-8 bg-teal-50">
      <img src={pic1} alt="landing-img" />
      <div className="grid grid-cols-2 justify-items-center	items-center">
        <Link to={"/shop/1/no/no/no/no"}>
          <p className="text-xl font-bold">Shop with us</p>
        </Link>
        <img src={pic2} alt="shop-img" />
      </div>
      <div className="grid grid-cols-2 justify-items-center	items-center">
        <img src={pic3} alt="shop-img" />
        <Link to={"/hireus"}>
          <p className="text-xl font-bold">Design Your Space With Us</p>
        </Link>
      </div>
    </div>
  );
};

export default Home;
