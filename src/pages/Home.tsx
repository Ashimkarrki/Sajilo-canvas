import pic1 from "../assets/home-top-1.avif";
import pic2 from "../assets/home-top-2.avif";
import pic3 from "../assets/home-top-3.webp";
const Home = () => {
  return (
    <div className="flex flex-col gap-8 bg-teal-50">
      <img src={pic1} alt="landing-img" />
      <div className="grid grid-cols-2 justify-items-center	items-center">
        <p>Shop with us</p>
        <img src={pic2} alt="shop-img" />
      </div>
      <div className="grid grid-cols-2 justify-items-center	items-center">
        <img src={pic3} alt="shop-img" />
        <p>Design Your Space With Us</p>
      </div>
    </div>
  );
};

export default Home;
