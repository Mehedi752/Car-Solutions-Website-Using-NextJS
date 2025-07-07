import React from 'react'
import bannerImg from '../../../public/banner/5.jpg'

const Banner = () => {
  return (
    <div
      style={{ backgroundImage: `url(${bannerImg.src})` }}
      className='p-[100px] bg-cover bg-center inset-0 bg-black bg-opacity-90 z-50 my-12'
    >
      <div className='flex flex-col justify-center xl:w-[40%] 2xl:w-[30%]'>
        <h3 className="text-white text-6xl font-bold leading-[75px]">
          Affordable Price For Car Servicing
        </h3>
        <p className="text-white text-lg font-normal  capitalize leading-loose">
          There are many variations of passages of available, but the majority
          have suffered alteration in some form
        </p>
        <button className="text-white text-xl font-semibold font-['Inter'] bg-orange-600 rounded-[5px] py-4 mt-6 inline-block w-full text-center">
          Discover More
        </button>
      </div>
    </div>
  )
}

export default Banner
