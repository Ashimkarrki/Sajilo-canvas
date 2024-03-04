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
import Hireus from "./pages/Hireus";
import UserRequests from "./pages/adminDashboard/UserRequests";
import DesignerProtected from "./components/DesignerProtected";
import Requests from "./pages/designerDashboard/Requests";
import DesignerRequests from "./pages/adminDashboard/DesignerRequests";
import MySubmissions from "./pages/MySubmissions";
import MyOrders from "./pages/MyOrders";
import NVOrderders from "./pages/NVOrderders";
import Verified from "./pages/Verified";
import OnDelivery from "./pages/OnDelivery";
import Delivered from "./pages/Delivered";
import NonUserNavbar from "./components/NonUserNavbar";

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
  const { isLoading, refetch } = useQuery({
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
      ) : user.role === "user" || user.role === "User" ? (
        <Navbar />
      ) : user.role != "Designer" ? (
        <NonUserNavbar />
      ) : (
        ""
      )}
      <Routes>
        <Route path="/login" element={<Login refetch={refetch} />} />
        <Route path="/" element={<Home />} />

        <Route path="/signup" element={<Signup refetch={refetch} />} />
        <Route path="/shop/:page/:sort/:cat/:min/:max" element={<Shop />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/hireus" element={<Hireus />} />
        <Route element={<UserProtected />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/my-sub" element={<MySubmissions />} />
          <Route path="/my-ord" element={<MyOrders />} />
        </Route>
        <Route element={<AdminProtected />}>
          <Route path="/admin/allproducts" element={<AllProducts />} />
          <Route path="/admin/user-req" element={<UserRequests />} />
          <Route path="/admin/des-req" element={<DesignerRequests />} />
          <Route path="/admin/nvo" element={<NVOrderders />} />
          <Route path="/admin/vo" element={<Verified />} />
          <Route path="/admin/ding" element={<OnDelivery />} />
          <Route path="/admin/ded" element={<Delivered />} />
        </Route>
        <Route element={<DesignerProtected />}>
          <Route path="/designer" element={<Requests />}></Route>
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
