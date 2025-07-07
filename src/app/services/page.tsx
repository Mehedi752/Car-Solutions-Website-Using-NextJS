import dbConnect, { collectionNames } from '@/lib/dbConnect'
import Image from 'next/image'
import React from 'react'
import frameSvg from '../../../public/Frame.svg'
import Link from 'next/link'

const ServicesSection = async () => {
  const serviceCollection = dbConnect(collectionNames.servicesCollection)
  const services = await serviceCollection.find().toArray()
  return (
    <div className='container mx-auto my-12'>
      <div className='text-center text-5xl'>
        <h1 className='text-5xl font-bold'>Our Services</h1>
        <p className='text-lg text-gray-500 mt-4'>
          We provide a wide range of car services to keep your vehicle in top
          condition.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10'>
        {services.map(service => (
          <div key={service.service_id} className='card bg-base-100 shadow-xl'>
            <figure className='rounded-xl'>
              <Image
                src={service.img}
                alt={service.title}
                width={400}
                height={250}
                className='w-full h-64 object-cover p-6 rounded-xl'
              />
            </figure>
            <div className='card-body'>
              <div className='flex justify-between items-center'>
                <div className=''>
                  <h2 className='card-title'>{service.title}</h2>
                  <p className=" text-orange-600 text-xl font-semibold font-['Inter']">
                    Price : $20.00
                  </p>
                </div>
                <Link href={`/services/${service._id}`}>
                  <Image
                    src={frameSvg}
                    alt='Frame'
                    width={12}
                    height={12}
                    className='w-6 h-6'
                  />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ServicesSection
