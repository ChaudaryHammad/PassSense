import React from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function ForgetPassword() {
  const { forget, loading } = useAuth();
  const [resetPassword, setResetPassword] = useState({ email: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResetPassword({
      ...resetPassword,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forget(JSON.stringify(resetPassword)); // Call forget function
      setResetPassword({ email: "" }); // Reset the form after success
    } catch (error) {
      toast.error(error.message); // Display error message if any
    }
  };

  return (
    <div className="">
      <div className="max-w-[385px] mx-auto content-center pt-32">
        <div className="card border bg-base-100 w-96 shadow-xl pb-6">
          <form onSubmit={handleSubmit}>
            <div className="py-4">
              <h1 className="text-2xl font-bold text-center py-1 text-gray-800">
                Reset your password
              </h1>
              <p className="text-center font-mono text-gray-600">
                <Link to="/" className="font-bold font-mono underline decoration-[#6dfd30] text-[#bd7dff]">
                  PassWiz
                </Link>
              </p>
            </div>
            <div className="space-y-4 px-4">
              <input
                name="email"
                required
                value={resetPassword.email}
                onChange={handleChange}
                type="email"
                placeholder="Email"
                className="w-full h-10 border text-black px-2 rounded-full"
              />
              <button
                disabled={loading}
                className="mt-4 transition-colors focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-full h-10 inline-flex items-center justify-center px-6 py-2 border-0 rounded-full hover:bg-transparent hover:border-2 hover:border-[#ff7a4a] text-sm font-medium text-white hover:text-black hover:dark:text-black bg-[#ff7a4a]"
              >
                {loading ? "Generating..." : "Get link"}
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
    </div>
  );
}

export default ForgetPassword;
