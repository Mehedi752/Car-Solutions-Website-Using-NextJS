import React from 'react'
import Banner from '../components/DetailsBanner'
import Image from 'next/image'
import ServicesTag from '../components/ServicesTag'
import logo from '../../../../public/logo2.svg'
import Link from 'next/link'

const ServiceDetailPage = async ({ params }: { params: { id: string } }) => {
  const id =  params.id
  const res = await fetch(`http://localhost:3000/api/service/${id}`)
  const service = await res.json()
  console.log('Service Details:', service)

  return (
    <div>
      <Banner />

      <div className='container mx-auto flex flex-col lg:flex-row gap-8 mt-12'>
        <div className='w-full lg:w-[60%]'>
          <Image
            src={service.img}
            alt={service.title}
            width={600}
            height={400}
            className='w-[752px] h-96 object-cover rounded-xl'
          />

          <h1 className='text-neutral-900 text-4xl font-bold  mt-4'>
            {service.title}
          </h1>
          <p className='text-neutral-500 text-base font-normal  capitalize leading-loose mt-4'>
            {service.description}
          </p>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6 mb-12'>
            {service.facility.map(
              (item: { name: string; details: string }, index: number) => (
                <div
                  key={index}
                  className='bg-zinc-100 rounded-[10px] border border-gray-200 shadow-xl p-10'
                >
                  <h2 className='text-xl font-semibold text-neutral-900 mb-2'>
                    {item.name}
                  </h2>
                  <p className='text-neutral-500 text-base font-normal '>
                    {item.details}
                  </p>
                </div>
              )
            )}
          </div>
        </div>

        <div className='w-full lg:w-[40%]'>
          <ServicesTag />

          <div className='bg-neutral-900 rounded-[10px] p-[50px] mt-8'>
            <Image
              src={logo}
              alt='Logo'
              width={100}
              height={50}
              className='h-12 w-auto mb-4 mx-auto'
            />
            <h3 className="text-white text-3xl font-bold font-['Open_Sans'] text-center">
              Car Solutions
            </h3>
            <p className="text-white text-[14px] font-['Inter'] text-center">
              Need Help? We Are Here
              <br />
              To Help You
            </p>
            <div className='bg-white rounded-[10px] pt-[20px] pb-[44px] px-[44px] mt-6 text-center'>
              <span className="text-orange-600 text-xl font-bold font-['Inter'] leading-9">
                Car Solutions{' '}
              </span>
              <span className="text-neutral-900 text-xl font-bold font-['Inter'] leading-9">
                Special Offer
              </span>
              <br />
              <span className="text-neutral-500 text-base font-bold font-['Inter'] leading-9">
                Save up to{' '}
              </span>
              <span className="text-orange-600 text-base font-bold font-['Inter'] leading-9">
                30% off
              </span>
              <span className="text-neutral-500 text-base font-bold font-['Inter'] leading-9">
                {' '}
                on all services
              </span>
            </div>
            <p className="text-white text-lg font-semibold font-['Inter'] w-44 h-14 bg-orange-600 rounded-[5px] py-4 px-8 mx-auto -mt-7">
              Get A Quote
            </p>
          </div>

          <h3 className="text-neutral-900 text-4xl font-bold font-['Inter'] mt-6">
            Price : ${service.price}
          </h3>

          <Link href={`/checkout/${service._id}`} className="text-white text-xl font-semibold font-['Inter'] bg-orange-600 rounded-[5px] py-4 mt-6 inline-block w-full text-center">
            Proceed Checkout
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ServiceDetailPage
