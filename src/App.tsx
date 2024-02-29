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
import AdminNavbar from "./components/AdminNavbar";
import AllProducts from "./pages/adminDashboard/AllProducts";
import { useSelector } from "react-redux";
import { populateUserInfo } from "./redux/userSlice";
import AdminProtected from "./components/AdminProtected";
import UserProtected from "./components/UserProtected";
import { Toaster } from "react-hot-toast";

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const fetchUserInfo = async () => {
    const instance = axios.create({
      withCredentials: true,
      headers: { authorization: "Bearer" },
    });
    try {
      const meRes = await instance.get("/me");
      dispatch(populateUserInfo(meRes.data));
      const cartRes = await instance.get("/cart");
      dispatch(populateCart(cartRes.data.carts.products));
      return cartRes.data.carts.products;
    } catch (err) {
      return err;
    }
  };
  const { isLoading } = useQuery({
    queryKey: ["UserInfo"],
    queryFn: fetchUserInfo,
  });
  console.log(user);
  if (isLoading) {
    return <span className="loading loading-infinity loading-xs"></span>;
  }
  return (
    <div>
      <Toaster />
      {user.role === "admin" ? (
        <AdminNavbar />
      ) : user.role === "Designer" ? (
        ""
      ) : (
        <Navbar />
      )}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/shop/:page/:sort/:cat/:min/:max" element={<Shop />} />
        <Route path="/product/:id" element={<Product />} />
        <Route element={<UserProtected />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
        <Route element={<AdminProtected />}>
          <Route path="/admin/allproducts" element={<AllProducts />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
