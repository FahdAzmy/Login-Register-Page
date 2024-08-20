import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { user } from "./Context/Context";

export default function RequireAuth() {
  const User = useContext(user);
  const location = useLocation();
  return User.auth.userData ? (
    <Outlet />
  ) : (
    <Navigate state={{ from: location }} replace to="/login" />
  );
}
