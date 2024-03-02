import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const DesignerProtected = () => {
  const user = useSelector((state) => state.user);
  if (user.role !== "Designer") {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default DesignerProtected;
