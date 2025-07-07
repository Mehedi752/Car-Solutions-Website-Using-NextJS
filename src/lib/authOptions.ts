import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { loginUser } from '@/app/server/auth/loginUser'
import dbConnect, { collectionNames } from '@/lib/dbConnect'
import type { Account, User } from 'next-auth'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Enter your email' },
        password: { label: 'Password', type: 'password', placeholder: 'Enter your password' }
      },
      async authorize (credentials) {
        const user = await loginUser(
          credentials as { email: string; password: string }
        )

        if (user) {
          return {
            id: user._id?.toString() ?? user.id?.toString() ?? '',
            name: user.name ?? null,
            email: user.email ?? null,
            image: user.image ?? null
          }
        }

        return null
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    })
  ],

  pages: {
    signIn: '/auth/login'
  },

  callbacks: {
    async signIn ({
      user,
      account
    }: {
      user: User
      account: Account | null
    }) {
      if (account) {
        const { providerAccountId, provider } = account
        const { email: user_email, name, image } = user

        const userCollection = dbConnect(collectionNames.usersCollection)
        const existingUser = await userCollection.findOne({ providerAccountId })

        if (!existingUser) {
          const payload = {
            providerAccountId,
            provider,
            email: user_email,
            name,
            image
          }

          await userCollection.insertOne(payload)
        }
      }

      return true
    }
  }
}
