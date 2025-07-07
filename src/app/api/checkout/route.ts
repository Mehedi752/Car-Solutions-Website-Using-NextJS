import { authOptions } from '@/lib/authOptions'
import dbConnect, { collectionNames } from '@/lib/dbConnect'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export const POST = async (request: Request) => {
  const body = await request.json()
  console.log('Received body:', body)
  const checkoutCollection = dbConnect(collectionNames.checkoutCollection)
  const result = await checkoutCollection.insertOne(body)
  return NextResponse.json(result)
}

export const GET = async () => {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email
  if (!session || !email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }
  if (session) {
    const email = session.user?.email
    console.log('Fetching checkouts for email:', email)
    const checkoutCollection = dbConnect(collectionNames.checkoutCollection)
    const checkouts = await checkoutCollection.find({email}).toArray()
    console.log('Fetched checkouts:', checkouts)
    return NextResponse.json(checkouts)
  }
  return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
}
