import React from 'react';
import guide2 from '../asserts/guide 2.webp'
import guide from '../asserts/guide1.svg'
import guide3 from '../asserts/guide3.webp'
import guide4 from '../asserts/guide4.webp'



const Guide = () => {
  return (
    <div className="min-h-screen py-16 flex flex-col items-center  px-5">
      {/* Page Header */}
      <header className="text-center mb-10 space-y-6">
        <h1 className="text-4xl font-bold ">How to Use the <span className='underline decoration-[#6dfd30] text-[#bd7dff] font-mono'>PassSense</span></h1>
        <p className="text-lg  mt-2">
          Follow the steps below to successfully scan your passport.
        </p>
      </header>

      {/* Instructions Section */}
      <section className="w-full max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Step 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Step 1: Position the Passport</h2>
            <p className="text-gray-600 mb-4">
              Hold your passport flat and place it within the camera viewfinder. Ensure the MRZ code (the two lines of numbers and letters at the bottom) is fully visible.
            </p>
            <div className="w-full h-56 bg-gray-200 flex items-center justify-center rounded-md">
            <img src={guide2} className='h-full w-full' alt="" />
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Step 2: Ensure Good Lighting</h2>
            <p className="text-gray-600 mb-4">
              Make sure you're in a well-lit area to avoid shadows or glare on the MRZ code. Clear lighting helps the scanner read the details accurately.
            </p>
            <div className="w-full h-56 overflow-hidden bg-gray-200 flex items-center justify-center rounded-md">
            <img src={guide} className='h-full w-full overflow-hidden scale-150' alt="" />
           
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Step 3: Scan the MRZ</h2>
            <p className="text-gray-600 mb-4">
              Press the scan button when the MRZ code is clear and aligned. The system will process the information in a few seconds.
            </p>
            <div className="w-full h-56 bg-gray-200 flex items-center justify-center rounded-md">
            <img src={guide3} className='h-full w-full' alt="" />
            
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Step 4: Verify the Information</h2>
            <p className="text-gray-600 mb-4">
              After scanning, verify that the extracted details from the passport (such as name, passport number, and nationality) are correct.
            </p>
            <div className="w-full h-56 bg-gray-200 flex items-center justify-center rounded-md">
            <img src={guide4} className='h-full w-full' alt="" />
           
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="w-full max-w-5xl mt-16 bg-[#ebd9fc] p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-blue-800 mb-6">Tips for Best Results</h2>
        <ul className="list-disc list-inside text-blue-700 space-y-3">
          <li>Hold the passport steady and avoid shaking during the scan.</li>
          <li>Ensure the camera lens is clean and not blocked by your hand or fingers.</li>
          <li>If scanning fails, try adjusting the lighting or moving the passport slightly.</li>
          <li>Use a flat surface if necessary to position the passport correctly.</li>
        </ul>
      </section>
    </div>
  );
};

export default Guide;
