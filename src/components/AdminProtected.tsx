import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
const AdminProtected = () => {
  const user = useSelector((state) => state.user);
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default AdminProtected;
