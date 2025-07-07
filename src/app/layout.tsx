import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/shared/Navbar'
import Footer from '@/shared/Footer'
import NextAuthProvider from '@/providers/NextAuthProvider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Car Solutions | Next.js App',
  description: 'A simple Next.js application to help you find car solutions.'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' data-theme='light'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextAuthProvider>
          <Navbar></Navbar>
          <main className='container mx-auto'>{children}</main>
          <Footer></Footer>
        </NextAuthProvider>
      </body>
    </html>
  )
}
