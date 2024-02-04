import axios from "axios";

import { useState } from "react";
const Signup = () => {
  const [data, setData] = useState({
    email: "kola@gmail.com",
    password: "pass1234",
    name: "hola",
  });
  // const changehandeler=(e)=>{

  // }
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign Up New Account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                className="reg-input"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="userName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              User Name
            </label>
            <div className="mt-2">
              <input
                id="userName"
                name="userName"
                type="text"
                className="reg-input"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="phno"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Phone Number
            </label>
            <div className="mt-2">
              <input
                id="phno"
                name="phno"
                type="number"
                className="reg-input"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Address
            </label>
            <div className="mt-2">
              <input
                id="address"
                name="address"
                type="text"
                className="reg-input"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="zip"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Zip Code
            </label>
            <div className="mt-2">
              <input id="zip" name="zip" type="number" className="reg-input" />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>

            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                className="reg-input"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="cPassword"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Confirm Password
            </label>

            <div className="mt-2">
              <input
                id="cPassword"
                name="cPassword"
                type="password"
                className="reg-input"
              />
            </div>
          </div>

          <div>
            <button
              onClick={async (e) => {
                e.preventDefault();
                console.log("hdgf");
                const instance = axios.create({
                  withCredentials: true,
                  headers: { authorization: "Bearer" },
                });
                const res = await instance.post("/register", {
                  ...data,
                });
                console.log(res);
              }}
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
