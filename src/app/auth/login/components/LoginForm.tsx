'use client'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import Swal from 'sweetalert2'
import SocialLogin from './SocialLogin'

const LoginForm = () => {
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle login logic here
    const form = e.currentTarget
    const formData = new FormData(form)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    console.log({ email, password })

    try{
       const result = await signIn('credentials', { email, password, callbackUrl: '/', redirect: false })

       if(result?.ok){
        router.push('/')
        Swal.fire({
          title: 'Success',
          text: 'Logged in successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        })
       }
        else{
          Swal.fire({
             title: 'Error',
             text: 'Invalid email or password. Please try again.',
             icon: 'error',
             confirmButtonText: 'OK'
          })
         }
    }

    catch (error) {
      console.error('Login error:', error)
      Swal.fire({
        title: 'Error',
        text: 'An error occurred while logging in. Please try again later.',
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
          Login
        </button>

        <p className="text-neutral-700 text-lg font-medium font-['Inter'] text-center">
          Or Login with
        </p>

        <SocialLogin/>

        <Link href={'/auth/register'} className='text-center'>
          <span className="text-neutral-500 text-lg font-normal font-['Inter']">
          <p>Don&apos;t have an account?</p> 

          </span>
          <span className="text-orange-600 text-lg font-semibold font-['Inter']">
            Register
          </span>
        </Link>
      </form>
    </div>
  )
}

export default LoginForm
