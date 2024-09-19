import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast"; // For toast notifications
import UpdateModal from "../components/UpdateModal";
import { backend_url } from "../server";
import { formatDate } from './../lib/formatDate';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const MyScan = () => {
  const [passports, setPassports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPassport, setSelectedPassport] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.isVerified) {
      return navigate("/");
    }

    const fetchPassports = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${backend_url}/api/passport/user-passports`, {
          withCredentials: true,
        });

        if (response.data.success) {
          setPassports(response.data.passports);
        } else {
          toast.error("Failed to fetch passports");
        }
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setPassports([]);
        } else {
          toast.error("An error occurred while fetching passports");
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPassports();
  }, [user, navigate]);

  const handleDelete = async (passportId) => {
    try {
      await axios.delete(`${backend_url}/api/passport/delete/${passportId}`, {
        withCredentials: true
      });
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

  const generatePDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Given Name", "Surname", "Passport Number", "Nationality", "Date of Birth", "Sex", "Citizenship Number", "Expiration Date"];
    const tableRows = passports.map(passport => [
      passport.givenName,
      passport.surName,
      passport.passportNumber,
      passport.nationality,
      formatDate(passport.dob),
      passport.sex,
      passport.personalNumber,
      formatDate(passport.expirationDate)
    ]);

    doc.autoTable(tableColumn, tableRows, { startY: 10 });
    doc.text("Passports Information", 14, 10);
    doc.save("passports_information.pdf");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh] w-full">
        <div className="loading  loading-ring  loading-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-5">
      {passports.length === 0 ? (
        <div className="text-xl font-bold flex h-[70vh] w-full justify-center items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-32">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z" />
          </svg>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold mb-4">My Passports</h1>
            <button
              onClick={generatePDF}
              className="cursor-pointer bg-white text-black relative inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#F5F5F5] hover:text-[#FACC14] h-9 mr-2 px-3"
            >
              <svg
                class="lucide lucide-sticky-note text-yellow-400 dark:text-yellow-600"
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="2"
                stroke="#FACC14"
                fill="none"
                viewBox="0 0 24 24"
                height="22"
                width="22"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z"
                ></path>
                <path d="M15 3v6h6"></path>
              </svg>
              Pdf
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {passports.map((passport) => (
              <div
                key={passport._id}
                className="m-2 group px-10 py-5 bg-white/10 rounded-lg leading-8 relative after:absolute after:h-full after:bg-[#dab5ff] shadow-lg after:-z-20 after:w-full after:inset-0 after:rounded-lg transition-all duration-300 hover:transition-all hover:duration-300 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden cursor-pointer after:-translate-y-full after:hover:translate-y-0 [&_p]:delay-200 [&_p]:transition-all"
              >
                <p className="cardtxt font-semibold text-gray-300 tracking-wider group-hover:text-gray-700 text-xl">
                  {passport.givenName} {passport.surName}
                </p>
                <p><strong>Passport Number:</strong> {passport.passportNumber}</p>
                <p><strong>Nationality:</strong> {passport.nationality}</p>
                <p><strong>Date of Birth:</strong> {formatDate(passport.dob)}</p>
                <p><strong>Sex:</strong> {passport.sex}</p>
                <p><strong>Citizenship Number:</strong> <span>{passport.personalNumber}</span></p>
                <p><strong>Expiration Date:</strong> {formatDate(passport.expirationDate)}</p>
                <div className="ordernow flex flex-row justify-between items-center w-full">
                  <button
                    onClick={() => handleDelete(passport._id)}
                    className="ordernow-text group-hover:bg-red-500 group-hover:text-white dark:bg-gray-200/10 bg-gray-200 text-rose-600 text-sm py-2 px-4 butn rounded-full font-bold"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleUpdate(passport)}
                    className="btun4 lg:inline-flex items-center gap-3 group-hover:bg-white/10 bg-[#abd373] shadow-[10px_10px_150px_#ff9f0d] cursor-pointer py-2 px-4 text-sm font-semibold rounded-full butn"
                  >
                    Update
                  </button >
                </div>
              </div>
            ))}
          </div>
        </>
      )}

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
