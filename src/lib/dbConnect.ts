import { MongoClient, ServerApiVersion } from 'mongodb'

export const collectionNames = { 
  servicesCollection: 'services',
  usersCollection: 'users',
  checkoutCollection: 'checkout'
 }

function dbConnect (collectionName: string) {
  const uri: string = process.env.NEXT_PUBLIC_MONGO_URI? process.env.NEXT_PUBLIC_MONGO_URI : '';

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true
    }
  })

  return client.db().collection(collectionName)
}
export default dbConnect
