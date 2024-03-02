import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({ refetch }) => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const instance = axios.create({
        withCredentials: true,
        headers: { authorization: "Bearer" },
      });

      const res = await instance.post("/register", {
        ...data,
      });
      refetch();
      navigate("/");

      console.log("Registration successful:", res.data);
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
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
                value={data.email}
                onChange={handleChange}
                required
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
                name="name"
                type="text"
                className="reg-input"
                value={data.name}
                required
                onChange={handleChange}
              />
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
                value={data.password}
                required
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <button
              onClick={handleSubmit}
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
