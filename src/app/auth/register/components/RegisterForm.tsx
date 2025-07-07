'use client'

import { registerUser } from '@/app/server/auth/registerUser'
import Link from 'next/link'
import React, { FormEvent } from 'react'
import Swal from 'sweetalert2'
import SocialLogin from '../../login/components/SocialLogin'

const RegisterForm = () => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const result = await registerUser({ name, email, password })
    if (result && !('error' in result)) {
      console.log('User registered successfully:', result)
      Swal.fire({
        title: 'Success',
        text: 'User registered successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      })
    }
    else {
      const errorMsg = result && 'error' in result ? result.error : 'Unknown error'
      console.error('Error registering user:', errorMsg)
      Swal.fire({
        title: 'Error',
        text: 'Sorry, An error occurred while registering. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <label className='label'>
            <span className="label-text text-neutral-700 text-lg font-semibold font-['Inter']">
              Name
            </span>
          </label>
          <input
            type='text'
            name='name'
            placeholder='Your Name'
            className='input input-bordered w-[461px] h-14 bg-white rounded-[10px] border border-gray-200'
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label className='label'>
            <span className="label-text text-neutral-700 text-lg font-semibold font-['Inter']">
              Email
            </span>
          </label>
          <input
            type='email'
            name='email'
            placeholder='Your Email'
            className='input input-bordered w-[461px] h-14 bg-white rounded-[10px] border border-gray-200'
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label className='label'>
            <span className="label-text text-neutral-700 text-lg font-semibold font-['Inter']">
              Password
            </span>
          </label>
          <input
            type='password'
            name='password'
            placeholder='Your Password'
            className='input input-bordered w-[461px] h-14 bg-white rounded-[10px] border border-gray-200'
          />
        </div>

        <button className='btn border-none bg-orange-600 h-12 rounded-[10px] text-white text-lg'>
          Sign Up
        </button>

        <p className="text-neutral-700 text-lg font-medium font-['Inter'] text-center">
          Or Sign Up with
        </p>

      <SocialLogin/>

        <Link href={'/auth/login'} className='text-center'>
          <span className="text-neutral-500 text-lg font-normal font-['Inter']">
            Already have an account?{' '}
          </span>
          <span className="text-orange-600 text-lg font-semibold font-['Inter']">
            Login
          </span>
        </Link>
      </form>
    </div>
  )
}

export default RegisterForm
