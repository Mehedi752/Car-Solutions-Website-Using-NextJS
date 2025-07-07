import React from 'react';
import CheckoutForm from '../components/CheckoutForm';
type Props = {
  params: { id: string }
}

const checkoutPage = async ({ params }: Props) => {
  const id =  params.id
  const res = await fetch(`http://localhost:3000/api/service/${id}`)
  const service = await res.json()

  console.log('Checkout Service Details:', service)
    return (
        <div>
            <CheckoutForm service={service} />
        </div>
    );
};

export default checkoutPage;