import { EyeIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login, loading} = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
    
      await login(JSON.stringify(loginData));
      
     
      toast.success("Login successful");
      navigate("/"); // Redirect to home page
      setLoginData({
        email: "",
        password: "",
      });
    } catch (error) {
      
      toast.error(error.message);
    }
  };
  

  return (
    <div className="max-w-[385px]  mx-auto content-center pt-32 ">
      <div className="card  border bg-base-100 w-96 shadow-xl   pb-6">
        <form onSubmit={handleSubmit}>
          <div className="py-4">
            <h1 className="text-2xl font-bold text-center py-1 text-gray-800">
              Login here
            </h1>
            <p className="text-center  font-mono text-gray-600 ">
              Welcome back to{" "}
              <span className=" font-bold font-mono underline decoration-[#6dfd30] text-[#bd7dff]">
                PassSense
              </span>
            </p>
          </div>
          <div className="space-y-4 px-4 ">
            <input
              name="email"
              required
              value={loginData.email}
              onChange={handleChange}
              type="email"
              placeholder="Email"
              className="w-full h-10 border text-black px-2 rounded-full"
            />
            <div className="relative">
              <input
                name="password"
                value={loginData.password}
                onChange={handleChange}
                required
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full text-black h-10 border px-2 rounded-full"
              />

              <button
                type="button"
                className="absolute top-2 right-2"
                onClick={togglePassword}
              >
                {showPassword ? (
                  <EyeIcon className="h-6 w-6 text-gray-500" />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#000"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                )}
              </button>
            </div>

            <Link to="/forget-password" className="text-sm text-gray-400 cursor-pointer underline">
              Forgot your password?
            </Link>

            <button
              disabled={loading}
              className="mt-4 transition-colors focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-full  h-10 inline-flex items-center justify-center px-6 py-2 border-0 rounded-full hover:bg-transparent hover:border-2 hover:border-[#ff7a4a] text-sm font-medium text-white hover:text-black  hover:dark:text-black bg-[#ff7a4a]"
            >
              {loading ? "Loading..." : "Login"}
            </button>

            <p className="text-center text-sm dark:text-gray-600">
              New to PassWiz?{" "}
              <span className="hover:underline decoration-gray-800 hover:decoration-black hover:dark:text-gray-800">
                <Link to={"/signup"}>SignUp</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
