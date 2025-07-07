import React from 'react';
import BookingUpdateForm from '../components/BookingUpdateForm';
type Props = {
  params: { id: string }
}

const UpdateBookingPage = async ({ params }: Props) => {
    const id = params.id;
    const res = await fetch(`http://localhost:3000/api/checkout/${id}`);
    const singleBookingData = await res.json();
    console.log('Single Booking Data:', singleBookingData);
    return (
        <div>
            <BookingUpdateForm singleBookingData={singleBookingData} />
        </div>
    );
};

export default UpdateBookingPage;