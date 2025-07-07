'use client'
import Link from 'next/link'
import React from 'react'
import logoImg from '../../public/logo.svg'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'

const Navbar = () => {
  const session = useSession()
  const { status } = session
  console.log('Session:', session)
  const navLinks = () => {
    return (
      <div>
        <Link href='/' className='mr-2 hover:underline hover:text-orange-600'>
          Home
        </Link>
        <Link href='/about' className='mr-2 hover:underline hover:text-orange-600'>
          About Us
        </Link>
        <Link href='/services' className='mr-2 hover:underline hover:text-orange-600'>
          Services
        </Link>
        {session.status === 'authenticated' && (
          <Link href='/my-booking' className='mr-2 hover:underline hover:text-orange-600'>
            My Booking
          </Link>
        )}
        <Link href='/contact' className='mr-2 hover:underline hover:text-orange-600'>
          Contact
        </Link>
      </div>
    )
  }

  return (
    <div className='container mx-auto py-6'>
      <div className='navbar'>
        <div className='navbar-start'>
          <div className='dropdown'>
            <div tabIndex={0} role='button' className='btn btn-ghost lg:hidden'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                {' '}
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h8m-8 6h16'
                />{' '}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className='menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow'
            >
              {navLinks()}
            </ul>
          </div>
          <div className='flex items-center gap-2'>
            <Image
              src={logoImg}
              alt='Logo'
              width={40}
              height={40}
              className='ml-2 inline-block h-12 w-12'
            />
            <a className='text-xl'>CarSolutions</a>
          </div>
        </div>
        <div className='navbar-center hidden lg:flex'>
          <ul className='menu menu-horizontal px-1'>{navLinks()}</ul>
        </div>
        <div className='navbar-end'>
          {status === 'authenticated' ? (
            <button
              onClick={() => signOut()}
              className='btn bg-orange-100 text-[#FF3811] hover:bg-[#FF3811] hover:text-white'
            >
              Logout
            </button>
          ) : (
            <Link
              href='/auth/login'
              className='btn bg-orange-100 text-[#FF3811] hover:bg-[#FF3811] hover:text-white'
            >
              Login
            </Link>
          )}
          <a className='btn bg-orange-100 ml-2  text-[#FF3811] hover:bg-[#FF3811] hover:text-white'>
            Appoinment
          </a>
        </div>
      </div>
    </div>
  )
}

export default Navbar
