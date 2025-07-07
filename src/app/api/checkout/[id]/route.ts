import dbConnect, { collectionNames } from '@/lib/dbConnect'
import { ObjectId } from 'mongodb'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { authOptions } from '@/lib/authOptions'

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const id = params.id
  const query = { _id: new ObjectId(id) }
  const checkoutCollection = dbConnect(collectionNames.checkoutCollection)

  //   Validation
  const session = await getServerSession(authOptions)
  const currentBooking = await checkoutCollection.findOne(query)

  const isOwnerOk = session?.user?.email === currentBooking?.email
  if (!isOwnerOk) {
    return new Response('Unauthorized Access', { status: 401 })
  }
  const result = await checkoutCollection.deleteOne({ _id: new ObjectId(id) })
  revalidatePath('/my-booking')
  return NextResponse.json(result)
}

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const id = params.id
  const checkoutCollection = dbConnect(collectionNames.checkoutCollection)
  const query = { _id: new ObjectId(id) }
  const singleBookingData = await checkoutCollection.findOne(query)

  if (!singleBookingData) {
    return NextResponse.json({ message: 'Checkout not found' }, { status: 404 })
  }

  return NextResponse.json(singleBookingData)
}

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const id = params.id
  const body = await request.json()
  const checkoutCollection = dbConnect(collectionNames.checkoutCollection)
  const query = { _id: new ObjectId(id) },
    filter = { $set: { ...body } },
    options = { upsert: true }
  const session = await getServerSession(authOptions)
  const currentBooking = await checkoutCollection.findOne(query)
  const isOwnerOk = session?.user?.email === currentBooking?.email

  if (!isOwnerOk) {
    return new Response('Unauthorized Access', { status: 401 })
  }

  const result = await checkoutCollection.updateOne(query, filter, options)

  revalidatePath('/my-booking')

  return NextResponse.json(result)
} 