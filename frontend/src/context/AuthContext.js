import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { backend_url } from '../server';
import toast from "react-hot-toast";

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider Component to wrap the application
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Start with loading as true
  const [error, setError] = useState(null);

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
      setError(error.response?.data?.message || "Login failed");
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
      setError(error.response?.data?.message || "Logout failed");
      throw new Error(error.response?.data?.message || "Logout failed");
    }
  };



  // Function to handle OTP verification
  const verifyOtp = async (otp) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${backend_url}/api/auth/verify-email`,
        { otp },
        { withCredentials: true }
      );
      const updatedUser = res.data.user;

      // Update user in state and local storage after verification
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      setError(error.response?.data?.message || "OTP verification failed");
      throw new Error(error.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
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


  // Function to handle forgot password
const forget = async (data) => {
  setLoading(true);
  try {
    const res = await axios.post(
      `${backend_url}/api/auth/forget-password`,
      JSON.parse(data),
      { withCredentials: true }
    );

    if(res.data.success){
      toast.success(res.data.message)
    
    }
  } catch (error) {
    setError(error.response?.data?.message || "Failed to send reset link");
    toast.error(error.response?.data?.message || "Failed to send reset link");
  } finally {
    setLoading(false);
  }
};

const reset = async(token,password)=>{
  setLoading(true);
  try {
    const res = await axios.post(
      `${backend_url}/api/auth/reset-password/${token}`,
      {password},
      { withCredentials: true }
    );
    if(res.data.success){
      toast.success(res.data.message)
    
    }
  } catch (error) {
    setError(error.response?.data?.message || "Failed to reset password");
    toast.error(error.response?.data?.message || "Failed to reset password");
  } finally {
    setLoading(false);
  }
}


  return (
    <AuthContext.Provider value={{ user, login, logout, verifyOtp, loading, error,forget,reset }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
