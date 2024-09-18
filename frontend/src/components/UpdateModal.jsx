import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { backend_url } from "../server";
const UpdateModal = ({ passport, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({ ...passport });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${backend_url}/api/passport/update/${passport._id}`, formData,{
            withCredentials: true
      });
      if (response.data.success) {
        onUpdate(response.data.passport);
        onClose();
      } else {
        toast.error("Failed to update passport");
      }
    } catch (err) {
      toast.error("An error occurred while updating passport");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white dark:text-black p-6 rounded-lg shadow-lg w-full max-w-md absolute top-32 z-[9999] h-[70vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Update Passport</h2>
        <form onSubmit={handleSubmit}>
          {/* Render form fields based on passport data */}
          <label className="block mb-2">
            Given Name:
            <input
              type="text"
              name="givenName"
              value={formData.givenName || ''}
              onChange={handleChange}
              className="form-input mt-1 block w-full border p-2"
            />
          </label>
          <label className="block mb-2">
            Surname:
            <input
              type="text"
              name="surName"
              value={formData.surName || ''}
              onChange={handleChange}
              className="form-input mt-1 block w-full border p-2"
            />
          </label>
          <label className="block mb-2">
            Passport Number:
            <input
              type="text"
              name="passportNumber"
              value={formData.passportNumber || ''}
              onChange={handleChange}
              className="form-input mt-1 block w-full border p-2"
            />
          </label>
          <label className="block mb-2">
            Nationality:
            <input
              type="text"
              name="nationality"
              value={formData.nationality || ''}
              onChange={handleChange}
              className="form-input mt-1 block w-full border p-2"
            />
          </label>
          <label className="block mb-2">
            Date of Birth:
            <input
              type="text"
              name="dob"
              value={formData.dob || ''}
              onChange={handleChange}
              className="form-input mt-1 block w-full border p-2"
            />
          </label>
          <label className="block mb-2">
            Sex:
            <input
              type="text"
              name="sex"
              value={formData.sex || ''}
              onChange={handleChange}
              className="form-input mt-1 block w-full border p-2"
            />
          </label>
          <label className="block mb-2">
            Personal Number:
            <input
              type="text"
              name="personalNumber"
              value={formData.personalNumber || ''}
              onChange={handleChange}
              className="form-input mt-1 block w-full border p-2"
            />
          </label>
          <label className="block mb-2">
            Expiration Date:
            <input
              type="text"
              name="expirationDate"
              value={formData.expirationDate || ''}
              onChange={handleChange}
              className="form-input mt-1 block w-full border p-2"
            />
          </label>
          <div className="mt-4 flex justify-end">
            <button type="button" onClick={onClose} className="btn btn-neutral btn-outline mr-2">Cancel</button>
            <button type="submit" className={`btn btn-neutral ${loading ? "loading" : ""}`}>
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
