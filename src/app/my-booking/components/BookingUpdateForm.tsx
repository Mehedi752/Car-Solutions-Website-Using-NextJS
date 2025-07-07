'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import Swal from 'sweetalert2'

interface BookingData {
  _id: string
  service?: string
  price?: number
  phone?: string
  address?: string
  date?: string
  message?: string
}

interface CheckoutFormProps {
  singleBookingData: BookingData
}

const BookingUpdateForm: React.FC<CheckoutFormProps> = ({
  singleBookingData
}) => {
  console.log('Checkout Form Service:', singleBookingData)
  const session = useSession()
  const router = useRouter()

  const handleUpdateFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    const phone = formData.get('phone') as string
    const address = formData.get('address') as string
    const date = formData.get('date') as string
    const message = formData.get('message') as string

    if (!phone || !address || !date || !message) {
      Swal.fire({
        title: 'Missing Information',
        text: 'Please fill in all required fields.',
        icon: 'warning',
        confirmButtonText: 'OK'
      })
      return
    }

    const updateDetails = {
      phone,
      address,
      date,
      message
    }
    console.log('Order Details:', updateDetails)

    const res = await fetch(
      `http://localhost:3000/api/checkout/${singleBookingData._id}`,
      {
        method: 'PATCH',
        body: JSON.stringify(updateDetails)
      }
    )

    const data = await res.json()
    console.log('Response from Checkout API:', data)

    if (data.modifiedCount > 0) {
      Swal.fire({
        title: 'Order Updated Successfully',
        text: 'Your booking data has been updated successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      })
      // Redirect to his previous page
      router.push(`/my-booking`)
    } else {
      Swal.fire({
        title: 'Order Failed',
        text: 'There was an error to update your order. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  }
  return (
    <div className='px-[150px] pb-[70px]'>
      <h1 className="text-center justify-start text-neutral-700 text-4xl font-semibold font-['Inter'] mb-[50px]">
        Update Booking Form - {singleBookingData?.service || 'Service'}
      </h1>

      <form
        onSubmit={handleUpdateFormSubmit}
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
              defaultValue={singleBookingData?.price || 0}
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
              defaultValue={singleBookingData?.phone || ''}
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
              defaultValue={singleBookingData?.address || ''}
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
              defaultValue={singleBookingData?.date || ''}
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
            defaultValue={singleBookingData?.message || ''}
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

export default BookingUpdateForm
