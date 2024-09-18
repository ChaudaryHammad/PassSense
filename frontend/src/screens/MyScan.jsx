
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast"; // For toast notifications
import UpdateModal from "../components/UpdateModal";
import { backend_url } from "../server";

const MyScan = () => {
  const [passports, setPassports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPassport, setSelectedPassport] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchPassports = async () => {
      try {
        const response = await axios.get(`${backend_url}/api/passport/user-passports`,{
            withCredentials: true});
        if (response.data.success) {
          setPassports(response.data.passports);
        } else {
          toast.error("Failed to fetch passports");
        }
      } catch (err) {
        toast.error("An error occurred while fetching passports");
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPassports();
  }, []);

  const handleDelete = async (passportId) => {
    try {
      await axios.post(`${backend_url}/api/passport/delete/${passportId}`);
      setPassports(passports.filter(passport => passport._id !== passportId));
      toast.success("Passport deleted successfully");
    } catch (err) {
      toast.error("Failed to delete passport");
    }
  };

  const handleUpdate = (passport) => {
    setSelectedPassport(passport);
    setShowModal(true);
  };

  if (loading) {
    return (
    <div className="flex justify-center items-center h-[80vh] w-full">
        <div className="loading  loading-ring  loading-lg">Loading...</div>
    </div>
    )  
}

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">My Passports</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {passports.map((passport) => (
          <div key={passport._id} className="card bg-white dark:text-black  shadow-md rounded-lg p-4 border border-gray-200">
            <h2 className="text-xl font-semibold">{passport.givenName} {passport.surName}</h2>
            <p><strong>Passport Number:</strong> {passport.passportNumber}</p>
            <p><strong>Nationality:</strong> {passport.nationality}</p>
            <p><strong>Date of Birth:</strong> {passport.dob}</p>
            <p><strong>Sex:</strong> {passport.sex}</p>
            <p><strong>Personal Number:</strong> {passport.personalNumber}</p>
            <p><strong>Expiration Date:</strong> {passport.expirationDate}</p>
            <div className="mt-4">
              <button onClick={() => handleUpdate(passport)} className="btn btn-success text-white mr-2">Update</button>
              <button onClick={() => handleDelete(passport._id)} className="btn  btn-error text-white">Delete</button>
            </div>
          </div>
        ))}
      </div>
      {showModal && selectedPassport && (
        <UpdateModal
          passport={selectedPassport}
          onClose={() => setShowModal(false)}
          onUpdate={(updatedPassport) => {
            setPassports(passports.map(passport => passport._id === updatedPassport._id ? updatedPassport : passport));
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default MyScan;
