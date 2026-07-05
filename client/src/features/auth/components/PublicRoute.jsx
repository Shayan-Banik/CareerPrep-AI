import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-200">
        <p className="text-lg text-gray-500">Loading...</p>
      </div>
    );
  }

  // User is already logged in
  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;