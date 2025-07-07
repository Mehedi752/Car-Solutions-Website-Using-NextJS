'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import Swal from 'sweetalert2'

interface Service {
  _id: string
  title: string
  price: number
  img?: string
}

interface CheckoutFormProps {
  service: Service
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ service }) => {
  console.log('Checkout Form Service:', service)
  const session = useSession()
  const router = useRouter()

  const handleCheckoutFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const address = formData.get('address') as string
    const date = formData.get('date') as string
    const message = formData.get('message') as string

    if (!name || !email || !phone || !address || !date) {
      Swal.fire({
        title: 'Missing Information',
        text: 'Please fill in all required fields.',
        icon: 'warning',
        confirmButtonText: 'OK'
      })
      return
    }

    const orderDetails = {
      name,
      email,
      phone,
      address,
      date,
      message,
      service: service?.title || '',
      serviceId: service._id,
      price: service?.price || 0,
      image: service?.img || '',
      status: 'pending'
    }
    console.log('Order Details:', orderDetails)

    const res = await fetch('http://localhost:3000/api/checkout', {
      method: 'POST',
      body: JSON.stringify(orderDetails)
    })

    const data = await res.json()
    console.log('Response from Checkout API:', data)

    if (data.insertedId) {
      Swal.fire({
        title: 'Order Confirmed',
        text: 'Your order has been placed successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      })
      // Redirect to his previous page
      router.push(`/my-booking`)
    } else {
      Swal.fire({
        title: 'Order Failed',
        text: 'There was an error placing your order. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  }
  return (
    <div className='px-[150px] pb-[70px]'>
      <h1 className="text-center justify-start text-neutral-700 text-4xl font-semibold font-['Inter'] mb-[50px]">
        Checkout Form - {service?.title || 'Service'}
      </h1>

      <form
        onSubmit={handleCheckoutFormSubmit}
        className='bg-zinc-100 rounded-[10px] p-[100px]'
      >
        <div className='flex justify-between items-center gap-6 mb-6'>
          <div className='w-full'>
            <label className='label'>
              <span className="label-text text-neutral-700 text-lg font-semibold font-['Inter']">
                Name
              </span>
            </label>
            <input
              type='text'
              name='name'
              placeholder='Enter Your Name'
              className='input input-bordered w-full h-14 bg-white rounded-[10px] border border-gray-200 text-neutral-400 text-base font-normal  leading-loose'
              defaultValue={session?.data?.user?.name || ''}
              readOnly
            />
          </div>

          <div className='w-full'>
            <label className='label'>
              <span className="label-text text-neutral-700 text-lg font-semibold font-['Inter']">
                Email
              </span>
            </label>

            <input
              type='email'
              name='email'
              placeholder='Enter Your Email'
              className='input input-bordered w-full h-14 bg-white rounded-[10px] border border-gray-200  text-neutral-400 text-base font-normal  leading-loose'
              defaultValue={session?.data?.user?.email || ''}
              readOnly
            />
          </div>
        </div>

        <div className='flex justify-between items-center gap-6 mb-6'>
          <div className='w-full'>
            <label className='label'>
              <span className="label-text text-neutral-700 text-lg font-semibold font-['Inter']">
                Due Amount
              </span>
            </label>
            <input
              type='number'
              name='amount'
              placeholder='Due Amount'
              className='input input-bordered w-full h-14 bg-white rounded-[10px] border border-gray-200 text-neutral-400 text-base font-normal leading-loose'
              defaultValue={service?.price || 0}
              readOnly
            />
          </div>

          <div className='w-full'>
            <label className='label'>
              <span className="label-text text-neutral-700 text-lg font-semibold font-['Inter']">
                Phone
              </span>
            </label>
            <input
              type='text'
              name='phone'
              placeholder='Enter Your Phone Number'
              className='input input-bordered w-full h-14 bg-white rounded-[10px] border border-gray-200  text-neutral-400 text-base font-normal leading-loose'
            />
          </div>
        </div>

        <div className='flex justify-between items-center gap-6 mb-6'>
          <div className='w-full'>
            <label className='label'>
              <span className="label-text text-neutral-700 text-lg font-semibold font-['Inter']">
                Address
              </span>
            </label>
            <input
              type='text'
              name='address'
              placeholder='Enter Your Address'
              className='input input-bordered w-full h-14 bg-white rounded-[10px] border border-gray-200  text-neutral-400 text-base font-normal leading-loose'
            />
          </div>

          <div className='w-full'>
            <label className='label'>
              <span className="label-text text-neutral-700 text-lg font-semibold font-['Inter']">
                Date
              </span>
            </label>
            <input
              type='date'
              name='date'
              className='input input-bordered w-full h-14 bg-white rounded-[10px] border border-gray-200  text-neutral-400 text-base font-normal leading-loose'
              placeholder='Select Date'
            />
          </div>
        </div>

        <div className='mb-6'>
          <label className='label'>
            <span className="label-text text-neutral-700 text-lg font-semibold font-['Inter']">
              Message
            </span>
          </label>
          <textarea
            name='message'
            placeholder='Enter Your Message'
            className='textarea textarea-bordered w-full  h-64 bg-white rounded-[10px] border border-gray-200 text-neutral-400 text-base font-normal leading-loose mb-6'
          ></textarea>
        </div>

        <button
          type='submit'
          className="text-white text-xl font-semibold font-['Inter'] bg-orange-600 rounded-[5px] py-4 mt-6 inline-block w-full text-center"
        >
          Order Confirm
        </button>
      </form>
    </div>
  )
}

export default CheckoutForm
