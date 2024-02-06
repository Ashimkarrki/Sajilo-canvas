// import { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/registration/Login";
import Signup from "./pages/registration/Signup";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { populateCart } from "./redux/cartSlice";
function App() {
  const dispatch = useDispatch();
  const fetchUserInfo = async () => {
    const instance = axios.create({
      withCredentials: true,
      headers: { authorization: "Bearer" },
    });
    try {
      const cartRes = await instance.get("/cart");
      dispatch(populateCart(cartRes.data.carts.products));
      return cartRes.data.carts.products;
    } catch (err) {
      // console.log(err);
    }
  };
  useQuery({ queryKey: ["cart"], queryFn: fetchUserInfo });

  console.log("xalyo");
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/shop/:page/:sort/:cat/:min/:max" element={<Shop />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
