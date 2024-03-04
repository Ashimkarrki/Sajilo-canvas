import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setRole } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
const Login = ({ refetch }) => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
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
      setIsLoading(false);
      const res = await instance.post("/login", {
        ...data,
      });
      refetch();
      console.log(res.data.user.name);
      if (res.data.user.name === "admin") {
        dispatch(setRole("admin"));
        navigate("/admin/allproducts");
      } else if (res.data.user.name.includes("Designer")) {
        dispatch(setRole("Designer"));

        navigate("/designer");
      } else {
        dispatch(setRole("user"));

        navigate("/");
      }
      toast.success("Welcome Back");
      setIsLoading(true);
    } catch (err) {
      setIsLoading(true);
      toast.error("Something Went Wrong");
      console.error("Registration failed:", err);
    }
  };
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
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
                autoComplete="email"
                className="reg-input"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                onChange={handleChange}
                autoComplete="current-password"
                className="reg-input"
              />
            </div>
          </div>

          <div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
