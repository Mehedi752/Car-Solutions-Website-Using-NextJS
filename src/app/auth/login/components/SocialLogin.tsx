'use client'
import { signIn, useSession } from 'next-auth/react'
import React from 'react'
import { BsLinkedin } from 'react-icons/bs'
import { FaFacebook } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import Swal from 'sweetalert2'

const SocialLogin = () => {
  const session = useSession();
  const handleGoogleLogin = async (provider: string) => {
    console.log('Google login clicked')
    try {
      const result = await signIn(provider, {
        callbackUrl: '/',
        redirect: false
      })
      console.log('Google login result:', result)
      if (result?.ok) {
        Swal.fire({
          title: 'Success',
          text: `Logged in successfully as ${session?.data?.user?.name || 'User'}`,
          icon: 'success',
          confirmButtonText: 'OK'
        })
      }
    } catch (error) {
      console.error('Google login encountered an error:', error)
    }
  }
  return (
    <div className='flex items-center justify-center gap-4 mt-4'>
      <FcGoogle
        onClick={() => handleGoogleLogin('google')}
        className='w-10 h-10'
      />
      <FaFacebook className='w-9 h-9 text-blue-600' />
      <BsLinkedin className='w-9 h-9 text-sky-700' />
    </div>
  )
}

export default SocialLogin
