import { MongoClient } from "mongodb"
import mongoose from 'mongoose';

const uri =process.env.DB_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

let client
let clientPromise




if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise


export const connectMongo = async () => mongoose.connect(uri).then(console.log('connected'));

// export default clientPromise
