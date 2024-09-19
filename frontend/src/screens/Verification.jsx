import React, { useState } from "react";
import { useAuth } from "../context/AuthContext"; // Import AuthContext to use verifyOtp
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Verification = () => {
  const { user, verifyOtp, loading, error } = useAuth();
  const [otp, setOtp] = useState("");
  const [localError, setLocalError] = useState(null);
const navigate = useNavigate()
  const handleChange = (e) => {
    if (e.target.value.length <= 6) {
      setOtp(e.target.value);
    }
  };

  const handleSubmit = async () => {
    if (otp.length !== 6) {
      setLocalError("OTP must be 6 digits.");
      return;
    }

    try {
      setLocalError(null); // Clear any previous local errors
      await verifyOtp(otp); // Call the OTP verification function
      toast.success("Login successful");
      navigate("/"); // Redirect to home page

    } catch (err) {
      setLocalError(err.message); // Display backend error if OTP is incorrect
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      {user?.isVerified === false && (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-xl font-bold text-center text-gray-800 mb-4">OTP Verification</h2>
          <p className="text-center text-gray-600 mb-6">
            Please enter the 6-digit OTP sent to your email.
          </p>
          
          <input
            type="text"
            value={otp}
            onChange={handleChange}
            maxLength="6"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-300 mb-4 text-center text-lg"
            placeholder="Enter OTP"
          />
          
          {(localError || error) && (
            <p className="text-red-500 text-center mb-4">
              {localError || error}
            </p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading || otp.length !== 6}
            className={`w-full p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Verification;
