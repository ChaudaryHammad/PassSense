import React, { useState, useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { toast } from "react-hot-toast"; // For toast notifications
import { Document, Packer, Paragraph, Table, TableCell, TableRow } from 'docx';
import { saveAs } from 'file-saver';

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
          toast.dismiss();
          toast.success("Scan successful!");
          // Set the state only if data is valid
          setPassportDetails((prevList) => [...prevList, data.result.parsed.fields]);
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
      setError('Something went wrong');
     
      toast.error('Something went wrong');
    };
  };


    // Helper function to format birth date in DD-MM-YYYY
    const formatDate = (birthDate) => {
      if (birthDate.length !== 6) {
        return 'Invalid date';
      }
  
      const year = parseInt(birthDate.substring(0, 2), 10);
      const month = parseInt(birthDate.substring(2, 4), 10);
      const day = parseInt(birthDate.substring(4, 6), 10);
  
      const currentYear = new Date().getFullYear() % 100;
      const fullYear = year > currentYear ? 1900 + year : 2000 + year;
  
      return `${day}-${month}-${fullYear}`;
    };
  
    // Function to generate and download the DOCX file
    const generateWordDocument = () => {
      if (!passportDetails.length) return;
  
      const rows = passportDetails.map((data) => {
        return new TableRow({
          children: [
            new TableCell({ children: [new Paragraph(formatDate(data.birthDate || 'N/A'))] }),
            new TableCell({ children: [new Paragraph(data.nationality || 'N/A')] }),
            new TableCell({ children: [new Paragraph(data.documentNumber || 'N/A')] }),
            new TableCell({ children: [new Paragraph(data.lastName || 'N/A')] }),
            new TableCell({ children: [new Paragraph(data.firstName || 'N/A')] }),
            new TableCell({ children: [new Paragraph(data.sex || 'N/A')] }),
            new TableCell({ children: [new Paragraph(data.expirationDate || 'N/A')] }),
            new TableCell({ children: [new Paragraph(data.personalNumber || 'N/A')] }),
          ],
        });
      });
  
      const doc = new Document({
        sections: [
          {
            children: [
              new Paragraph({
                text: 'Passport Details ',
                bold: true,
                alignment: 'center',
              }),
              new Table({
                rows: [
                  new TableRow({
                    children: [
                      new TableCell({ children: [new Paragraph('Date of Birth')] }),
                      new TableCell({ children: [new Paragraph('Nationality')] }),
                      new TableCell({ children: [new Paragraph('Passport No')] }),
                      new TableCell({ children: [new Paragraph('Surname')] }),
                      new TableCell({ children: [new Paragraph('Given Name')] }),
                      new TableCell({ children: [new Paragraph('Sex')] }),
                      new TableCell({ children: [new Paragraph('Expiration Date')] }),
                      new TableCell({ children: [new Paragraph('Personal Number')] }),
                    ],
                  }),
                  ...rows,
                ],
              }),
            ],
          },
        ],
      });
  
      Packer.toBlob(doc).then((blob) => {
        saveAs(blob, 'passportData.docx');
        toast.success('Word file downloaded successfully!');
      });
    };
  
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
            className={`btn btn-neutral btn-outline mt-3 ${loading ? "loading" : ""}`}
            onClick={handleCrop}
            disabled={loading}
          >
            {loading ? "Processing..." : "Scan Passport"}
          </button>
        </div>
      )}
      {error && <div className="text-center text-red-500">{error}</div>}

{passportDetails && passportDetails.length > 0 ? (
  <div className="mt-6 w-full max-w-screen-sm lg:max-w-screen-lg">
    <h2 className="text-xl font-semibold">Passport Details</h2>
    <div className="overflow-x-auto">
      <table className="table border table-zebra" cellPadding="10">
        <thead>
          <tr>
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
              <td>{formatDate(data.birthDate || 'N/A')}</td>
              <td>{data.nationality || 'N/A'}</td>
              <td>{data.documentNumber || 'N/A'}</td>
              <td>{data.lastName || 'N/A'}</td>
              <td>{data.firstName || 'N/A'}</td>
              <td>{data.sex || 'N/A'}</td>
              <td>{data.expirationDate || 'N/A'}</td>
              <td>{data.personalNumber || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="w-full lg:max-w-[1100px] mx-auto flex justify-end py-2">
      <button className="btn btn-neutral btn-outline" onClick={generateWordDocument}>Download Word File</button>
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
