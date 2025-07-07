import dbConnect, { collectionNames } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";


export const GET = async (request: Request, { params }: { params: { id: string } }) => {
  const id = params.id;
  console.log("Service ID:", id);
  

    const serviceCollection = dbConnect(collectionNames.servicesCollection);
    const service = await serviceCollection.findOne({ _id: new ObjectId(id) });
    
    return NextResponse.json(service);
 
}  