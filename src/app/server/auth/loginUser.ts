"use server"

import dbConnect, { collectionNames } from "@/lib/dbConnect";
import bcrypt from "bcrypt";


export const loginUser = async(payload: {email: string, password: string}) => {
   console.log('Logging in user with payload:', payload);

   const userCollection = dbConnect(collectionNames.usersCollection);
    const user = await userCollection.findOne({ email: payload.email });
    const isPasswordValid = user && await bcrypt.compare(payload.password, user.password);

    if (!user || !isPasswordValid) {
        console.log('User not found:', payload.email);
        return null
    }

    return user;
};

