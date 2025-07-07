'use server'

import dbConnect, { collectionNames } from '@/lib/dbConnect'
import bcrypt from 'bcrypt'

export const registerUser = async (payload: {
  name: string
  email: string
  password: string
}) => {
  console.log('Registering user with payload:', payload)
  const userCollection = dbConnect(collectionNames.usersCollection)
  const existingUser = await userCollection.findOne({ email: payload.email })

  if (!payload.name || !payload.email || !payload.password) {
    console.log('Missing required fields')
    return { error: 'Missing required fields' }
  }

  if (existingUser) {
    console.log('User already exists:', existingUser)
    return null;
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);
  payload.password = hashedPassword;

  const newUser = {
    name: payload.name,
    email: payload.email,
    password: payload.password,
    createdAt: new Date()
  }
  const result = await userCollection.insertOne(newUser)
  console.log('User registered successfully:', result)
  return result;
}
