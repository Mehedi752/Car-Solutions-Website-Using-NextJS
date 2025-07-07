import Image from 'next/image'
import React from 'react'
import { FaEdit } from 'react-icons/fa'
import DeleteButton from './DeleteButton'
import Link from 'next/link'

type Booking = {
  _id: string
  image: string
  service: string
  date: string
  price: number
    address: string
  status: string
}

interface MyBookingTableProps {
  bookingData: Booking[]
}

const MyBookingTable: React.FC<MyBookingTableProps> = ({ bookingData }) => {
  return (
    <div className='container mx-auto my-10 p-6 bg-gray-100 rounded-lg shadow-md'>
      <h3 className='text-4xl font-bold text-center'>My All Bookings</h3>

      <div className='mt-8'>
        <table className='min-w-full bg-white'>
          <thead>
            <tr>
              <td className='py-2 px-4 border-b'>#</td>
              <th className='py-2 px-4 border-b'>Image</th>
              <th className='py-2 px-4 border-b'>Name</th>
              <th className='py-2 px-4 border-b'>Date</th>
              <th className='py-2 px-4 border-b'>Price</th>
              <th className='py-2 px-4 border-b'>Address</th>
              <th className='py-2 px-4 border-b'>Status</th>
              <th className='py-2 px-4 border-b'>Update</th>
              <th className='py-2 px-4 border-b'>Delete</th>
            </tr>
          </thead>
          <tbody>
            {bookingData.map((booking, index) => (
              <tr key={booking._id}>
                <td className='py-2 px-4 border-b'>{index + 1}</td>
                <td className='py-2 px-4 border-b'>
                  <Image
                    src={booking.image}
                    alt={booking.service}
                    width={50}
                    height={50}
                    className='w-40 h-28 mx-auto'
                  />
                </td>
                <td className='py-2 px-4 border-b text-center'>
                  {booking.service}
                </td>
                <td className='py-2 px-4 border-b text-center'>
                  {booking.date}
                </td>
                <td className='py-2 px-4 border-b text-center'>
                  ${booking.price}
                </td>
                <td className='py-2 px-4 border-b text-center'>
                  <span className='text-neutral-700 font-semibold'>
                    {booking.address || 'N/A'}
                  </span>
                </td>
                <td className='py-2 px-4 border-b text-center mx-auto'>
                  {booking.status === 'pending' ? (
                    <span className='text-yellow-400 font-semibold p-2 bg-black rounded-md'>
                      Pending
                    </span>
                  ) : booking.status === 'confirmed' ? (
                    <span className='text-green-500 font-semibold'>
                      Confirmed
                    </span>
                  ) : (
                    <span className='text-red-500 font-semibold'>
                      Cancelled
                    </span>
                  )}
                </td>
                <td className='py-2 px-4 border-b mx-auto '>
                  <Link href={`/my-booking/${booking._id}`}>
                    <FaEdit className='text-blue-700 cursor-pointer hover:text-blue-700 mx-auto w-8 h-8' />
                  </Link>
                </td>
                <DeleteButton id={booking._id} />{' '}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyBookingTable
