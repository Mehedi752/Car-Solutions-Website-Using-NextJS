"use client"
import { FaArrowRight } from 'react-icons/fa'
import React, { useState } from 'react'

const serviceOptions = [
  'Full Car Repair',
  'Engine Repair',
  'Automatic Services',
  'Engine Oil Change',
  'Battery Charge'
]

const ServicesTag = () => {
 const [selectedIndex, setSelectedIndex] = useState(0)
  return (
    <div className='p-10 bg-zinc-100 rounded-[10px]'>
      <h1 className='text-neutral-900 text-2xl font-bold font-[Inter]'>
        Services
      </h1>
      <div>
        {serviceOptions.map((item, index) => {
          const isActive = index === selectedIndex

          return (
            <div
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`w-full h-12 rounded-[5px] flex items-center justify-between p-5 mt-4 cursor-pointer transition-all duration-300 
              ${
                isActive ? 'bg-orange-600' : 'bg-white'
              }`}
            >
              <p
                className={`text-base font-semibold font-[Inter] 
                ${isActive ? 'text-white' : 'text-black'}`}
              >
                {item}
              </p>
              <FaArrowRight
                className={`${isActive ? 'text-white' : 'text-orange-600'}`}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ServicesTag
