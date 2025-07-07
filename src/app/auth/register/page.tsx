import Image from 'next/image'
import React from 'react'
import loginImg from '../../../../public/login/login.svg'
import RegisterForm from './components/RegisterForm'
const Register = () => {
  return (
    <div className='container mx-auto my-12 bg-white'>
      <div className='flex items-center justify-center gap-14'>
        <Image
          src={loginImg}
          alt='Logo'
          width={100}
          height={50}
          className='h-full  w-auto'
        />

        <div className='p-[75px] rounded-[10px] border border-stone-300'>
          <h1 className="text-center justify-start text-neutral-700 text-4xl font-semibold font-['Inter'] mb-[50px]">
            Sign Up
          </h1>

          <RegisterForm />
        </div>
      </div>
    </div>
  )
}

export default Register
