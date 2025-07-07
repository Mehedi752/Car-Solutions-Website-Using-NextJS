import React from 'react'
import { FaCalendarAlt, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa'

const Contact = () => {
  return (
    <div className='container mx-auto py-12 lg:px-[200px] my-20'>
      <div className='bg-black text-white px-[50px] py-[150px] rounded-lg shadow-lg'>
        <div className='max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6 text-center md:text-left'>
          {/* Opening Hours */}
          <div className='flex items-center gap-4'>
            <FaCalendarAlt className='text-red-500 text-3xl' />
            <div>
              <p className='text-sm text-gray-300'>We are open monday-friday</p>
              <p className='font-semibold text-lg'>7:00 am - 9:00 pm</p>
            </div>
          </div>

          {/* Phone Number */}
          <div className='flex items-center gap-4'>
            <FaPhoneAlt className='text-red-500 text-2xl' />
            <div>
              <p className='text-sm text-gray-300'>Have a question?</p>
              <p className='font-semibold text-lg'>+880 1609 531 117</p>
            </div>
          </div>

          {/* Address */}
          <div className='flex items-center gap-4'>
            <FaMapMarkerAlt className='text-red-500 text-3xl' />
            <div>
              <p className='text-sm text-gray-300'>
                Need a repair? our address
              </p>
              <p className='font-semibold text-lg'>Dhaka, Bangladesh</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
