
import MyBookingTable from './components/MyBookingTable'
import { headers } from 'next/headers';


const fetchBookings = async () => {
    const res = await fetch(`http://localhost:3000/api/checkout`,{
        headers: new Headers(await headers()),
    });
    const data = await res.json();
    console.log('Fetched Booking Data:', data);
    return data;
}

const MyBooking = async() => {

  const bookingData = await fetchBookings();
  return (
    <div>
      <MyBookingTable bookingData={bookingData} />
    </div>
  )
}

export default MyBooking
