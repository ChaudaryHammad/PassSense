import React, { useState, useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { toast } from "react-hot-toast"; // For toast notifications
import { backend_url } from "../server";
import { formatDate } from "../lib/formatDate";

function MainComp() {
  const [passportDetails, setPassportDetails] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const cropperRef = useRef(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("No file selected!");
    }
  };

  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      setLoading(true);
      toast.loading("Processing image...");
      const croppedImage = cropper.getCroppedCanvas().toDataURL();
      parseMrz(croppedImage);
    } else {
      toast.error("Cropper is not ready yet!");
    }
  };

  const parseMrz = (croppedImage) => {
    let worker = initWorker();
    worker.postMessage({
      cmd: "process",
      image: croppedImage,
    });

    worker.onmessage = function (e) {
      const data = e.data;

      if (data.type === "result") {
        if (data.result && data.result.parsed && data.result.parsed.fields) {
          const fields = data.result.parsed.fields;

          // Extract the specific fields
          const {
            firstName: givenName,
            lastName: surName,
            documentNumber: passportNumber,
            nationality,
            birthDate: dob,
            sex,
            personalNumber,
            expirationDate,
          } = fields;

          toast.dismiss();
          toast.success("Scan successful!");

          // Update the state with the extracted fields
          setPassportDetails((prevList) => [
            ...prevList,
            {
              givenName,
              surName,
              passportNumber,
              nationality,
              dob,
              sex,
              personalNumber,
              expirationDate,
            },
          ]);
        } else {
          toast.dismiss();
          toast.error("Please try to crop only the Passport area!");
        }
        setLoading(false);
      } else if (data.type === "error") {
        toast.dismiss();
        toast.error("Failed to scan Passport or unrecognized format!");
        setLoading(false);
      }
    };

    worker.onerror = function (err) {
      setLoading(false);
      setError("Something went wrong");
      toast.error("Something went wrong");
    };
  };

  const handleAddDetails = async () => {
    if (!passportDetails.length) {
      toast.error("No passport details available to send!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${backend_url}/api/passport/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // / Assuming token stored in localStorage
        },
        credentials: "include",
        body: JSON.stringify({
          ...passportDetails[passportDetails.length - 1], // Send the latest scanned passport details
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Passport details added successfully!");
      } else {
        toast.error(data.message || "Failed to add passport details!");
      }
    } catch (error) {
      toast.error("An error occurred while sending data to the backend!");
      console.error("Error sending passport details:", error);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to format birth date in DD-MM-YYYY

  return (
    <div className="p-5 flex flex-col items-center space-y-4">
      <input
        type="file"
        id="photo"
        className="file-input file-input-bordered w-full max-w-xs"
        onChange={handleFileChange}
      />

      {image && (
        <div className="flex flex-col items-center w-full max-w-screen-sm">
          <Cropper
            src={image}
            ref={cropperRef}
            style={{ height: "auto", width: "100%", maxHeight: "400px" }}
            zoomTo={0.5}
            initialAspectRatio={1}
            preview=".img-preview"
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
            guides={true}
          />
          <button
            className={`btn btn-neutral dark:btn-neutral btn-outline mt-3 ${
              loading ? "loading" : ""
            }`}
            onClick={handleCrop}
            disabled={loading}
          >
            {loading ? "Processing..." : "Scan Passport"}
          </button>
        </div>
      )}
      {error && <div className="text-center text-red-500">{error}</div>}

      {passportDetails && passportDetails.length > 0 ? (
        <div className="mt-6 dark:text-black  w-full max-w-screen-sm lg:max-w-screen-lg">
          <h2 className="text-xl font-semibold dark:text-white ">
            Passport Details
          </h2>
          <div className="overflow-x-auto">
            <table className="table border table-zebra" cellPadding="10">
              <thead>
                <tr className="dark:text-white text-black">
                  <th>Date of Birth</th>
                  <th>Nationality</th>
                  <th>Passport No</th>
                  <th>Surname</th>
                  <th>Given Name</th>
                  <th>Sex</th>
                  <th>Expiration Date</th>
                  <th>Personal Number</th>
                </tr>
              </thead>
              <tbody>
                {passportDetails.map((data, index) => (
                  <tr className="bg-base-200" key={index}>
                    <td>{formatDate(data.dob || "N/A")}</td>
                    <td>{data.nationality || "N/A"}</td>
                    <td>{data.passportNumber || "N/A"}</td>
                    <td>{data.surName || "N/A"}</td>
                    <td>{data.givenName || "N/A"}</td>
                    <td>{data.sex || "N/A"}</td>
                    <td>{data.expirationDate || "N/A"}</td>
                    <td>{data.personalNumber || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className={`btn btn-neutral dark:btn-neutral btn-outline mt-4 ${
                loading ? "loading" : ""
              }`}
              onClick={handleAddDetails}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 mt-4">Please upload an image.</p>
      )}
    </div>
  );
}

function initWorker() {
  var blob = new Blob(
    [window.source_worker.toString().replace(/^function .+\{?|\}$/g, "")],
    { type: "text/javascript" }
  );

  var objectURL = URL.createObjectURL(blob);
  var worker = new Worker(objectURL);

  worker.addEventListener("message", function (e) {
    var data = e.data;
    if (data.type === "result") {
      // Handle worker result
    }
  });

  return worker;
}

export default MainComp;
