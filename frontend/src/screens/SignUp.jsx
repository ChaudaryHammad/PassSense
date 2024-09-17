import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon } from "@heroicons/react/24/outline";
import toast from 'react-hot-toast'
import { backend_url } from "../server";
function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
   setLoading(true)
    try {
        const response = await fetch(`${backend_url}/api/auth/signup`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(signupData),
            }) // Parse the response JSON
            const result = await response.json();
        
            if (response.ok) {
              // Show the success message from the response
              setLoading(false)
              toast.success(result.message || "User Registered successfully");
              setSignupData({
                name: "",
                email: "",
                password: "",
              });
              navigate("/login");
            } else {
              // Show the error message from the response
              toast.error(result.message || "Something went wrong");
            }
          } catch (error) {
            // Catch any network errors and display them
            toast.error(error.message);
          }
        };
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="max-w-[385px]  mx-auto pt-32 content-center  ">
      <div className="card  border bg-base-100 w-96 shadow-xl   pb-6">
        <form onSubmit={handleSubmit}>
          <div className="py-4">
            <h1 className="text-2xl font-bold text-center py-1 text-gray-800">
              SignUp here
            </h1>
            <p className="text-center  font-mono text-gray-600 ">
              Welcome to{" "}
              <span className=" font-bold font-mono underline decoration-[#6dfd30] text-[#bd7dff]">
                PassWiz
              </span>
            </p>
          </div>
          <div className="space-y-4 px-4 dark:text-black">
            <input 
            required
              type="text"
              placeholder="Name"
              name="name"
              className="w-full h-10 border px-2 rounded-full"
              onChange={handleChange}
              value={signupData.name}
            />
            <input
            name="email"
              type="email"
              placeholder="Email"
              className="w-full h-10 border px-2 rounded-full"
              onChange={handleChange}
                value={signupData.email}

            />
            <div className="relative">
              <input
              name="password"
                required
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full text-black h-10 border px-2 rounded-full"
              onChange={handleChange}
              value={signupData.password}

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

            <button disabled={loading} className="mt-4 transition-colors focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-full  h-10 inline-flex items-center justify-center px-6 py-2 border-0 rounded-full hover:bg-transparent hover:border-2 hover:border-[#ff7a4a] text-sm font-medium text-white hover:text-black  hover:dark:text-black bg-[#ff7a4a]">
                {loading ? "Loading..." : "SignUp"}
            </button>

            <p className="text-center text-sm dark:text-gray-600">
              Already have an account?{" "}
              <span className="hover:underline decoration-gray-800 hover:decoration-black hover:dark:text-gray-800">
                <Link to={"/login"}>Login</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
