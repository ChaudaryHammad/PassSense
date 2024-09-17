import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const PrivateRoutes = () => {
  const { user, loading } = useAuth(); // Access user and loading state from AuthContext


  if (loading) {
    // Optionally display a loading indicator while fetching user data
    return <div>Loading...</div>;
  }
  console.log('User state in PrivateRoutes:', user);

  return user ? <Outlet /> : <Navigate to="/login" />;
};
