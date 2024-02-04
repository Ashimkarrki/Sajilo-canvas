import ProductCard from "../components/ProductCard";
import axios from "axios";
const Product = () => {
  const addTocart = async () => {
    const res = await axios.post(
      "/addtocart",
      {
        productId: 1,
        quantity: 2,
        price: 23,
        name: "dh",
      },
      { withCredentials: true }
    );
    console.log(res);
  };
  return (
    <div className="m-20">
      <div className="grid grid-cols-2  gap-4">
        <div>
          <img
            src="https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg"
            alt="bag"
          />
        </div>
        <div className="flex flex-col gap-2 ">
          <h1 className="text-2xl font-medium">Heading</h1>
          <p className="font-medium">Nrs. Price</p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti
            accusantium officiis repudiandae minus nobis architecto voluptatum
            accusamus, quisquam voluptate perferendis?
          </p>
          <div className="flex gap-4">
            <div className="join">
              <button className="join-item btn">+</button>
              <button className="bg-white join-item btn btn-disabled">2</button>
              <button className="join-item btn">-</button>
            </div>
            <button onClick={addTocart} className="btn btn-primary self-start">
              Add To Cart
            </button>
          </div>

          <div>
            <div tabIndex={0} className="collapse bg-base-200 collapse-plus">
              <div className="collapse-title  ">Features</div>
              <div className="collapse-content">
                <ul>
                  <li>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quod, saepe?
                  </li>
                  <li>
                    Id tenetur molestiae eaque vel accusantium mollitia saepe
                    corrupti excepturi?
                  </li>
                  <li>
                    Suscipit sint sed praesentium rem animi ea officia omnis
                    debitis!
                  </li>
                  <li>
                    Esse vitae excepturi molestias, aperiam facere reiciendis
                    libero laboriosam dolore.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* <div className="divider"></div> */}

          <div>
            <div tabIndex={0} className="collapse bg-base-200 collapse-plus">
              <div className="collapse-title  ">Descripton</div>
              <div className="collapse-content">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
                  in atque odio suscipit qui non dignissimos sit accusantium, ex
                  quam.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className=" divider text-center divider-primary font-medium text-xl">
          Customer Also Bought{" "}
        </p>
        <div className="flex gap-8 flex-wrap justify-center">
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </div>
  );
};

export default Product;
