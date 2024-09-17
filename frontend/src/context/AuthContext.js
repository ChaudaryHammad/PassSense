import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import {backend_url} from '../server'
// Create the AuthContext
const AuthContext = createContext();

// AuthProvider Component to wrap the application
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Start with loading as true

  // Function to handle login
  const login = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${backend_url}/api/auth/login`,
        JSON.parse(data),
        { withCredentials: true }
      );
      const userData = res.data.user;
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      // Throw error with a specific message to be caught in handleSubmit
      throw new Error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle logout
  const logout = async () => {
    try {
      await axios.post(
        `${backend_url}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      setUser(null);
      localStorage.removeItem("user"); // Remove user data from localStorage
    } catch (error) {
      throw new Error(error.response?.data?.message || "Logout failed");
    }
  };

  // Fetch the authenticated user when the app loads
  const fetchUser = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);

        setUser(userData);
      } catch (error) {
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setLoading(false); // Ensure loading is set to false after operation
  };

  useEffect(() => {
    fetchUser(); // Call fetchUser to initialize state
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
