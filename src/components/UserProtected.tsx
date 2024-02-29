import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const UserProtected = () => {
  const user = useSelector((state) => state.user);
  if (user.role !== "user") {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default UserProtected;
