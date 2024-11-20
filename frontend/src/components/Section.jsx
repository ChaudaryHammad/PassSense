import React from "react";
import sectionGif from "../asserts/section2-gif.mp4";

function Section() {
  return (
    <div>
      <section className="  pb-4 px-4 bg-[#211236] ">
        <div className="flex lg:flex-nowrap flex-wrap gap-6 w-full lg:px-8">
          <div className=" w-full py-16 space-y-6 text-white ">
            <h2 className="font-mono text-[20px]  text-[#6DFD30]">
              Secure | Reliable | User-Friendlly
            </h2>
            <h1 className="   lg:text-[50px] lg:font-[300] lg:leading-[72px]">
              <span className=" underline decoration-[#6dfd30]">Instant </span>
              Reading and Verification of MRZ
            </h1>
            <p className="lg:font-[400] font-thin lg:text-[14px]">
              PassSense MRZ reading technology automatically reads the MRZ
              lines, dividing them into separate fields, and validates MRZs with
              all the data they contain in accordance with ICAO 9303 and ISO
              18013 standards.
            </p>
            <button className="mt-4 transition-colors focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-[180px]  h-10 inline-flex items-center justify-center px-6 py-2 border-0 rounded-full hover:bg-transparent hover:border-2 hover:border-[#ff7a4a] text-sm font-medium text-white bg-[#ff7a4a]">
              Get Started Today
            </button>
          </div>
          <div className=" w-full">
            <video
              src={sectionGif}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto bg-cover object-cover dark:rounded-lg bg-transparent"
            ></video>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Section;
