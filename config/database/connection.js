import { MongoClient } from "mongodb"
import mongoose from 'mongoose';

const uri = 'mongodb://localhost:27017/nft';
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


export const connectMongo = async () => mongoose.connect(uri).then(console.log('ahsent'));

// export default clientPromise