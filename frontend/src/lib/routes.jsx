import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./authContext";

export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return <h1>Cargando...</h1>;
  if (!isAuthenticated && !loading)
    return <Navigate to="/login" state={{ from: location }} replace />;
  return <Outlet />;
};
