import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, token }) {
  const isAuthenticated = token;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
