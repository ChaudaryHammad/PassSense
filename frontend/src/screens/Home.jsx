import React from 'react'
import banner from '../asserts/banner.webp'
import overlay from "../asserts/banner-overlay.webp"
import sectionGif from "../asserts/section-gif.mp4"
import Section from '../components/Section'
import Footer from '../components/Footer'


function Home() {
  return (
    <div className='lg:py-16'>
      <div className=' flex justify-center md:flex-row flex-col '>
        <div className=' w-full bg-[#211236]  px-4  '>
          <div className='lg:w-[600px] h-full lg:px-8  py-12 flex flex-col gap-2'>
            <h2 className='font-mono text-[24px]  text-[#6DFD30]'>MRZ Reading</h2>
            <h1 className='text-[28px]  font-bold lg:text-[50px] lg:font-[300] lg:leading-[72px] text-white'>Identity Verification with MRZ Reading</h1>
            <p className='text-white lg:font-[400] font-thin lg:text-[14px]'>Add Regula MRZ scanning to your mobile, web, and desktop applications and speed up encoded data reading and verification. Regula MRZ scanning technology employs over 200 parsers for various MRZ codes used in TD1, TD2 or TD3.</p>

       
<button className="mt-4 transition-colors focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-[120px]  h-10 inline-flex items-center justify-center px-6 py-2 border-0 rounded-full hover:bg-transparent hover:border-2 hover:border-[#ff7a4a] text-sm font-medium text-white bg-[#ff7a4a]">
  Try it
</button>


          </div>


        </div>

        <div className=' w-full  hidden md:block '>
          <div className='relative overflow-hidden '>
            <img src={banner} alt="" className='w-full h-[70vh] object-cover  transform scale-110 transition-transform duration-300 ease-in-out' />
            <img src={overlay} alt=""  className='absolute top-0 left-0 h-full w-full z-10'/>
          </div>
          </div>
      </div>

      <section className='lg:py-16 pb-4 px-4 '>
      <div className='lg:px-32 pb-8'>
      <h1 className='lg:text-[60px] text-[24px]  lg:font-light font-bold'>Detect ID Forgery by Scanning <span className='underline decoration-[#6dfd30]'>MRZ Data</span></h1>
      </div>



<div className='flex lg:flex-nowrap flex-wrap gap-6 w-full lg:px-32'>

  <div className=' w-full space-y-4'>
<h1 className=' text-[24px]  lg:text-[46px]'>Speed Up MRZ Scanning and Verification</h1>
<p>Regula MRZ reading ensures that all the information is relevant and valid, the issuing country or nationality codes are real, and proves the authenticity of a document. Such scrupulous checks allow you to easily spot fake IDs and fight fraud at early stages, as even the most sophisticated fakes are often made with errors that Regula can detect.</p>
<p>MRZ checks are applicable not only while crossing borders: they are indispensable in case of remote onboarding, in KYC scenarios, and for fraud prevention purposes. However, MRZ data is only trustworthy when verified, not just extracted.</p>

  </div>
  <div className=' w-full'>
<video src={sectionGif} 
 autoPlay
 loop
 muted
 playsInline
 className="w-full h-auto bg-cover object-cover dark:rounded-lg bg-transparent"
></video>
  </div>
</div>


      </section>
<main className='max-w-[1100px] mx-auto text-center py-16  lg:mb-8'>
  <h1 className='text-[28px] lg:text-[50px]'>Get more info about Regula MRZ reading
  </h1>
  <button className="mt-4 transition-colors focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-[140px]  h-10 inline-flex items-center justify-center px-6 py-2 border-0 rounded-full hover:bg-transparent hover:border-2 hover:border-[#ff7a4a] text-sm font-medium text-white hover:text-black dark:hover:text-white bg-[#ff7a4a]">
  Learn More 
</button>
</main>
      <Section/>

      <Footer/>
    </div>
  )
}

export default Home